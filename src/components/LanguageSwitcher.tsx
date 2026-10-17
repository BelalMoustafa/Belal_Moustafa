"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Globe } from "lucide-react";

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const isAr = locale === "ar";

  return (
    <button
      type="button"
      onClick={() => router.replace(pathname, { locale: isAr ? "en" : "ar" })}
      className="inline-flex items-center gap-2 rounded-full border border-bm-border bg-bm-canvas/80 px-3 py-1.5 text-sm font-medium transition hover:border-[#0066FF]/40 hover:bg-bm-card"
      aria-label={isAr ? "Switch to English" : "التبديل إلى العربية"}
    >
      <Globe className="h-4 w-4 text-[#0066FF]" />
      {isAr ? (
        <>
          <span className="font-[family-name:var(--font-plus-jakarta)]">English</span>
          <span className="rounded bg-bm-border/60 px-1.5 py-0.5 text-[10px] font-semibold tracking-wide">
            EN
          </span>
        </>
      ) : (
        <>
          <span className="font-[family-name:var(--font-ibm-plex-arabic)]">العربية</span>
          <span className="rounded bg-bm-border/60 px-1.5 py-0.5 text-[10px] font-semibold tracking-wide">
            AR
          </span>
        </>
      )}
    </button>
  );
}
