import { z } from "zod";
import { services } from "@/content/services";

/** Field names, shared by the form, the action and tests. */
export const fieldNames = [
  "name",
  "email",
  "company",
  "website",
  "services",
  "goals",
  "budget",
  "start",
  "context",
] as const;

export type FieldName = (typeof fieldNames)[number];

export const serviceValues = [...services.map((s) => s.key), "unsure"] as const;

export const startOptions = [
  { value: "1-month", label: "Within 1 month" },
  { value: "1-3-months", label: "In 1 to 3 months" },
  { value: "3-6-months", label: "In 3 to 6 months" },
  { value: "exploring", label: "Exploring for now" },
] as const;

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max, `Keep this under ${max} characters.`)
    .optional()
    .transform((v) => (v ? v : undefined));

/** Adds https:// when missing, then checks it is a plausible web address. */
const websiteField = z
  .string()
  .trim()
  .max(200, "Keep this under 200 characters.")
  .optional()
  .transform((v) => (v ? (/^https?:\/\//i.test(v) ? v : `https://${v}`) : undefined))
  .refine((v) => v === undefined || /^https?:\/\/[^\s/$.?#]+\.[^\s]+$/i.test(v), {
    message: "Enter a web address, for example yourcompany.com.",
  });

export const enquirySchema = z.object({
  name: z.string().trim().min(1, "Enter your name.").max(120, "Keep this under 120 characters."),
  email: z
    .string()
    .trim()
    .min(1, "Enter your business email.")
    .max(200, "Keep this under 200 characters.")
    .pipe(z.email("Enter a valid email address, for example name@company.com.")),
  company: z.string().trim().min(1, "Enter your company or organisation.").max(160, "Keep this under 160 characters."),
  website: websiteField,
  services: z
    .array(z.enum(serviceValues))
    .min(1, "Choose at least one option, or “Not sure yet”."),
  goals: z
    .string()
    .trim()
    .min(20, "Tell us a little more about your goals: at least 20 characters.")
    .max(3000, "Keep this under 3,000 characters."),
  budget: optionalText(120),
  start: z.enum(startOptions.map((o) => o.value) as [string, ...string[]], {
    message: "Choose your desired timeline.",
  }),
  context: optionalText(3000),
});

export type Enquiry = z.infer<typeof enquirySchema>;

/** Raw values echoed back to the form after a failed submission. */
export type EnquiryValues = Partial<Record<FieldName, string | string[]>>;

export type EnquiryState = {
  status: "idle" | "error";
  errors: Partial<Record<FieldName, string>>;
  formError?: string;
  values: EnquiryValues;
  /** A fresh form token, when the one rendered with the page has expired. */
  token?: string;
};

export const initialEnquiryState: EnquiryState = { status: "idle", errors: {}, values: {} };

/** Reads the submitted fields out of FormData into plain values. */
export function readEnquiry(formData: FormData): EnquiryValues {
  const get = (key: string) => {
    const v = formData.get(key);
    return typeof v === "string" ? v : "";
  };
  return {
    name: get("name"),
    email: get("email"),
    company: get("company"),
    website: get("website"),
    services: formData.getAll("services").filter((v): v is string => typeof v === "string"),
    goals: get("goals"),
    budget: get("budget"),
    start: get("start"),
    context: get("context"),
  };
}

/** Validates values and returns field errors keyed by field name. */
export function validateEnquiry(values: EnquiryValues) {
  const result = enquirySchema.safeParse(values);
  if (result.success) return { ok: true as const, data: result.data };
  const errors: Partial<Record<FieldName, string>> = {};
  for (const issue of result.error.issues) {
    const field = issue.path[0] as FieldName | undefined;
    if (field && !errors[field]) errors[field] = issue.message;
  }
  return { ok: false as const, errors };
}
