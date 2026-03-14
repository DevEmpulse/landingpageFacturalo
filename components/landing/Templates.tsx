"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  buildClassicInvoiceHtml,
  buildModernInvoiceHtml,
  buildMinimalInvoiceHtml,
  buildElegantInvoiceHtml,
} from "../templates";
import { defaultPdfTheme } from "./template-preview-data";
import { mockInvoicePdfData } from "./template-preview-data";

const templateConfig = [
  {
    id: "classic",
    name: "Classic",
    description:
      "Header dividido, tabla limpia. Ideal para facturas tradicionales.",
    pro: false,
    build: buildClassicInvoiceHtml,
  },
  {
    id: "modern",
    name: "Modern",
    description: "Hero con color, badge flotante. Diseño actual y destacado.",
    pro: true,
    build: buildModernInvoiceHtml,
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Solo tipografía y líneas finas. Máxima legibilidad.",
    pro: true,
    build: buildMinimalInvoiceHtml,
  },
  {
    id: "elegant",
    name: "Elegant",
    description: "Barra lateral de color con empresa en vertical.",
    pro: true,
    build: buildElegantInvoiceHtml,
  },
] as const;

export function Templates() {
  const [selected, setSelected] = useState(0);
  const theme = defaultPdfTheme;
  const data = mockInvoicePdfData;

  const htmlByTemplate = useMemo(() => {
    return templateConfig.map((t) =>
      t.build(data, theme, true)
    );
  }, [data, theme]);

  const t = templateConfig[selected];
  const selectedHtml = htmlByTemplate[selected];

  return (
    <section className="py-20 md:py-28 bg-surface-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Plantillas PDF que marcan la diferencia
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Elegí el estilo que mejor represente a tu negocio.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            {templateConfig.map((template, i) => (
              <button
                key={template.id}
                type="button"
                onClick={() => setSelected(i)}
                className={`relative w-24 h-32 rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg overflow-hidden flex-shrink-0 ${
                  selected === i
                    ? "border-primary-sky shadow-md ring-2 ring-primary-sky/20"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="absolute inset-0 bg-gray-50">
                  <iframe
                    title={`Vista previa ${template.name}`}
                    srcDoc={htmlByTemplate[i]}
                    className="pointer-events-none border-0 w-[595px] h-[842px] origin-top-left"
                    style={{
                      transform: "scale(0.152)",
                      width: "595px",
                      height: "842px",
                    }}
                  />
                </div>
                {template.pro && (
                  <span className="absolute top-1 right-1 px-1.5 py-0.5 rounded bg-accent-green text-white text-[10px] font-semibold z-10">
                    Pro
                  </span>
                )}
              </button>
            ))}
          </div>

          <motion.div
            layout
            className="flex flex-col items-center lg:items-start w-full"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={selected}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="w-full max-w-sm"
              >
                <div className="aspect-[210/297] max-h-[420px] rounded-xl border border-gray-200 shadow-xl bg-white overflow-hidden relative">
                  <div className="absolute inset-0 overflow-hidden">
                    <iframe
                      title={`Preview ${t.name}`}
                      srcDoc={selectedHtml}
                      className="border-0 w-[595px] h-[842px] origin-top-left"
                      style={{
                        transform: "scale(0.5)",
                        width: "595px",
                        height: "842px",
                      }}
                    />
                  </div>
                </div>
                <div className="mt-6 text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start gap-2">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {t.name}
                    </h3>
                    {t.pro && (
                      <span className="px-2 py-0.5 rounded bg-accent-green/15 text-accent-green text-sm font-medium">
                        Pro
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-gray-600">{t.description}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
