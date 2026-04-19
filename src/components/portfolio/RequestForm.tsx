import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import emailjs from "emailjs-com";

const types = ["Portrait", "Sketch", "Abstract", "Surprise me"];

export const RequestForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [type, setType] = useState("Portrait");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "").trim();
    const contact = String(fd.get("contact") || "").trim();
    const desc = String(fd.get("desc") || "").trim();
    const driveLink = String(fd.get("drive") || "").trim();

    if (!name || !contact || !desc) {
      toast.error("Fill in name, contact and description ✋");
      return;
    }

    const templateParams = {
      name,
      contact,
      type,
      description: desc,
      drive_link: driveLink || "Not provided",
    };

    emailjs
      .send(
        "service_l6w5egr",
        "template_pc0b2te",
        templateParams,
        "3ROi7le9JWYzzqunT"
      )
      .then(() => {
        setSubmitted(true);
        toast.success("Request sent! Advik will reply soon ✨");
      })
      .catch(() => {
        toast.error("Failed to send ❌");
      });
  };

  return (
    <section id="request" className="relative py-24">
      <div className="container max-w-3xl">
        <div className="text-center mb-12">
          <span className="text-orange font-semibold text-sm uppercase tracking-widest">— Commission</span>
          <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl mt-2">
            Request a <span className="text-gradient-hero">painting</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Tell me what you want and I'll bring it to life. Portraits start at $25 — DMs are open. 💸
          </p>
        </div>

        <div className="relative">
          <div className="absolute -inset-2 bg-gradient-hero rounded-[2rem] blur-2xl opacity-30" />

          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onSubmit={handleSubmit}
                className="relative glass rounded-[2rem] p-6 sm:p-10 space-y-6"
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field name="name" label="Your name" placeholder="e.g. Advik" />
                  <Field name="contact" label="Email or @handle" placeholder="advik@gmail.com / @ig" />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-3">
                    Type of painting
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {types.map((t) => (
                      <button
                        type="button"
                        key={t}
                        onClick={() => setType(t)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                          type === t
                            ? "bg-gradient-hero text-white glow-pink"
                            : "bg-white/5 hover:bg-white/10 text-muted-foreground"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <Field
                  name="desc"
                  label="Describe the vibe"
                  placeholder="Portrait of my friend enjoying a sunset view."
                  textarea
                />

                {/* 🔥 NEW FIELD: Drive Link */}
                <Field
                  name="drive"
                  label="Reference link (Google Drive / Instagram)"
                  placeholder="Paste link to your image (optional)"
                />

                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-gradient-hero text-white font-bold text-lg hover:scale-[1.02] active:scale-[0.99] transition-transform glow-pink"
                >
                  Send the request 🚀
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative glass rounded-[2rem] p-12 text-center"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                  className="w-24 h-24 mx-auto rounded-full bg-gradient-hero grid place-items-center text-5xl glow-pink animate-pulse-glow mb-6"
                >
                  ✨
                </motion.div>
                <h3 className="font-display font-black text-3xl mb-2">Sent! 🎉</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Thanks for the request — I'll get back to you within 24 hours with a price + timeline. 💌
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-8 px-6 py-3 rounded-full glass hover:bg-white/10 font-semibold"
                >
                  Send another
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const Field = ({
  name,
  label,
  placeholder,
  textarea,
}: {
  name: string;
  label: string;
  placeholder: string;
  textarea?: boolean;
}) => {
  const cls =
    "w-full bg-white/5 border border-border rounded-2xl px-5 py-4 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary focus:bg-white/10 focus:shadow-[0_0_0_4px_hsl(var(--primary)/0.15)] transition";

  return (
    <div>
      <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-3">
        {label}
      </label>
      {textarea ? (
        <textarea name={name} placeholder={placeholder} rows={4} className={cls} />
      ) : (
        <input name={name} placeholder={placeholder} className={cls} />
      )}
    </div>
  );
};