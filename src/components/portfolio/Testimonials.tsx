import { motion } from "framer-motion";

type Testimonial = {
  name: string;
  handle: string;
  quote: string;
  emoji: string;
  tone: "pink" | "cyan" | "purple";
};

const testimonials: Testimonial[] = [
  {
    name: "Mr. Ramendra Dwivedi",
    handle: "",
    quote: "During an LIC meeting, he sketched my portrait using only a blue pen and paper. The work was so impressive that it was applauded by everyone there, and I even felicitated him with gifts.",
    emoji: "🌈",
    tone: "pink",
  },
 
  // {
  //   name: "Aradhya Gupta",
  //   handle: "",
  //   quote: "Demand was of Self portraits, also first custumor to buy my canvas painting",
  //   emoji: "✨",
  //   tone: "purple",
  // },
  //  {
  //   name: "Advik Shukla",
  //   handle: "",
  //   quote: "Gojo and sukuna from jujutsu kaisen",
  //   emoji: "🎨",
  //   tone: "pink",
  // },
  // {
  //   name: "Arzam",
  //   handle: "",
  //   quote: "Okarun from dadran",
  //   emoji: "💫",
  //   tone: "cyan",
  // },
  // {
  //   name: "",
  //   handle: "@devon.p",
  //   quote: "Didn't believe he made the ",
  //   emoji: "💖",
  //   tone: "purple",
  // },
];

const toneClass = {
  pink: { glow: "bg-pink", text: "text-pink" },
  cyan: { glow: "bg-accent", text: "text-accent" },
  purple: { glow: "bg-primary", text: "text-primary-glow" },
};

export const Testimonials = () => {
  return (
    <section id="testimonials" className="relative py-24 overflow-hidden">
      <div className="container">
        <div className="text-center mb-14">
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">— Word on the street</span>
          <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl mt-2">
            People are <span className="text-gradient-hero">vibing</span>
          </h2>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
            Real reactions from friends, clients, and strangers on the internet.
          </p>
        </div>

        {/* Mobile: horizontal swipe scroll. Desktop: grid */}
        <div className="md:hidden -mx-5 px-5 overflow-x-auto snap-x snap-mandatory scrollbar-none">
          <div className="flex gap-4 pb-4">
            {testimonials.map((t, i) => (
              <TestimonialCard key={t.handle} t={t} i={i} className="snap-center shrink-0 w-[80vw] max-w-sm" />
            ))}
          </div>
        </div>

        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.handle} t={t} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

const TestimonialCard = ({
  t,
  i,
  className = "",
}: {
  t: Testimonial;
  i: number;
  className?: string;
}) => {
  const c = toneClass[t.tone];
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
      whileHover={{ y: -6, rotate: i % 2 === 0 ? -1.5 : 1.5 }}
      className={`group relative glass rounded-3xl p-6 ${className}`}
    >
      <div
        className={`absolute -inset-0.5 rounded-3xl opacity-0 group-hover:opacity-50 blur-2xl transition-opacity -z-10 ${c.glow}`}
      />
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-12 h-12 rounded-full bg-gradient-hero grid place-items-center text-xl font-display font-bold text-white`}>
          {t.name.charAt(0)}
        </div>
        <div>
          <div className="font-display font-bold text-base leading-tight">{t.name}</div>
          <div className={`text-xs ${c.text}`}>{t.handle}</div>
        </div>
        <span className="ml-auto text-2xl">{t.emoji}</span>
      </div>
      <p className="text-foreground/90 leading-relaxed">"{t.quote}"</p>
      <div className="flex gap-1 mt-4 text-sm">
        {"★★★★★".split("").map((s, j) => (
          <span key={j} className={c.text}>{s}</span>
        ))}
      </div>
    </motion.div>
  );
};
