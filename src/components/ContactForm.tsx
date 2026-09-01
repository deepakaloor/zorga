"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { track } from "@/lib/track";
import { getInterest } from "@/lib/prefill";

type Status = "idle" | "sending" | "sent" | "error" | "prelaunch";
type Errors = Partial<Record<"name" | "organisation" | "email" | "message", string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * `enabled` is decided on the server (delivery adapter configured or not).
 * Before launch the form validates locally and shows a neutral notice; nothing is
 * sent and nothing pretends to be sent.
 */
export function ContactForm({ enabled = false }: { enabled?: boolean }) {
  const id = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [serverError, setServerError] = useState<string>("");
  const [interest, setInterest] = useState<string>("");
  const startedAt = useRef<number>(0);
  const started = useRef(false);

  useEffect(() => {
    startedAt.current = Date.now();
    const sync = () => setInterest(getInterest());
    const onInterest = (e: Event) => setInterest((e as CustomEvent<string>).detail);
    // Read any pre-selected engagement model once mounted (external storage → state)
    const t = window.setTimeout(sync, 0);
    window.addEventListener("zorga:interest", onInterest);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("zorga:interest", onInterest);
    };
  }, []);

  const onFocusStart = () => {
    if (!started.current) {
      started.current = true;
      track("contact_start");
    }
  };

  const validate = (fd: FormData): Errors => {
    const e: Errors = {};
    if (String(fd.get("name") ?? "").trim().length < 2) e.name = "Please enter your name.";
    if (String(fd.get("organisation") ?? "").trim().length < 2) e.organisation = "Please enter your organisation.";
    if (!EMAIL_RE.test(String(fd.get("email") ?? "").trim())) e.email = "Please enter a valid work email.";
    if (String(fd.get("message") ?? "").trim().length < 12) e.message = "Tell us a little more about what you are trying to build.";
    return e;
  };

  const onSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const form = ev.currentTarget;
    const fd = new FormData(form);
    const e = validate(fd);
    setErrors(e);
    setServerError("");
    if (Object.keys(e).length) {
      const first = form.querySelector<HTMLElement>("[aria-invalid='true']");
      first?.focus();
      return;
    }
    if (!enabled) {
      setStatus("prelaunch");
      track("contact_submit", { prelaunch: true });
      return;
    }
    setStatus("sending");
    track("contact_submit");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          organisation: fd.get("organisation"),
          email: fd.get("email"),
          country: fd.get("country"),
          message: fd.get("message"),
          website: fd.get("website"),
          interest,
          startedAt: startedAt.current,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; errors?: Errors };
      if (res.ok && data.ok) {
        setStatus("sent");
        track("contact_success");
        form.reset();
      } else {
        setStatus("error");
        if (data.errors) setErrors(data.errors);
        setServerError(data.error ?? "We could not send your message. Please try again shortly.");
        track("contact_error", { status: res.status });
      }
    } catch {
      setStatus("error");
      setServerError("We could not send your message. Please try again.");
      track("contact_error", { status: 0 });
    }
  };

  const field = "w-full bg-transparent border-0 border-b border-rule-strong focus:border-ink rounded-none px-0 py-3 text-ink t-lead outline-none focus:ring-0 transition-colors";
  const label = "t-micro text-ink-2 block mb-1";

  return (
    <section id="contact" aria-labelledby="contact-title">
      <div className="wrap">
        <div className="sec-bar">
          <span className="t-micro text-mute">Contact</span>
        </div>
      </div>
      <div className="wrap pt-[clamp(3.5rem,10vh,6.5rem)] pb-[clamp(4rem,12vh,8rem)] grid12">
        <div className="col-span-12 lg:col-span-4">
          <h2 id="contact-title" className="t-h2" data-reveal>Start a<br />conversation<span className="text-blue">.</span></h2>
          <p className="t-body mt-8 max-w-[30ch]" data-reveal>We read every message and reply when there is a conversation to have.</p>
          {interest && (
            <p className="t-label mt-8 flex items-center gap-3" aria-live="polite">
              <span aria-hidden className="h-px w-6 bg-blue" /> {interest}
            </p>
          )}
        </div>

        <div className="col-span-12 lg:col-span-7 lg:col-start-6 mt-10 lg:mt-0">
          {status === "sent" ? (
            <div role="status" aria-live="polite" className="border-t border-ink pt-8" data-reveal="fade">
              <p className="t-h3">Thank you. Your message has been sent.</p>
              <p className="t-body mt-3 max-w-[40ch]">We read every message and reply when there is a conversation to have.</p>
              <button type="button" className="t-label u-line mt-8" onClick={() => setStatus("idle")}>Send another message</button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-9" data-reveal="fade">
              <div className="hidden" aria-hidden="true">
                <label htmlFor={`${id}-website`}>Website</label>
                <input id={`${id}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
              </div>

              <Field id={`${id}-name`} name="name" label="Name" autoComplete="name" error={errors.name} onFocus={onFocusStart} className={field} labelClass={label} />
              <Field id={`${id}-org`} name="organisation" label="Organisation" autoComplete="organization" error={errors.organisation} onFocus={onFocusStart} className={field} labelClass={label} />
              <Field id={`${id}-email`} name="email" label="Work email" type="email" autoComplete="email" error={errors.email} onFocus={onFocusStart} className={field} labelClass={label} />
              <Field id={`${id}-country`} name="country" label="Country (optional)" autoComplete="country-name" onFocus={onFocusStart} className={field} labelClass={label} />

              <div className="sm:col-span-2">
                <label htmlFor={`${id}-message`} className={label}>What are you trying to build?</label>
                <textarea
                  id={`${id}-message`}
                  name="message"
                  rows={4}
                  required
                  aria-invalid={errors.message ? "true" : undefined}
                  aria-describedby={errors.message ? `${id}-message-err` : undefined}
                  onFocus={onFocusStart}
                  className={`${field} resize-y min-h-[7rem]`}
                />
                {errors.message && <p id={`${id}-message-err`} className="t-micro text-ink mt-2" role="alert">{errors.message}</p>}
              </div>

              <div className="sm:col-span-2 flex flex-wrap items-center justify-between gap-6 pt-2">
                <p className="t-micro text-mute max-w-[40ch]">Your details are used only to respond to this message.</p>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="t-label u-line inline-flex items-center gap-3 text-ink disabled:opacity-60 disabled:cursor-wait"
                >
                  {status === "sending" ? "Sending…" : "Send to Zorga"}
                  <span aria-hidden>→</span>
                </button>
              </div>

              {status === "error" && serverError && (
                <p className="sm:col-span-2 t-label text-ink border-t border-ink pt-4" role="alert">{serverError}</p>
              )}
              {status === "prelaunch" && (
                <p className="sm:col-span-2 t-label text-ink-2 border-t border-rule-strong pt-4" role="status" aria-live="polite">
                  Contact submissions will be enabled at launch.
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({
  id, name, label, type = "text", autoComplete, error, onFocus, className, labelClass,
}: {
  id: string; name: string; label: string; type?: string; autoComplete?: string; error?: string;
  onFocus: () => void; className: string; labelClass: string;
}) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>{label}</label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? `${id}-err` : undefined}
        onFocus={onFocus}
        className={className}
      />
      {error && <p id={`${id}-err`} className="t-micro text-ink mt-2" role="alert">{error}</p>}
    </div>
  );
}
