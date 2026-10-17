"use client";

export function MarkReadButton({ id }: { id: string }) {
  return (
    <button
      type="button"
      onClick={async () => {
        await fetch(`/api/admin/messages/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "Read" }),
        });
        window.location.reload();
      }}
      className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
    >
      Mark as read
    </button>
  );
}
