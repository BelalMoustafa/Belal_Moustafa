"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Menu, Moon, Sun, X } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useTheme } from "./ThemeProvider";

const links = [
  { href: "/", key: "home" as const },
  { href: "/projects", key: "projects" as const },
  { href: "/resume", key: "resume" as const },
  { href: "/contact", key: "contact" as const },
];

export function Header() {
  const t = useTranslations("nav");
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <header className="no-print sticky top-0 z-50 border-b border-bm-border bg-bm-bg/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-sm font-bold tracking-tight text-bm-fg">
          Belal Moustafa
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-bm-muted transition hover:text-bm-fg"
            >
              {t(l.key)}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <LanguageSwitcher />
          <button
            type="button"
            onClick={toggle}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-bm-border text-bm-muted hover:text-bm-fg"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <Link
            href="/contact"
            className="rounded-lg bg-[#0066FF] px-3.5 py-2 text-sm font-semibold text-white hover:bg-[#075CFF]"
          >
            {t("hireMe")}
          </Link>
        </div>
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-bm-border md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open ? (
        <div className="border-t border-bm-border bg-bm-bg px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-bm-fg"
              >
                {t(l.key)}
              </Link>
            ))}
            <div className="flex items-center gap-2 pt-2">
              <LanguageSwitcher />
              <button
                type="button"
                onClick={toggle}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-bm-border"
              >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
