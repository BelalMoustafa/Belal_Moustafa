import { getSetting, type ProfileSettings } from "@/lib/settings";
import { ProfileForm } from "./ProfileForm";

export const metadata = { title: "Profile" };

export default async function ProfileAdminPage() {
  const profile = await getSetting<ProfileSettings>("profile", {
    nameEn: "Belal Moustafa",
    nameAr: "بلال مصطفى",
    titleEn: "",
    titleAr: "",
    locationEn: "Cairo, Egypt",
    locationAr: "القاهرة، مصر",
    email: "belalmoustafa65@gmail.com",
    phone: "+201157167417",
    phoneDisplay: "+20 115 716 7417",
    whatsapp: "201157167417",
    linkedin: "",
    github: "",
    companyUrl: "https://tarqumi.com",
    photo: "/uploads/profile/belal-moustafa.png",
    availabilityEn: "",
    availabilityAr: "",
    summaryEn: "",
    summaryAr: "",
    cvFullstack: "/cv/belal-moustafa-cv-fullstack.html",
    cvFrontend: "/cv/belal-moustafa-cv.html",
  });

  return (
    <div>
      <h1 className="text-2xl font-bold">Profile</h1>
      <p className="mt-1 text-sm text-slate-500">
        Update photo, bio, availability, and CV links.
      </p>
      <div className="mt-6">
        <ProfileForm initial={profile} />
      </div>
    </div>
  );
}
