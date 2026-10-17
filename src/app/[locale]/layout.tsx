import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import {
  Plus_Jakarta_Sans,
  IBM_Plex_Sans_Arabic,
  JetBrains_Mono,
} from "next/font/google";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { ThemeProvider } from "@/components/ThemeProvider";
import { JsonLd } from "@/components/JsonLd";
import { personJsonLd } from "@/lib/seo";
import { getSetting, type ProfileSettings } from "@/lib/settings";
import "../globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const ibmArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex-arabic",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://belalmoustafa.tarqumi.com",
  ),
  icons: { icon: "/uploads/profile/belal-moustafa.png" },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();
  const dir = locale === "ar" ? "rtl" : "ltr";
  const profile = await getSetting<ProfileSettings>("profile", {
    nameEn: "Belal Moustafa",
    nameAr: "بلال مصطفى",
    titleEn: "Technical Lead & Full-Stack Software Engineer",
    titleAr: "",
    locationEn: "Cairo, Egypt",
    locationAr: "",
    email: "belalmoustafa65@gmail.com",
    phone: "+201157167417",
    phoneDisplay: "+20 115 716 7417",
    whatsapp: "201157167417",
    linkedin: "https://www.linkedin.com/in/belal-moustafa30/",
    github: "https://github.com/BelalMoustafa",
    companyUrl: "https://tarqumi.com",
    photo: "/uploads/profile/belal-moustafa.png",
    availabilityEn: "",
    availabilityAr: "",
    summaryEn: "",
    summaryAr: "",
    cvFullstack: "",
    cvFrontend: "",
  });

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${plusJakarta.variable} ${ibmArabic.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-bm-bg text-bm-fg antialiased">
        <ThemeProvider>
          <NextIntlClientProvider messages={messages}>
            <JsonLd data={personJsonLd(profile)} />
            <Header />
            <main>{children}</main>
            <Footer />
            <WhatsAppFloat />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
