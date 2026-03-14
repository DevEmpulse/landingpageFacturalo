"use client";

import { motion } from "framer-motion";
import { FaGooglePlay } from "react-icons/fa";

export function CTA() {
  return (
    <section id="descargar" className="py-20 md:py-28 relative overflow-hidden">
      <div
        className="absolute inset-0 bg-gradient-to-br from-primary-deep via-primary-deep to-primary-sky"
        aria-hidden
      />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyem0wLTR2MkgyNHYtMmgxMnoiLz48L2g+PC9nPjwvc3ZnPg==')] opacity-50"
        aria-hidden
      />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-white"
        >
          Empezá a facturar hoy
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-4 text-lg sm:text-xl text-blue-100 max-w-xl mx-auto"
        >
          Descargá la app gratis en Android. Sin tarjeta, sin compromiso.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-8"
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-accent-green text-white font-semibold text-lg hover:bg-accent-green-hover transition-all hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]"
          >
            <FaGooglePlay className="w-7 h-7" />
            Descargar gratis
          </a>
        </motion.div>
      </div>
    </section>
  );
}
