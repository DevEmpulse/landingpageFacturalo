/**
 * Tema visual para las plantillas PDF (colores, fuente, pie).
 */
export interface PdfTheme {
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  footerText?: string | null;
}

/**
 * Convierte un color hex a rgba(..., alpha).
 */
export function hexToRgba(hex: string, alpha: number): string {
  const m = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (!m) return hex;
  const r = parseInt(m[1], 16);
  const g = parseInt(m[2], 16);
  const b = parseInt(m[3], 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
