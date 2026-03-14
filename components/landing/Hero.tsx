"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FaGooglePlay } from "react-icons/fa";
import { HiDevicePhoneMobile } from "react-icons/hi2";

const floatingDocs = [
  { src: "/hero-float-1.png", x: "10%", y: "15%", delay: 0, size: 100, drift: "drift1", duration: 22 },
  { src: "/hero-float-2.png", x: "70%", y: "20%", delay: 0.4, size: 90, drift: "drift2", duration: 26 },
  { src: "/hero-float-3.png", x: "20%", y: "65%", delay: 0.8, size: 95, drift: "drift3", duration: 24 },
  { src: "/hero-float-4.png", x: "75%", y: "60%", delay: 0.2, size: 88, drift: "drift4", duration: 28 },
  { src: "/hero-float-1.png", x: "45%", y: "10%", delay: 0.6, size: 82, drift: "drift5", duration: 25 },
  { src: "/hero-float-2.png", x: "5%", y: "45%", delay: 0.1, size: 86, drift: "drift6", duration: 23 },
  { src: "/hero-float-3.png", x: "85%", y: "55%", delay: 0.5, size: 78, drift: "drift7", duration: 27 },
  { src: "/hero-float-4.png", x: "50%", y: "75%", delay: 0.3, size: 92, drift: "drift8", duration: 21 },
];

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-surface-white pt-24 pb-16 md:pt-28">
      {/* Facturas recorriendo el hero en horizontal y vertical */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {floatingDocs.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 0.18, scale: 1 }}
            transition={{ delay: 1.2 + item.delay, duration: 0.7 }}
            style={{
              left: item.x,
              top: item.y,
              animation: `${item.drift} ${item.duration}s ease-in-out infinite`,
              width: item.size,
              height: (item.size * 297) / 210,
            }}
            className="absolute rounded-lg overflow-hidden shadow-lg"
          >
            <div className="relative w-full h-full">
              <Image
                src={item.src}
                alt=""
                fill
                className="object-cover rounded-lg"
                sizes={`${item.size}px`}
              />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative z-10">
           

            <motion.h1
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight"
            >
              Facturá desde tu celular.{" "}
              <span className="text-primary-deep">Simple, rápido, profesional.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-6 text-lg sm:text-xl text-gray-600 max-w-xl"
            >
              Emití facturas, presupuestos y comprobantes en segundos. Generá PDF de calidad y compartilos por WhatsApp desde la app.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <a
                href="#descargar"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-accent-green text-white font-semibold hover:bg-accent-green-hover transition-all hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]"
              >
                <FaGooglePlay className="w-6 h-6" />
                Descargar para Android
              </a>
              <button
                type="button"
                disabled
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border-2 border-gray-200 text-gray-400 font-semibold cursor-not-allowed"
              >
                <HiDevicePhoneMobile className="w-5 h-5" />
                Próximamente en iOS
              </button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 48 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 80, damping: 18 }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative">
              <div className="w-56 sm:w-64 md:w-72 aspect-[9/19] rounded-[2.5rem] bg-gray-800 shadow-2xl border-8 border-gray-900 overflow-hidden">
                <div className="relative w-full h-full">
                  <Image
                    src="/hero-app-preview.png"
                    alt="Pantalla de inicio de Facturalo — facturado en marzo, acciones rápidas, últimos comprobantes"
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 224px, 288px"
                    priority
                  />
                </div>
              </div>
              <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-gray-500" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
