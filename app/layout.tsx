import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://facturalo.app"),
  title: "Facturalo — Facturá desde tu celular | Presupuestos y PDF",
  description:
    "App para iOS y Android. Emití facturas, presupuestos y comprobantes desde el celular, generá PDF profesionales y compartilos por WhatsApp.",
  openGraph: {
    title: "Facturalo — Facturá desde tu celular",
    description:
      "App para profesionales y PyMEs. Facturas, presupuestos y PDF en segundos. Compartí por WhatsApp.",
    type: "website",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Facturalo — Facturá desde tu celular",
    description: "Facturas, presupuestos y PDF. Simple, rápido, profesional.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
