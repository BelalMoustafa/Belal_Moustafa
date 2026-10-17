import { WhatsAppIcon } from "./ui/BrandIcons";
import { defaultProfile, getSetting } from "@/lib/settings";

export async function WhatsAppFloat() {
  const profile = await getSetting("profile", defaultProfile);

  return (
    <a
      href={`https://wa.me/${profile.whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      className="no-print fixed bottom-5 end-5 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105 hover:bg-[#128C7E]"
      aria-label="WhatsApp"
    >
      <WhatsAppIcon className="h-6 w-6" />
    </a>
  );
}
