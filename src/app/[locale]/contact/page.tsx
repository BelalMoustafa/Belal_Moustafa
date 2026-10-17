import type { Metadata } from "next";
import { Mail, Phone } from "lucide-react";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { ContactForm } from "@/components/contact/ContactForm";
import { Section } from "@/components/ui/Section";
import {
  GitHubIcon,
  LinkedInIcon,
  WhatsAppIcon,
} from "@/components/ui/BrandIcons";
import { alternates } from "@/lib/seo";
import { defaultProfile, getSetting, type SeoSettings } from "@/lib/settings";
import type { AppLocale } from "@/i18n/routing";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as AppLocale;
  const seo = await getSetting<SeoSettings>("seo", {});
  const page = seo.contact;
  const isAr = locale === "ar";
  return {
    title: isAr ? page?.titleAr : page?.titleEn,
    description: isAr ? page?.descriptionAr : page?.descriptionEn,
    alternates: alternates(locale, "/contact"),
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");
  const profile = await getSetting("profile", defaultProfile);

  const channels = [
    {
      href: `https://wa.me/${profile.whatsapp}`,
      label: t("whatsapp"),
      value: profile.phoneDisplay,
      Icon: WhatsAppIcon,
      className: "hover:border-[#25D366]/40 hover:text-[#25D366]",
    },
    {
      href: `tel:${profile.phone}`,
      label: t("call"),
      value: profile.phoneDisplay,
      Icon: Phone,
      className: "hover:border-[#0066FF]/40 hover:text-[#0066FF]",
      ltr: true,
    },
    {
      href: `mailto:${profile.email}`,
      label: t("emailLabel"),
      value: profile.email,
      Icon: Mail,
      className: "hover:border-[#0066FF]/40 hover:text-[#0066FF]",
    },
    {
      href: profile.linkedin,
      label: t("linkedin"),
      value: "belal-moustafa30",
      Icon: LinkedInIcon,
      className: "hover:border-[#0A66C2]/40 hover:text-[#0A66C2]",
    },
    {
      href: profile.github,
      label: t("github"),
      value: "BelalMoustafa",
      Icon: GitHubIcon,
      className: "hover:border-bm-fg/40",
    },
  ];

  return (
    <Section>
      <div className="mb-10 max-w-2xl">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-bm-blue">
          {t("badge")}
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-bm-fg md:text-4xl">
          {t("title")}
        </h1>
        <p className="mt-4 text-base text-bm-muted md:text-lg">{t("subtitle")}</p>
      </div>
      <div className="grid gap-8 lg:grid-cols-12">
        <aside className="space-y-3 lg:col-span-5">
          {channels.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className={`flex items-center gap-4 rounded-2xl border border-bm-border bg-bm-card p-4 transition ${c.className}`}
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-bm-canvas text-bm-fg">
                <c.Icon className="h-4 w-4" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-bm-muted">
                  {c.label}
                </p>
                <p className="mt-0.5 text-sm font-semibold text-bm-fg" dir={c.ltr ? "ltr" : undefined}>
                  {c.value}
                </p>
              </div>
            </a>
          ))}
        </aside>
        <div className="lg:col-span-7">
          <ContactForm />
        </div>
      </div>
    </Section>
  );
}
