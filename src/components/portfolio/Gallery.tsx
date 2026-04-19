import { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform, MotionValue } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import gokuposter from "@/assets/gokuposter.jpg";
import hanumanjiportrait from "@/assets/hanumanjiportrait.jpg";
import krishnajiportrait from "@/assets/krishnajicanvas.jpg";
import aradhyasketch from "@/assets/aradhyasketch.jpg";

type Cat = "All" | "Anime" | "Portrait" | "Painting" | "Mythology";

type Tone = "pink" | "cyan" | "purple" | "blue" | "orange";

type Work = {
  src: string;
  title: string;
  cat: Cat;
  tone: Tone;
  description: string;
  tools: string;
};

const works: Work[] = [
  {
    src: gokuposter,
    title: "Unleashed Energy",
    cat: "Anime",
    tone: "cyan",
    description: "A dynamic portrayal of a warrior channeling immense power, capturing motion, intensity, and raw determination.",
    tools: "Color pencils, charcoal shading, sketch pens",
  },
  {
    src: aradhyasketch,
    title: "Silent Expression",
    cat: "Portrait",
    tone: "purple",
    description: "A realistic pencil portrait capturing subtle emotions and natural expression through fine shading and detail.",
    tools: "Graphite pencils (HB–8B), blending techniques",
  },
  {
    src: krishnajiportrait,
    title: "Divine Connection",
    cat: "Painting",
    tone: "blue",
    description: "A serene depiction of divine love and compassion, showcasing a peaceful bond between Krishna and a calf.",
    tools: "Acrylic colors on canvas",
  },
  {
    src: hanumanjiportrait,
    title: "Power in Stillness",
    cat: "Mythology",
    tone: "orange",
    description: "A powerful representation of strength and devotion, portraying Hanuman in a meditative yet commanding presence.",
    tools: "Color pencils, soft pastels",
  },
];

const cats: Cat[] = ["All", "Anime", "Portrait", "Painting", "Mythology"];


const toneBg: Record<Work["tone"], string> = {
  pink: "radial-gradient(ellipse at 30% 20%, hsl(349 100% 30% / 0.6), transparent 60%)",
  purple: "radial-gradient(ellipse at 30% 20%, hsl(271 76% 30% / 0.7), transparent 60%)",
  cyan: "radial-gradient(ellipse at 30% 20%, hsl(181 100% 25% / 0.6), transparent 60%)",
  blue: "radial-gradient(ellipse at 30% 20%, hsl(220 80% 40% / 0.6), transparent 60%)",
  orange: "radial-gradient(ellipse at 30% 20%, hsl(25 95% 45% / 0.6), transparent 60%)",
};

const MobileStoryItem = ({
  work,
  progress,
  index,
  total,
}: {
  work: Work;
  progress: MotionValue<number>;
  index: number;
  total: number;
}) => {
  const step = 1 / total;
  const start = index * step;
  const end = start + step;
  const mid = start + step / 2;

  const opacity = useTransform(progress, [start, mid, end], [0.3, 1, 0.3]);
  const scale = useTransform(progress, [start, mid, end], [0.85, 1, 0.85]);
  const y = useTransform(progress, [start, mid, end], [60, 0, -60]);

  return (
    <div className="h-screen sticky top-0 flex items-center justify-center px-5">
      <motion.div
        style={{ opacity, scale, y }}
        className="w-full max-w-md"
      >
        <div className="relative aspect-[4/5] rounded-3xl overflow-hidden glass p-2">
          <div
            className={`absolute -inset-4 rounded-3xl blur-3xl opacity-60 -z-10 ${
              work.tone === "pink" ? "bg-pink" : work.tone === "cyan" ? "bg-accent" : "bg-primary"
            }`}
          />
          <img
            src={work.src}
            alt={work.title}
            loading="lazy"
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>
        <motion.div
          style={{ opacity }}
          className="mt-5 glass rounded-2xl p-5"
        >
          <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1">
            {work.cat} · {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </div>
          <h3 className="font-display font-bold text-2xl mb-2">{work.title}</h3>
          <p className="text-sm text-muted-foreground mb-3">{work.description}</p>
          <div className="text-xs text-accent font-medium">🛠️ {work.tools}</div>
        </motion.div>
      </motion.div>
    </div>
  );
};

const MobileStoryGallery = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Background tint shifts with scroll
  const bgIndex = useTransform(scrollYProgress, (v) =>
    Math.min(works.length - 1, Math.floor(v * works.length))
  );
  const [activeTone, setActiveTone] = useState<Work["tone"]>(works[0].tone);
  bgIndex.on("change", (i) => setActiveTone(works[i]?.tone ?? "purple"));

  return (
    <div ref={containerRef} className="relative" style={{ height: `${works.length * 100}vh` }}>
      <motion.div
        className="fixed inset-0 -z-10 transition-all duration-700"
        style={{ background: toneBg[activeTone] }}
      />
      {works.map((w, i) => (
        <MobileStoryItem key={w.title} work={w} progress={scrollYProgress} index={i} total={works.length} />
      ))}
    </div>
  );
};

const DesktopGrid = () => {
  const [filter, setFilter] = useState<Cat>("All");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const filtered = works.filter((w) => filter === "All" || w.cat === filter);

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <span className="text-pink font-semibold text-sm uppercase tracking-widest">— The vault</span>
          <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl mt-2">
            Stuff I've <span className="text-gradient-hero">made</span>
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                filter === c
                  ? "bg-gradient-hero text-white glow-pink"
                  : "glass text-muted-foreground hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <AnimatePresence mode="popLayout">
          {filtered.map((w, i) => (
            <motion.button
              layout
              key={w.title}
              onClick={() => setLightbox(works.indexOf(w))}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-3xl glass aspect-[4/5] text-left"
            >
              <img
                src={w.src}
                alt={w.title}
                loading="lazy"
                width={768}
                height={960}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Always-visible bottom label */}
              <div className="absolute inset-x-0 bottom-0 p-5 flex items-end justify-between bg-gradient-to-t from-background via-background/40 to-transparent opacity-90 group-hover:opacity-0 transition-opacity duration-500">
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-widest">{w.cat}</div>
                  <div className="font-display font-bold text-xl">{w.title}</div>
                </div>
                <span className="w-10 h-10 rounded-full bg-gradient-hero grid place-items-center text-white text-lg">
                  ↗
                </span>
              </div>

              {/* Hover overlay card with tools */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-4">
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
                <div className="relative w-full glass rounded-2xl p-5 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="text-[10px] text-accent uppercase tracking-widest mb-1">{w.cat}</div>
                  <div className="font-display font-bold text-2xl mb-2">{w.title}</div>
                  <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{w.description}</p>
                  <div className="text-xs font-medium text-pink">🛠️ {w.tools}</div>
                </div>
              </div>

              <div
                className={`absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-60 transition-opacity blur-2xl -z-10 ${
                  w.tone === "pink" ? "bg-pink" : w.tone === "cyan" ? "bg-accent" : "bg-primary"
                }`}
              />
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[100] bg-background/90 backdrop-blur-xl grid place-items-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full glass rounded-3xl p-3"
            >
              <img
                src={works[lightbox].src}
                alt={works[lightbox].title}
                className="w-full max-h-[70vh] object-contain rounded-2xl"
              />
              <div className="flex items-start justify-between mt-4 px-3 pb-2 gap-4">
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-widest">{works[lightbox].cat}</div>
                  <div className="font-display font-bold text-2xl">{works[lightbox].title}</div>
                  <p className="text-sm text-muted-foreground mt-2 max-w-lg">{works[lightbox].description}</p>
                  <div className="text-xs text-accent font-medium mt-2">🛠️ {works[lightbox].tools}</div>
                </div>
                <button
                  onClick={() => setLightbox(null)}
                  className="w-10 h-10 shrink-0 rounded-full bg-white/10 hover:bg-white/20 grid place-items-center"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export const Gallery = () => {
  const isMobile = useIsMobile();

  return (
    <section id="gallery" className="relative py-24">
      {isMobile ? (
        <>
          <div className="container mb-6">
            <span className="text-pink font-semibold text-sm uppercase tracking-widest">— The vault</span>
            <h2 className="font-display font-black text-4xl mt-2">
              Scroll the <span className="text-gradient-hero">story</span>
            </h2>
            <p className="text-sm text-muted-foreground mt-2">Each scroll reveals a new piece. Take your time. ✨</p>
          </div>
          <MobileStoryGallery />
        </>
      ) : (
        <div className="container">
          <DesktopGrid />
        </div>
      )}
    </section>
  );
};
