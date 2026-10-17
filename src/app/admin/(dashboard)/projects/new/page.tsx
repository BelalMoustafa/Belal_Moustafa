import { ProjectEditor } from "../ProjectEditor";

export const metadata = { title: "New project" };

export default function NewProjectPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">New project</h1>
      <div className="mt-6">
        <ProjectEditor />
      </div>
    </div>
  );
}
