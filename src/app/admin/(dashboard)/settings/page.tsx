import { getSetting, type SeoSettings } from "@/lib/settings";
import { SeoForm } from "./SeoForm";

export const metadata = { title: "SEO Settings" };

export default async function SettingsAdminPage() {
  const seo = await getSetting<SeoSettings>("seo", {});
  return (
    <div>
      <h1 className="text-2xl font-bold">SEO Settings</h1>
      <p className="mt-1 text-sm text-slate-500">Meta titles and descriptions per page.</p>
      <div className="mt-6">
        <SeoForm initial={seo} />
      </div>
    </div>
  );
}
