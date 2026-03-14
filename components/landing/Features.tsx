"use client";

import { motion } from "framer-motion";
import {
  HiDocumentText,
  HiTemplate,
  HiChatAlt2,
  HiCube,
  HiUserGroup,
  HiChartBar,
} from "react-icons/hi";

const features = [
  {
    icon: HiDocumentText,
    title: "Facturas y presupuestos",
    description: "Creá comprobantes en segundos con tus datos de empresa.",
  },
  {
    icon: HiTemplate,
    title: "PDF profesional",
    description: "4 plantillas de diseño: Classic, Modern, Minimal y Elegant.",
  },
  {
    icon: HiChatAlt2,
    title: "Compartir por WhatsApp",
    description: "Enviá el PDF directo al cliente desde la app.",
  },
  {
    icon: HiCube,
    title: "Catálogo de productos",
    description: "Administrá tus productos/servicios con precios.",
  },
  {
    icon: HiUserGroup,
    title: "Cartera de clientes",
    description: "Guardá datos de clientes y reutilizalos.",
  },
  {
    icon: HiChartBar,
    title: "Dashboard de ingresos",
    description: "Mirá tu facturación mensual de un vistazo.",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export function Features() {
  return (
    <section id="features" className="py-20 md:py-28 bg-surface-gray">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Todo lo que necesitás para facturar
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Herramientas pensadas para profesionales y pequeñas empresas.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {features.map((feature, i) => (
            <motion.article
              key={i}
              variants={item}
              transition={{ duration: 0.4 }}
              className="group p-6 md:p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-primary-sky/20 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary-sky/10 text-primary-sky flex items-center justify-center mb-4 group-hover:bg-primary-sky/20 transition-colors">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
