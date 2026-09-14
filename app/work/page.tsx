import { Suspense } from "react";
import { getAllProjects } from "@/lib/projectStore";
import { WorkPageClient } from "@/components/WorkPageClient";

export const dynamic = "force-dynamic";

export default async function WorkPage() {
  const projects = await getAllProjects();
  return (
    <Suspense fallback={null}>
      <WorkPageClient projects={projects} />
    </Suspense>
  );
}
