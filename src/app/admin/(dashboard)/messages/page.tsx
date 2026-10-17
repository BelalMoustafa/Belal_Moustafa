import { prisma } from "@/lib/prisma";
import { MarkReadButton } from "./MarkReadButton";

export const metadata = { title: "Messages" };

export default async function MessagesPage() {
  const messages = await prisma.message.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold">Messages / Opportunities</h1>
      <div className="mt-6 space-y-3">
        {messages.length === 0 ? (
          <p className="text-sm text-slate-500">No messages yet.</p>
        ) : (
          messages.map((m) => (
            <article
              key={m.id}
              className="rounded-2xl border border-slate-200 bg-white p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-slate-900">{m.name}</p>
                  <p className="text-sm text-slate-500">
                    {m.email}
                    {m.phone ? ` · ${m.phone}` : ""}
                    {m.company ? ` · ${m.company}` : ""}
                  </p>
                  {m.subject ? (
                    <p className="mt-1 text-sm font-medium text-slate-700">
                      {m.subject}
                    </p>
                  ) : null}
                </div>
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold">
                  {m.status}
                </span>
              </div>
              <p className="mt-3 whitespace-pre-wrap text-sm text-slate-600">
                {m.message}
              </p>
              <div className="mt-3">
                <MarkReadButton id={m.id} />
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
