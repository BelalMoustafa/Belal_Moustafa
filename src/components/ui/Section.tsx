import { cn } from "@/lib/utils";

export function Section({
  children,
  className,
  id,
  tone = "white",
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  tone?: "white" | "canvas";
}) {
  return (
    <section
      id={id}
      className={cn(
        "py-16 md:py-24",
        tone === "white" && "bg-bm-bg",
        tone === "canvas" && "bg-bm-canvas",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

export function SectionHeader({
  badge,
  title,
  subtitle,
  as = "h2",
}: {
  badge?: string;
  title: string;
  subtitle?: string;
  as?: "h1" | "h2";
}) {
  const Heading = as;
  return (
    <div className="mx-auto mb-10 max-w-2xl text-center md:mb-14">
      {badge ? (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-bm-blue">
          {badge}
        </p>
      ) : null}
      <Heading className="text-balance text-3xl font-bold tracking-tight text-bm-fg md:text-4xl">
        {title}
      </Heading>
      {subtitle ? (
        <p className="mt-4 text-pretty text-base leading-relaxed text-bm-muted md:text-lg">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
