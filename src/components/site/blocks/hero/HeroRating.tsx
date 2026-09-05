export default function HeroRating({
  ratingText,
  isDark,
  align,
}: {
  ratingText: string;
  isDark: boolean;
  align: string;
}) {
  return (
    <div
      data-anim="fade"
      data-delay="0.25"
      className={`mt-10 flex items-center gap-2.5 text-xs ${
        isDark ? "text-zinc-300" : "text-zinc-500"
      } ${align === "left" ? "" : "justify-center"}`}
    >
      <span className="flex text-amber-400 font-bold tracking-widest text-[13px]">
        ★★★★★
      </span>
      <span className="font-medium tracking-tight">{ratingText}</span>
    </div>
  );
}
