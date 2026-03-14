"use client";

import Link from "next/link";
import { HiDocumentText } from "react-icons/hi";

export function Footer() {
  return (
    <footer className="py-12 md:py-16 bg-surface-gray border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-2 text-primary-deep font-semibold text-lg">
            <HiDocumentText className="w-6 h-6 text-primary-sky" />
            <span>Facturalo</span>
          </Link>
          <p className="text-sm text-gray-500 text-center md:text-left max-w-md">
            Facturá desde tu celular. Simple, rápido, profesional.
          </p>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex gap-6">
            <Link
              href="/privacidad"
              className="text-sm text-gray-500 hover:text-primary-deep transition-colors"
            >
              Privacidad
            </Link>
            <Link
              href="/terminos"
              className="text-sm text-gray-500 hover:text-primary-deep transition-colors"
            >
              Términos
            </Link>
          </div>
          <p className="text-sm text-gray-500">
            Hecho con ❤️ para pequeños negocios
          </p>
        </div>
      </div>
    </footer>
  );
}
