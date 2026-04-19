import { motion } from "framer-motion";
import heroArt from "@/assets/gokuposter.jpg";

export const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
      {/* animated blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-20 -left-24 w-[28rem] h-[28rem] rounded-full bg-primary/30 blur-3xl animate-blob" />
        <div className="absolute bottom-10 right-0 w-[26rem] h-[26rem] rounded-full bg-pink/30 blur-3xl animate-blob" style={{ animationDelay: "4s" }} />
        <div className="absolute top-40 right-1/3 w-[20rem] h-[20rem] rounded-full bg-accent/20 blur-3xl animate-blob" style={{ animationDelay: "8s" }} />
        <div className="absolute inset-0 grid-bg opacity-40" />
      </div>

      <div className="container grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6 text-sm"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-muted-foreground">Available for commission works</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display font-black text-5xl sm:text-6xl lg:text-7xl leading-[0.95] mb-6"
          >
            Turning <span className="text-gradient-hero">imagination</span><br />
            into <span className="italic text-gradient-cool">art</span> 🎨
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-lg text-muted-foreground max-w-xl mb-8"
          >
            Hey — I'm Advik, a 11-year-old artist painting portraits & sketches . Custom pieces made just for you, your friends, or that one person you can't stop thinking about. 💫
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#request"
              className="group inline-flex items-center gap-2 px-7 py-4 rounded-full bg-gradient-hero text-white font-semibold glow-pink hover:scale-105 transition-transform"
            >
              Request a portrait
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
            <a
              href="#gallery"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full glass hover:bg-white/10 transition-colors font-semibold"
            >
              View gallery
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-10 flex items-center gap-8"
          >
            {[
              { n: "120+", l: "Pieces" },
              { n: "60+", l: "Happy clients" },
              { n: "3 yrs", l: "Painting" },
            ].map((s) => (
              <div key={s.l}>
                <div className="font-display font-bold text-2xl text-gradient-cool">{s.n}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">{s.l}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Hero art collage */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="relative aspect-square max-w-lg ml-auto w-full"
        >
          <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-hero blur-2xl opacity-60 animate-pulse-glow" />
          <div className="relative h-full rounded-[2.5rem] overflow-hidden glass p-2 animate-float">
            <img
              src={heroArt}
              alt="Featured Goku artwork by Advik"
              width={768}
              height={960}
              className="w-full h-full object-cover rounded-[2rem]"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 glass rounded-2xl p-4 flex items-center gap-3 glow-cyan">
            <span className="text-2xl">🔥</span>
            <div>
              <div className="text-xs text-muted-foreground">Latest drop</div>
              <div className="font-semibold text-sm">Goku</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
