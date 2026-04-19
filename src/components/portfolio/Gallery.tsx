import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import gokuposter from "@/assets/gokuposter.jpg";
import hanumanjiportrait from "@/assets/hanumanjiportrait.jpg";
import krishnajiportrait from "@/assets/krishnajicanvas.jpg";
import aradhyasketch from "@/assets/aradhyasketch.jpg";

type Cat = "All" | "Anime" | "Portrait" | "Painting" | "Mythology";

type Work = {
  src: string;
  title: string;
  cat: Cat;
  description: string;
  tools: string;
};

const works: Work[] = [
  {
    src: gokuposter,
    title: "Unleashed Energy",
    cat: "Anime",
    description: "A dynamic portrayal of a warrior channeling immense power.",
    tools: "Color pencils, charcoal shading, sketch pens",
  },
  {
    src: aradhyasketch,
    title: "Silent Expression",
    cat: "Portrait",
    description: "A realistic pencil portrait capturing subtle emotions.",
    tools: "Graphite pencils (HB–8B)",
  },
  {
    src: krishnajiportrait,
    title: "Divine Connection",
    cat: "Painting",
    description: "A serene depiction of divine love and compassion.",
    tools: "Acrylic colors on canvas",
  },
  {
    src: hanumanjiportrait,
    title: "Power in Stillness",
    cat: "Mythology",
    description: "A powerful representation of strength and devotion.",
    tools: "Color pencils, soft pastels",
  },
];

const cats: Cat[] = ["All", "Anime", "Portrait", "Painting", "Mythology"];

export const Gallery = () => {
  const [filter, setFilter] = useState<Cat>("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = works.filter(
    (w) => filter === "All" || w.cat === filter
  );

  return (
    <section id="gallery" className="py-24">
      <div className="container">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <span className="text-pink font-semibold text-sm uppercase tracking-widest">
              — The vault
            </span>
            <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl mt-2">
              Stuff I've <span className="text-gradient-hero">made</span>
            </h2>
          </div>

          {/* FILTER */}
          <div className="flex flex-wrap gap-2">
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  filter === c
                    ? "bg-gradient-hero text-white"
                    : "glass text-muted-foreground hover:text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* GRID */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4"
        >
          <AnimatePresence>
            {filtered.map((w, i) => (
              <motion.div
                key={w.title}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group relative rounded-3xl overflow-hidden cursor-pointer"
                onClick={() => setLightbox(works.indexOf(w))}
              >
                {/* IMAGE */}
                <img
                  src={w.src}
                  alt={w.title}
                  className="w-full h-full object-cover aspect-[3/4] sm:aspect-[4/5] transition-transform duration-500 group-hover:scale-110"
                />

                {/* DESKTOP HOVER OVERLAY */}
                <div className="hidden md:flex absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 items-end p-4">
                  <div className="w-full bg-white/10 backdrop-blur-md rounded-2xl p-4">
                    <div className="text-xs text-pink uppercase mb-1">{w.cat}</div>
                    <div className="font-bold text-lg">{w.title}</div>
                    <p className="text-xs text-gray-300 mt-1 line-clamp-2">
                      {w.description}
                    </p>
                    <div className="text-xs mt-2 text-pink">
                      🛠 {w.tools}
                    </div>
                  </div>
                </div>

                {/* MOBILE TITLE */}
                <div className="md:hidden absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                  <div className="text-xs text-gray-300">{w.cat}</div>
                  <div className="font-semibold text-sm">{w.title}</div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* LIGHTBOX */}
        <AnimatePresence>
          {lightbox !== null && (
            <motion.div
              className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
              onClick={() => setLightbox(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                onClick={(e) => e.stopPropagation()}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="max-w-3xl w-full"
              >
                <img
                  src={works[lightbox].src}
                  className="w-full max-h-[80vh] object-contain rounded-2xl"
                />

                <div className="mt-4 text-center">
                  <h3 className="text-xl font-bold">
                    {works[lightbox].title}
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">
                    {works[lightbox].description}
                  </p>
                  <div className="text-xs text-pink mt-2">
                    🛠 {works[lightbox].tools}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};