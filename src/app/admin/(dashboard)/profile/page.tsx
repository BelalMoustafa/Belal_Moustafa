import { defaultProfile, getSetting } from "@/lib/settings";
import { ProfileForm } from "./ProfileForm";

export const metadata = { title: "Profile" };

export default async function ProfileAdminPage() {
  const profile = await getSetting("profile", defaultProfile);

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
