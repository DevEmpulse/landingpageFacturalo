"use client";

import { motion } from "framer-motion";
import { HiCheck, HiSparkles } from "react-icons/hi";

const freeFeatures = [
  "Hasta 10 facturas/mes",
  "Plantilla Classic",
  "Compartir por WhatsApp",
  "Sin personalización de PDF",
];

const proFeatures = [
  "Facturas ilimitadas",
  "Facturación electrónica con ARCA",
  "4 plantillas de diseño",
  "Personalización de colores, fuente y pie de página",
  "Preview en tiempo real",
  "Soporte prioritario",
];

export function Pricing() {
  return (
    <section id="precios" className="py-20 md:py-28 bg-surface-gray">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Planes simples, sin sorpresas
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Empezá gratis. Pasate a Pro cuando lo necesites.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative p-8 rounded-2xl bg-white border border-gray-200 shadow-sm"
          >
            <h3 className="text-xl font-semibold text-gray-900">Free</h3>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-4xl font-bold text-gray-900">$0</span>
              <span className="text-gray-500">/mes</span>
            </div>
            <ul className="mt-6 space-y-3">
              {freeFeatures.map((f, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-600">
                  <HiCheck className="w-5 h-5 text-accent-green flex-shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <a
              href="#descargar"
              className="mt-8 block w-full py-3 rounded-xl border-2 border-gray-200 text-gray-700 font-semibold text-center hover:border-gray-300 hover:bg-gray-50 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Empezar gratis
            </a>
          </motion.div>

          {/* Pro */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative p-8 rounded-2xl bg-white border-2 border-primary-sky shadow-lg overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 opacity-30"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.15), transparent)",
              }}
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                repeatDelay: 1,
              }}
            />
            <div className="absolute top-4 right-4">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary-sky/15 text-primary-deep text-sm font-semibold">
                <HiSparkles className="w-4 h-4" />
                Más popular
              </span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Pro</h3>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-4xl font-bold text-primary-deep">Próximamente</span>
            </div>
            <p className="mt-1 text-sm text-gray-500">Precio mensual a confirmar</p>
            <ul className="mt-6 space-y-3">
              {proFeatures.map((f, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-600">
                  <HiCheck className="w-5 h-5 text-accent-green flex-shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <button
              type="button"
              disabled
              className="mt-8 block w-full py-3.5 rounded-xl bg-accent-green text-white font-semibold text-center hover:bg-accent-green-hover transition-all hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              Próximamente
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
