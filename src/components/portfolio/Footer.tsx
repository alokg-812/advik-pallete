export const Footer = () => {
  return (
    <footer className="relative py-12 border-t border-border/50 mt-12">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-gradient-hero" />
          <span className="font-display font-bold">Advik.Pallete<span className="text-gradient-cool">.art</span></span>
        </div>
        <div className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Painted with ❤️ + a lot of homeworks😁.
        </div>
        <div className="flex gap-3">
          <a
            href="https://instagram.com/advik_pallete"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-full glass text-sm hover:bg-white/10 transition-colors"
          >
            Instagram
          </a>

          <a
            href="https://www.youtube.com/@anjaligupta3818"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-full glass text-sm hover:bg-white/10 transition-colors"
          >
            YouTube
          </a>
        </div>
        </div>
    </footer>
  );
};
