import { UserCircle } from "lucide-react";

const ProfileHeader = ({ name }: { name: string }) => {
  return (
    <div className="bg-card border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-rose-500 to-primary" />

      <div className="space-y-1">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">
          <UserCircle className="w-3.5 h-3.5" />
          Account Management
        </span>
        <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
          {name} Profile Settings
        </h1>
        <p className="text-xs text-muted-foreground">
          Manage your personal information, contact details, and account
          security.
        </p>
      </div>
    </div>
  );
};

export default ProfileHeader;
