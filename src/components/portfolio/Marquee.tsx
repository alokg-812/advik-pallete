const items = ["Portraits", "✦", "Sketches", "✦", "Custom commissions", "✦", "Anime style", "✦", "Abstract", "✦"];

export const Marquee = () => {
  return (
    <div className="relative py-8 overflow-hidden border-y border-border/50 bg-card/30">
      <div className="flex w-max marquee gap-12 whitespace-nowrap">
        {[...items, ...items, ...items, ...items].map((t, i) => (
          <span
            key={i}
            className={`font-display font-bold text-3xl md:text-5xl ${
              t === "✦" ? "text-pink" : "text-foreground/80"
            }`}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
};
