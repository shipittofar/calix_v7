import "server-only";
import nodemailer from "nodemailer";
import type { Enquiry } from "./schema";
import { services } from "@/content/services";
import { startOptions } from "./schema";

export type MailConfig =
  | { transport: "log" }
  | {
      transport: "smtp";
      host: string;
      port: number;
      user: string;
      pass: string;
      to: string;
      from: string;
    };

/**
 * Resolves the mail transport from the environment.
 * - MAIL_TRANSPORT=log: development, tests and NOINDEX previews. Nothing is delivered.
 * - MAIL_TRANSPORT=smtp (default in production): CALIX's existing mailbox.
 * Returns null when production delivery is not configured, so the form can say so
 * instead of pretending the enquiry was sent.
 */
export function mailConfig(): MailConfig | null {
  const mode = process.env.MAIL_TRANSPORT ?? (process.env.NODE_ENV === "production" ? "smtp" : "log");
  if (mode === "log") {
    // A public production site must never accept enquiries it does not deliver. The log
    // transport runs in production only on non-indexed builds (previews, local QA).
    if (process.env.NODE_ENV === "production" && process.env.NOINDEX !== "true") return null;
    return { transport: "log" };
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, ENQUIRY_TO, ENQUIRY_FROM } = process.env;
  // FORM_SECRET keeps spam tokens valid across server instances; required for live delivery.
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !ENQUIRY_TO || !process.env.FORM_SECRET) return null;
  return {
    transport: "smtp",
    host: SMTP_HOST,
    port: Number(SMTP_PORT ?? 587),
    user: SMTP_USER,
    pass: SMTP_PASS,
    to: ENQUIRY_TO,
    from: ENQUIRY_FROM ?? SMTP_USER,
  };
}

const label = <T extends { value: string; label: string }>(options: readonly T[], value?: string) =>
  options.find((o) => o.value === value)?.label ?? value ?? "Not given";

export type EnquiryContext = {
  ref?: string;
  landing?: string;
  /** Set when the message tripped the link heuristic: delivered, but marked for a manual check. */
  flagged?: boolean;
};

export function formatEnquiry(enquiry: Enquiry, context: EnquiryContext) {
  const serviceNames = enquiry.services.map(
    (key) => services.find((s) => s.key === key)?.name ?? "Not sure yet",
  );
  const lines = [
    `Name: ${enquiry.name}`,
    `Email: ${enquiry.email}`,
    `Company: ${enquiry.company}`,
    `Website: ${enquiry.website ?? "Not given"}`,
    `Needs: ${serviceNames.join(", ")}`,
    `Budget range: ${enquiry.budget ?? "Not given"}`,
    `Desired timeline: ${label(startOptions, enquiry.start)}`,
    `Referring page: ${context.ref ?? "None"}`,
    "",
    "Project goals:",
    enquiry.goals,
    "",
    "Additional context:",
    enquiry.context ?? "None",
  ];
  return {
    subject: `${context.flagged ? "[Check: many links] " : ""}Project enquiry: ${enquiry.company}`,
    text: lines.join("\n"),
  };
}

/** Sends the enquiry to CALIX. Plain text only, so no user content is ever rendered as HTML. */
export async function deliverEnquiry(
  config: MailConfig,
  enquiry: Enquiry,
  context: EnquiryContext,
): Promise<void> {
  const message = formatEnquiry(enquiry, context);

  if (config.transport === "log") {
    // No personal data in logs: record that an enquiry arrived, not its content.
    console.info(`[enquiry] log transport: "${message.subject.replace(enquiry.company, "<company>")}" not delivered`);
    return;
  }

  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.port === 465,
    auth: { user: config.user, pass: config.pass },
  });

  await transporter.sendMail({
    from: config.from,
    to: config.to,
    replyTo: enquiry.email,
    subject: message.subject,
    text: message.text,
  });
}
