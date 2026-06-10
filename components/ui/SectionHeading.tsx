type Props = {
  eyebrow?: string;
  title: string;
  lede?: string;
  align?: "left" | "center";
  dark?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
  dark = false,
}: Props) {
  const alignCls = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <div className={`max-w-2xl ${alignCls}`}>
      {eyebrow && (
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-purple">
          {eyebrow}
        </p>
      )}
      <h2
        className={`font-display text-3xl font-semibold sm:text-4xl ${
          dark ? "text-cream" : "text-navy"
        }`}
      >
        {title}
      </h2>
      {lede && (
        <p className={`mt-4 text-lg ${dark ? "text-lavender" : "text-navy-soft"}`}>
          {lede}
        </p>
      )}
    </div>
  );
}
