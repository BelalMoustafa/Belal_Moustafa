import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProjectEditor } from "../ProjectEditor";

export const metadata = { title: "Edit project" };

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (id === "new") {
    return (
      <div>
        <h1 className="text-2xl font-bold">New project</h1>
        <div className="mt-6">
          <ProjectEditor />
        </div>
      </div>
    );
  }
  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) notFound();
  return (
    <div>
      <h1 className="text-2xl font-bold">Edit project</h1>
      <div className="mt-6">
        <ProjectEditor project={project} />
      </div>
    </div>
  );
}
