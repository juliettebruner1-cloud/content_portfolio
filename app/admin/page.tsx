import type { Metadata } from "next";
import { isAdminConfigured, isAdminRequest } from "@/lib/adminAuth";
import { getSubmittedProjects } from "@/lib/projectStore";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!isAdminConfigured()) {
    return (
      <div className="mx-auto max-w-lg px-5 py-24 text-center">
        <p className="label mb-4 text-taupe">Setup needed</p>
        <h1 className="font-serif text-2xl text-ivory">
          Set an <code className="text-stone">ADMIN_PASSWORD</code> first
        </h1>
        <p className="mt-4 text-sm text-stone">
          Add an environment variable named <code className="text-stone">ADMIN_PASSWORD</code> in
          your Vercel project settings (or <code className="text-stone">.env.local</code> for
          local testing), then reload this page. See the README for the full walkthrough.
        </p>
      </div>
    );
  }

  const authed = await isAdminRequest();
  if (!authed) {
    return <AdminLogin />;
  }

  const projects = await getSubmittedProjects();
  return <AdminDashboard initialProjects={projects} />;
}
