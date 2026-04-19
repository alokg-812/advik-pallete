import { motion } from "framer-motion";
import avatar from "@/assets/avatar.jpg";

const facts = [
  { emoji: "🎨", label: "Style", value: "Fusing Anime, Realism, and Divine imagery." },
  { emoji: "🎧", label: "Tools", value: "Hybrid kit—Procreate, Alcohol markers, and Duo Brushes." },
  { emoji: "✨", label: "Vibe", value: "Art fueled by Phonk beats and Jazz." },
  { emoji: "🌙", label: "Working hours", value: "Creating in the quiet gaps between academic deadlines." },
];

export const About = () => {
  return (
    <section id="about" className="relative py-24">
      <div className="container grid lg:grid-cols-5 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-2 relative"
        >
          <div className="absolute -inset-4 bg-gradient-cool rounded-[2rem] blur-2xl opacity-40 animate-pulse-glow" />
          <div className="relative glass rounded-[2rem] p-2 max-w-sm mx-auto">
            <img
              src={avatar}
              alt="Advik, 11-year-old artist"
              loading="lazy"
              width={768}
              height={768}
              className="w-full aspect-square object-cover rounded-3xl"
            />
            {/* <div className="absolute -bottom-4 -right-4 glass rounded-2xl px-4 py-3 glow-pink">
              <div className="text-xs text-muted-foreground">Based in</div>
              <div className="font-bold">your dms 💌</div>
            </div> */}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="lg:col-span-3"
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">— About me</span>
          <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl mt-2 mb-6">
            hi, i'm <span className="text-gradient-hero">Advik</span> 👋
          </h2>
          <p className="text-lg text-muted-foreground mb-4">
            I'm 11, I've been drawing since I could hold a pencil, and somewhere
            around 9, I fell down the art rabbit hole and never climbed back out.
          </p>
          <p className="text-lg text-muted-foreground mb-8">
            I make portraits, weird abstract stuff, and basically anything that lets me play with color. If you want a piece that actually feels like
            <span className="text-gradient-cool font-semibold"> you</span> — slide into the request form. 🪩
          </p>

          <div className="grid sm:grid-cols-2 gap-3">
            {facts.map((f) => (
              <div key={f.label} className="glass rounded-2xl p-4 flex items-center gap-3 hover:bg-white/5 transition-colors">
                <span className="text-2xl">{f.emoji}</span>
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">{f.label}</div>
                  <div className="font-semibold">{f.value}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
