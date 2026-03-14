"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiChevronDown } from "react-icons/hi";

const faqs = [
  {
    q: "¿Es gratis la app?",
    a: "Sí. La versión Free permite emitir hasta 10 facturas por mes, usar la plantilla Classic y compartir por WhatsApp. El plan Pro (próximamente) tendrá facturas ilimitadas y más plantillas.",
  },
  {
    q: "¿Funciona sin internet?",
    a: "Necesitás conexión para descargar la app y para algunas funciones. La creación de facturas y la generación de PDF se pueden usar offline una vez que la app está instalada.",
  },
  {
    q: "¿Puedo personalizar el PDF?",
    a: "En el plan Free usás la plantilla Classic. En Pro podrás elegir entre 4 plantillas (Classic, Modern, Minimal, Elegant), cambiar colores, fuente y pie de página, con preview en tiempo real.",
  },
  {
    q: "¿Está disponible para iOS?",
    a: "Por ahora Facturalo está disponible para Android. La versión para iOS está en desarrollo y se anunciará cuando esté lista.",
  },
  {
    q: "¿Los datos son seguros?",
    a: "Sí. Tus datos de empresa, clientes y facturas se almacenan de forma segura. No vendemos ni compartimos tu información con terceros. Revisá nuestra política de privacidad para más detalles.",
  },
  {
    q: "¿Puedo usar la app para múltiples empresas?",
    a: "En la versión actual cada instalación está asociada a un perfil/empresa. El soporte para múltiples empresas está en la hoja de ruta para futuras versiones.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 md:py-28 bg-surface-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Preguntas frecuentes
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Todo lo que necesitás saber sobre Facturalo.
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="rounded-xl border border-gray-200 bg-white overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left font-medium text-gray-900 hover:bg-gray-50/80 transition-colors"
              >
                <span>{faq.q}</span>
                <motion.span
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex-shrink-0 text-gray-400"
                >
                  <HiChevronDown className="w-5 h-5" />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-4 pt-0 text-gray-600 border-t border-gray-100">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
