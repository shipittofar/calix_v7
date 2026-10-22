#!/usr/bin/env node
/**
 * Guards for the olive story (docs/olive-story.md §6). The story is preview-only: public builds
 * swap it for an empty stand-in, so a normal `next build` never compiles or checks it in context.
 * These checks make sure the story code stays checked and the preview can't reach production.
 *
 *   node scripts/check-story.mjs config            next.config.ts guardrails, for every phase
 *   node scripts/check-story.mjs sources           story files are type-checked and wired in
 *   node scripts/check-story.mjs output DIR on|off a finished build has (on) or lacks (off) the story
 *
 * `config` loads next.config.ts through Next's own loader (next/dist/server/config), one process
 * per case because Next caches the loaded config. If a Next upgrade moves that module, this check
 * fails rather than passing silently.
 */
import { spawnSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, relative, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const STORY_DIR = "components/home/story";
const PREVIEW_DIST = ".next-preview";
const failures = [];
const check = (ok, message) => {
  console.log(`${ok ? "  ok  " : "  FAIL"} ${message}`);
  if (!ok) failures.push(message);
};

/** Loads next.config.ts for `phase` with exactly the given story variables. */
function loadConfig(phase, env) {
  const script = `
    const load = require(require.resolve("next/dist/server/config", { paths: [process.cwd()] })).default;
    load(${JSON.stringify(phase)}, process.cwd(), { silent: true })
      .then((c) => console.log(JSON.stringify({ alias: c.turbopack?.resolveAlias ?? {}, distDir: c.distDir })))
      .catch((e) => console.log(JSON.stringify({ error: e.message })));`;
  const childEnv = { ...process.env };
  delete childEnv.STORY_PREVIEW;
  delete childEnv.NOINDEX;
  const run = spawnSync(process.execPath, ["-e", script], { cwd: root, env: { ...childEnv, ...env }, encoding: "utf8" });
  const line = run.stdout.trim().split("\n").pop() ?? "";
  try {
    return JSON.parse(line);
  } catch {
    return { error: `could not load the config: ${run.stderr.trim() || line}` };
  }
}

function checkConfig() {
  console.log("next.config.ts guardrails");
  const STORY_OFF = "@/components/home/story/StorySlot";
  const cases = [
    // [phase, env, expected: "public" | "preview" | "dev" | "throws"]
    ["phase-production-build", {}, "public"],
    ["phase-production-build", { NOINDEX: "true" }, "public"],
    ["phase-production-build", { STORY_PREVIEW: "true", NOINDEX: "true" }, "preview"],
    ["phase-production-build", { STORY_PREVIEW: "true", NOINDEX: "false" }, "throws"],
    ["phase-production-build", { STORY_PREVIEW: "true" }, "throws"],
    ["phase-production-server", {}, "public"],
    ["phase-production-server", { STORY_PREVIEW: "true", NOINDEX: "true" }, "preview"],
    ["phase-production-server", { STORY_PREVIEW: "true", NOINDEX: "false" }, "throws"],
    ["phase-development-server", {}, "dev"],
    ["phase-development-server", { STORY_PREVIEW: "false" }, "dev-off"],
  ];
  for (const [phase, env, expected] of cases) {
    const label = `${phase.replace("phase-", "")} ${Object.entries(env).map(([k, v]) => `${k}=${v}`).join(" ") || "(no story variables)"}`;
    const c = loadConfig(phase, env);
    if (expected === "throws") {
      check(Boolean(c.error && /requires NOINDEX=true/.test(c.error)), `${label}: refused`);
      continue;
    }
    if (c.error) {
      check(false, `${label}: ${c.error}`);
      continue;
    }
    const off = Boolean(c.alias[STORY_OFF]);
    const wants = {
      public: { off: true, distDir: ".next" },
      preview: { off: false, distDir: PREVIEW_DIST },
      // Next 16 keeps dev output in .next/dev.
      dev: { off: false, distDir: ".next/dev" },
      "dev-off": { off: true, distDir: ".next/dev" },
    }[expected];
    // The server phase never compiles, so the alias only matters for builds and dev.
    const aliasOk = phase === "phase-production-server" || off === wants.off;
    check(aliasOk && c.distDir === wants.distDir, `${label}: story ${off ? "off" : "on"}, output ${c.distDir}`);
  }
}

function storyFiles() {
  return readdirSync(join(root, STORY_DIR))
    .filter((f) => /\.tsx?$/.test(f))
    .map((f) => `${STORY_DIR}/${f}`);
}

function checkSources() {
  console.log("Story sources");
  // Every story file must be in the TypeScript program, so `npm run typecheck` checks it even
  // though public builds never compile the story.
  const tsc = spawnSync(process.execPath, [join(root, "node_modules/typescript/bin/tsc"), "--listFilesOnly", "-p", root], {
    cwd: root,
    encoding: "utf8",
  });
  const program = new Set(tsc.stdout.split("\n").map((f) => relative(root, f.trim())));
  for (const file of storyFiles()) check(program.has(file), `${file} is type-checked`);

  const read = (f) => (existsSync(join(root, f)) ? readFileSync(join(root, f), "utf8") : "");
  check(/from "@\/components\/home\/story\/StorySlot"/.test(read("app/page.tsx")) && /<StorySlot\s*\/>/.test(read("app/page.tsx")), "app/page.tsx renders StorySlot");
  check(/<Story\s*\/>/.test(read(`${STORY_DIR}/StorySlot.tsx`)), "StorySlot.tsx renders <Story />");
  check(/<StoryPlayer\s*\/>/.test(read(`${STORY_DIR}/Story.tsx`)), "Story.tsx renders <StoryPlayer />");
  check(/return null/.test(read(`${STORY_DIR}/StorySlot.off.tsx`)), "StorySlot.off.tsx is the empty stand-in");
}

function checkOutput(dir, mode) {
  console.log(`Build output in ${dir} (story ${mode})`);
  const html = join(root, dir, "server/app/index.html");
  if (!existsSync(html)) {
    check(false, `${dir}/server/app/index.html exists (run the build first)`);
    return;
  }
  const page = readFileSync(html, "utf8");
  const story = page.includes("data-story-root");
  const noindex = /<meta name="robots" content="noindex/.test(page);
  if (mode === "on") {
    check(story, "home page includes the story");
    check(noindex, "home page is noindex");
  } else {
    check(!story, "home page has no story");
    check(!noindex, "home page is indexable");
    const media = join(root, dir, "static/media");
    const images = existsSync(media) ? readdirSync(media).filter((f) => /^stage-\d/.test(f)) : [];
    check(images.length === 0, "no story images in the output");
  }
}

const [command, ...args] = process.argv.slice(2);
if (command === "config") checkConfig();
else if (command === "sources") checkSources();
else if (command === "output" && args.length === 2 && ["on", "off"].includes(args[1])) checkOutput(args[0], args[1]);
else {
  console.error("Usage: node scripts/check-story.mjs config | sources | output DIR on|off");
  process.exit(2);
}
if (failures.length) {
  console.error(`\n${failures.length} check(s) failed.`);
  process.exit(1);
}
