"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Loader2 } from "lucide-react";

export function ContactForm() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          phone: form.get("phone"),
          company: form.get("company"),
          subject: form.get("subject"),
          message: form.get("message"),
        }),
      });
      if (!res.ok) throw new Error("fail");
      setStatus("success");
      e.currentTarget.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-bm-border bg-bm-card p-8 text-center">
        <p className="text-lg font-semibold text-bm-fg">{t("success")}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-bm-border bg-bm-card p-6 shadow-[0_1px_0_rgba(15,23,42,0.04)] md:p-8"
    >
      <div className="grid gap-4 md:grid-cols-2">
        {(
          [
            ["name", "name", true],
            ["email", "email", true],
            ["phone", "tel", false],
            ["company", "text", false],
          ] as const
        ).map(([key, type, required]) => (
          <label key={key} className="block text-sm">
            <span className="mb-1.5 block font-medium text-bm-fg">{t(key)}</span>
            <input
              name={key}
              type={type}
              required={required}
              className="w-full rounded-lg border border-bm-border bg-bm-bg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#0066FF]"
            />
          </label>
        ))}
      </div>
      <label className="mt-4 block text-sm">
        <span className="mb-1.5 block font-medium text-bm-fg">{t("subject")}</span>
        <input
          name="subject"
          className="w-full rounded-lg border border-bm-border bg-bm-bg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#0066FF]"
        />
      </label>
      <label className="mt-4 block text-sm">
        <span className="mb-1.5 block font-medium text-bm-fg">{t("message")}</span>
        <textarea
          name="message"
          required
          rows={5}
          className="w-full rounded-lg border border-bm-border bg-bm-bg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#0066FF]"
        />
      </label>
      {status === "error" ? (
        <p className="mt-3 text-sm text-red-600">{t("error")}</p>
      ) : null}
      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#0066FF] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#075CFF] disabled:opacity-60"
      >
        {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        {status === "loading" ? t("submitting") : t("submit")}
      </button>
    </form>
  );
}
