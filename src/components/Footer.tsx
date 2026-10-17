import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { GitHubIcon, LinkedInIcon } from "./ui/BrandIcons";
import { defaultProfile, getSetting } from "@/lib/settings";

export async function Footer() {
  const t = await getTranslations("footer");
  const profile = await getSetting("profile", defaultProfile);

  return (
    <footer className="no-print border-t border-bm-border bg-bm-canvas">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div>
          <p className="text-sm font-bold text-bm-fg">{profile.nameEn}</p>
          <p className="mt-1 text-sm text-bm-muted">{t("tagline")}</p>
          <p className="mt-3 text-xs text-bm-muted">
            © {new Date().getFullYear()} Belal Moustafa. {t("rights")}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-bm-border bg-bm-card text-bm-fg transition hover:border-[#0A66C2]/40 hover:text-[#0A66C2]"
            aria-label="LinkedIn"
          >
            <LinkedInIcon className="h-4 w-4" />
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-bm-border bg-bm-card text-bm-fg transition hover:border-bm-fg/40"
            aria-label="GitHub"
          >
            <GitHubIcon className="h-4 w-4" />
          </a>
          <Link
            href="/contact"
            className="rounded-lg border border-bm-border bg-bm-card px-3 py-2 text-sm font-semibold text-bm-fg"
          >
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
