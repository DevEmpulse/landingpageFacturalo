import type { InvoicePdfItem } from "../../../components/generate-invoice-pdf";

export function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };
  return text.replace(/[&<>"']/g, (c) => map[c] ?? c);
}

export function currency(amount: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatDisplayDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    return new Intl.DateTimeFormat("es-AR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(d);
  } catch {
    return dateStr;
  }
}

export function formatActivityDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    return new Intl.DateTimeFormat("es-AR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(d);
  } catch {
    return dateStr;
  }
}

export function padInvoiceNumber(num: number): string {
  return String(num).padStart(8, "0");
}

export function logoImgHtml(
  url: string | null | undefined,
  widthPx: number,
  marginBottomPx: number
): string {
  if (!url?.trim()) return "";
  const escaped = escapeHtml(url);
  return `<img src="${escaped}" alt="" width="${widthPx}" height="${widthPx}" style="width:${widthPx}px;height:${widthPx}px;object-fit:contain;margin-bottom:${marginBottomPx}px;border-radius:6px;" onerror="this.style.display='none'"/>`;
}

export function buildItemRowsHtml(
  items: InvoicePdfItem[],
  hasDiscount: boolean
): string {
  return items
    .map(
      (i) => `
    <tr>
      <td class="cell-desc">${escapeHtml(i.description)}</td>
      <td class="cell-qty">${i.quantity}</td>
      <td class="cell-price">${currency(i.unitPrice)}</td>
      ${hasDiscount ? `<td class="cell-disc">${i.discountPercent > 0 ? i.discountPercent + "%" : "—"}</td>` : ""}
      <td class="cell-total">${currency(i.total)}</td>
    </tr>`
    )
    .join("");
}

/**
 * Estilos extra para modo preview (ej. escalado en contenedor).
 */
export function previewStyles(primaryColor: string): string {
  return `<style>
  body { padding: 0; margin: 0; }
  .page { max-width: 100% !important; }
</style>`;
}
