"use client";

import Link from "next/link";
import { useActionState, useEffect, useRef } from "react";
import { submitEnquiry } from "@/app/contact/actions";
import { track } from "@/lib/analytics";
import {
  initialEnquiryState,
  startOptions,
  type EnquiryState,
  type FieldName,
} from "@/lib/enquiry/schema";

type Option = { value: string; label: string };

const fieldLabels: Record<FieldName, string> = {
  name: "Name",
  email: "Business email",
  company: "Company or organisation",
  website: "Current website",
  services: "What do you need?",
  goals: "Project goals",
  budget: "Budget range",
  start: "Desired timeline",
  context: "Additional context",
};

/**
 * Project enquiry form (docs/conversion-strategy.md §4). Works without
 * JavaScript through the Server Action; with JavaScript it adds inline errors,
 * a focused error summary and a pending state.
 */
export function EnquiryForm({
  token,
  honeypotField,
  tokenField,
  serviceOptions,
  preselectedService,
  refSlug,
}: {
  token: string;
  honeypotField: string;
  tokenField: string;
  serviceOptions: Option[];
  preselectedService?: string;
  refSlug?: string;
}) {
  const [state, formAction, pending] = useActionState<EnquiryState, FormData>(submitEnquiry, initialEnquiryState);
  const summaryRef = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  const onFirstInteraction = () => {
    if (started.current) return;
    started.current = true;
    track("project_form_started", { service: preselectedService });
  };
  const errorFields = Object.keys(state.errors) as FieldName[];
  const hasErrors = errorFields.length > 0 || Boolean(state.formError);

  useEffect(() => {
    if (state.status === "error") summaryRef.current?.focus();
  }, [state]);

  const value = (field: FieldName) => {
    const v = state.values[field];
    return typeof v === "string" ? v : undefined;
  };
  const selectedServices =
    state.status === "error"
      ? ((state.values.services as string[] | undefined) ?? [])
      : preselectedService
        ? [preselectedService]
        : [];

  const describedBy = (field: FieldName, help?: boolean) =>
    [help ? `${field}-help` : null, state.errors[field] ? `${field}-error` : null].filter(Boolean).join(" ") ||
    undefined;

  const error = (field: FieldName) =>
    state.errors[field] ? (
      <span id={`${field}-error`} className="field__error">
        Error: {state.errors[field]}
      </span>
    ) : null;

  // Keyed by the last submission so uncontrolled fields pick up returned values.
  const formKey = JSON.stringify(state.values);

  return (
    <form
      action={formAction}
      noValidate
      className="grid gap-8"
      key={formKey}
      onFocusCapture={onFirstInteraction}
      onInput={onFirstInteraction}
    >
      {hasErrors ? (
        <div ref={summaryRef} tabIndex={-1} className="error-summary" role="alert" aria-labelledby="error-summary-title">
          <p id="error-summary-title" className="font-medium">
            {state.formError ?? "Please check the highlighted fields."}
          </p>
          {errorFields.length > 0 ? (
            <ul className="mt-3 list-disc pl-5 type-small">
              {errorFields.map((field) => (
                <li key={field}>
                  <a href={`#${field === "services" ? "services-fieldset" : field}`}>
                    {fieldLabels[field]}
                    {fieldLabels[field].endsWith("?") ? " " : ": "}
                    {state.errors[field]}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}

      <input type="hidden" name={tokenField} value={state.token ?? token} />
      {refSlug ? <input type="hidden" name="ref" value={refSlug} /> : null}
      <div className="honeypot" aria-hidden="true" data-nosnippet>
        <label htmlFor={honeypotField}>Leave this field empty</label>
        <input id={honeypotField} name={honeypotField} type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="field">
          <label htmlFor="name">{fieldLabels.name}</label>
          <input
            id="name"
            name="name"
            className="input"
            autoComplete="name"
            required
            maxLength={120}
            defaultValue={value("name")}
            aria-invalid={state.errors.name ? true : undefined}
            aria-describedby={describedBy("name")}
          />
          {error("name")}
        </div>
        <div className="field">
          <label htmlFor="email">{fieldLabels.email}</label>
          <input
            id="email"
            name="email"
            type="email"
            className="input"
            autoComplete="email"
            required
            maxLength={200}
            defaultValue={value("email")}
            aria-invalid={state.errors.email ? true : undefined}
            aria-describedby={describedBy("email")}
          />
          {error("email")}
        </div>
        <div className="field">
          <label htmlFor="company">{fieldLabels.company}</label>
          <span id="company-help" className="field__help">
            Or the project name, if the business is not launched yet.
          </span>
          <input
            id="company"
            name="company"
            className="input"
            autoComplete="organization"
            required
            maxLength={160}
            defaultValue={value("company")}
            aria-invalid={state.errors.company ? true : undefined}
            aria-describedby={describedBy("company", true)}
          />
          {error("company")}
        </div>
        <div className="field">
          <label htmlFor="website">
            {fieldLabels.website} <span className="text-secondary font-normal">(optional)</span>
          </label>
          <input
            id="website"
            name="website"
            type="url"
            inputMode="url"
            className="input"
            autoComplete="url"
            maxLength={200}
            placeholder="yourcompany.com"
            defaultValue={value("website")}
            aria-invalid={state.errors.website ? true : undefined}
            aria-describedby={describedBy("website")}
          />
          {error("website")}
        </div>
      </div>

      <fieldset
        id="services-fieldset"
        className="field"
        aria-describedby={describedBy("services", true)}
        aria-invalid={state.errors.services ? true : undefined}
      >
        <legend>{fieldLabels.services}</legend>
        <span id="services-help" className="field__help">
          Choose all that apply.
        </span>
        <div className="mt-3 grid gap-x-8 md:grid-cols-2">
          {[...serviceOptions, { value: "unsure", label: "Not sure yet" }].map((option) => (
            <label key={option.value} className="choice">
              <input
                type="checkbox"
                name="services"
                value={option.value}
                defaultChecked={selectedServices.includes(option.value)}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
        {error("services")}
      </fieldset>

      <div className="field">
        <label htmlFor="goals">{fieldLabels.goals}</label>
        <span id="goals-help" className="field__help">
          What is prompting this, and what would a good outcome look like?
        </span>
        <textarea
          id="goals"
          name="goals"
          className="input"
          required
          minLength={20}
          maxLength={3000}
          defaultValue={value("goals")}
          aria-invalid={state.errors.goals ? true : undefined}
          aria-describedby={describedBy("goals", true)}
        />
        {error("goals")}
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="field">
          <label htmlFor="budget">
            {fieldLabels.budget} <span className="text-secondary font-normal">(optional)</span>
          </label>
          <span id="budget-help" className="field__help">
            If you have one. A rough range and currency is enough.
          </span>
          <input
            id="budget"
            name="budget"
            className="input"
            maxLength={120}
            defaultValue={value("budget")}
            aria-invalid={state.errors.budget ? true : undefined}
            aria-describedby={describedBy("budget", true)}
          />
          {error("budget")}
        </div>
        <div className="field">
          <label htmlFor="start">{fieldLabels.start}</label>
          <select
            id="start"
            name="start"
            className="input"
            required
            defaultValue={value("start") ?? ""}
            aria-invalid={state.errors.start ? true : undefined}
            aria-describedby={describedBy("start")}
          >
            <option value="" disabled>
              Choose one
            </option>
            {startOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          {error("start")}
        </div>
      </div>

      <div className="field">
        <label htmlFor="context">
          {fieldLabels.context} <span className="text-secondary font-normal">(optional)</span>
        </label>
        <span id="context-help" className="field__help">
          Anything else that helps: deadlines, existing suppliers, links to examples.
        </span>
        <textarea
          id="context"
          name="context"
          className="input"
          maxLength={3000}
          defaultValue={value("context")}
          aria-invalid={state.errors.context ? true : undefined}
          aria-describedby={describedBy("context", true)}
        />
        {error("context")}
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
        <button type="submit" className="btn btn-primary" aria-disabled={pending || undefined} disabled={pending}>
          {pending ? "Sending…" : "Send my project details"}
        </button>
        <p className="type-small text-secondary">
          We use these details only to reply to your enquiry. See our{" "}
          <Link href="/privacy" className="link">
            privacy notice
          </Link>
          .
        </p>
      </div>
      {/* Loading state, announced to assistive technology. */}
      <p className="visually-hidden" role="status" aria-live="polite">
        {pending ? "Sending your project details." : ""}
      </p>
    </form>
  );
}
