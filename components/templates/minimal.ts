import { type PdfTheme } from "../../features/pdf-settings/lib/pdf-theme";
import {
  buildItemRowsHtml,
  currency,
  escapeHtml,
  formatActivityDate,
  formatDisplayDate,
  logoImgHtml,
  padInvoiceNumber,
  previewStyles,
} from "../../features/pdf-settings/lib/pdf-shared";
import type { InvoicePdfData } from "../generate-invoice-pdf";

/**
 * MINIMAL — Solo tipografía y líneas finas, sin fondo ni bordes decorativos.
 * Empresa + logo arriba izquierda, tipo + número arriba derecha como texto puro.
 * Cliente en dos columnas separadas por línea vertical. Tabla limpia sin zebra.
 * Total en línea gruesa inferior.
 */
export function buildMinimalInvoiceHtml(
  data: InvoicePdfData,
  theme: PdfTheme,
  preview: boolean,
): string {
  const { primaryColor, secondaryColor, fontFamily, footerText } = theme;
  const footerStr = escapeHtml(footerText ?? "Documento no fiscal generado por Facturando");
  const hasDiscount = data.items.some((i) => i.discountPercent > 0);
  const itemRows = buildItemRowsHtml(data.items, hasDiscount);
  const logo = logoImgHtml(data.businessLogoUrl, 44, 4);

  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<style>
  @page { margin: 0; }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: ${fontFamily}; color: #1e293b; font-size: 11px; line-height: 1.5; background: #fff; }
  .page { max-width: 595px; margin: 0 auto; padding: 40px 44px 32px; }

  /* ── HEADER ── */
  .header { display: flex; justify-content: space-between; align-items: flex-start; padding-bottom: 20px; border-bottom: 2px solid ${primaryColor}; margin-bottom: 24px; }
  .biz-block { display: flex; gap: 12px; align-items: flex-start; }
  .biz-name { font-size: 16px; font-weight: 900; color: ${primaryColor}; letter-spacing: 0.3px; }
  .biz-iva { font-size: 9px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.8px; margin-top: 2px; }
  .biz-detail { font-size: 9px; color: #64748b; line-height: 1.8; margin-top: 4px; }

  .doc-block { text-align: right; }
  .doc-type { font-size: 32px; font-weight: 900; color: ${primaryColor}; line-height: 1; }
  .doc-label { font-size: 9px; color: #94a3b8; text-transform: uppercase; letter-spacing: 1.2px; margin-bottom: 2px; }
  .doc-num { font-size: 13px; font-weight: 700; color: #334155; font-family: 'Courier New', monospace; }
  .doc-date { font-size: 9px; color: #64748b; margin-top: 4px; }

  /* ── CLIENT ── */
  .client-row { display: flex; gap: 0; margin-bottom: 28px; }
  .client-col { flex: 1; padding-right: 20px; }
  .client-col + .client-col { padding-right: 0; padding-left: 20px; border-left: 1px solid #e2e8f0; }
  .col-label { font-size: 7.5px; font-weight: 800; text-transform: uppercase; letter-spacing: 1.5px; color: #94a3b8; margin-bottom: 5px; }
  .client-name { font-size: 14px; font-weight: 700; color: ${primaryColor}; }
  .client-detail { font-size: 9px; color: #64748b; line-height: 1.8; margin-top: 2px; }

  /* ── ITEMS ── */
  .items-table { width: 100%; border-collapse: collapse; }
  .items-table thead th { border-top: 1px solid #cbd5e1; border-bottom: 1px solid #cbd5e1; font-size: 7.5px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: #64748b; padding: 9px 0; text-align: left; background: none; }
  .items-table thead th.th-qty, .items-table thead th.th-disc { text-align: center; }
  .items-table thead th.th-price, .items-table thead th:last-child { text-align: right; }
  .items-table tbody tr { border-bottom: 1px solid #f1f5f9; }
  .items-table tbody tr:last-child { border-bottom: none; }
  .items-table td { padding: 10px 0; font-size: 10px; color: #334155; vertical-align: middle; }
  .cell-desc { font-weight: 500; }
  .cell-qty { text-align: center; width: 52px; color: #64748b; }
  .cell-price { text-align: right; width: 95px; }
  .cell-disc { text-align: center; width: 52px; color: #dc2626; font-weight: 600; font-size: 9px; }
  .cell-total { text-align: right; width: 95px; font-weight: 700; color: ${primaryColor}; }

  /* ── TOTALS ── */
  .totals-area { display: flex; justify-content: flex-end; padding: 16px 0 24px; }
  .totals-box { width: 240px; }
  .t-row { display: flex; justify-content: space-between; padding: 5px 0; font-size: 10px; color: #64748b; }
  .t-row .t-val { font-weight: 600; color: #334155; }
  .t-divider { border-top: 2px solid ${primaryColor}; margin: 8px 0; }
  .t-final { display: flex; justify-content: space-between; padding: 8px 0; }
  .t-final .t-label { font-size: 12px; font-weight: 800; color: ${primaryColor}; text-transform: uppercase; letter-spacing: 0.5px; }
  .t-final .t-val { font-size: 20px; font-weight: 900; color: ${primaryColor}; }

  /* ── FOOTER ── */
  .footer { border-top: 1px solid #e2e8f0; padding-top: 12px; font-size: 8px; color: #94a3b8; display: flex; justify-content: space-between; }
  .footer span { color: ${secondaryColor}; font-weight: 600; }
</style>
${preview ? previewStyles(primaryColor) : ""}
</head>
<body>
<div class="page">

  <div class="header">
    <div class="biz-block">
      ${logo}
      <div>
        <div class="biz-name">${escapeHtml(data.businessName)}</div>
        <div class="biz-iva">${escapeHtml(data.ivaCondition)}</div>
        <div class="biz-detail">
          ${data.businessAddress ? `${escapeHtml(data.businessAddress)}<br/>` : ""}
          ${data.businessTaxId ? `CUIT: ${data.businessTaxId}` : ""}
          ${data.iibbNumber ? `<br/>IIBB: ${data.iibbNumber}` : ""}
        </div>
      </div>
    </div>
    <div class="doc-block">
      <div class="doc-type">${escapeHtml(data.invoiceType)}</div>
      <div class="doc-label" style="margin-top:4px">Comprobante</div>
      <div class="doc-num">Nº ${padInvoiceNumber(data.invoiceNumber)}</div>
      <div class="doc-date">${formatDisplayDate(data.date)}</div>
    </div>
  </div>

  <div class="client-row">
    <div class="client-col">
      <div class="col-label">Facturado a</div>
      <div class="client-name">${escapeHtml(data.clientName)}</div>
      <div class="client-detail">${data.clientTaxId ? `CUIT: ${data.clientTaxId}` : "&nbsp;"}</div>
    </div>
    ${data.clientAddress ? `<div class="client-col"><div class="col-label">Domicilio</div><div class="client-detail">${escapeHtml(data.clientAddress)}</div></div>` : ""}
    ${data.activitiesStartDate ? `<div class="client-col"><div class="col-label">Inicio Actividades</div><div class="client-detail">${formatActivityDate(data.activitiesStartDate)}</div></div>` : ""}
  </div>

  <table class="items-table">
    <thead>
      <tr>
        <th>Descripción</th>
        <th class="th-qty">Cant.</th>
        <th class="th-price">Precio Unit.</th>
        ${hasDiscount ? `<th class="th-disc">Dto.</th>` : ""}
        <th style="text-align:right">Importe</th>
      </tr>
    </thead>
    <tbody>${itemRows}</tbody>
  </table>

  <div class="totals-area">
    <div class="totals-box">
      <div class="t-row"><span class="t-label">Subtotal</span><span class="t-val">${currency(data.netTotal)}</span></div>
      <div class="t-row"><span class="t-label">Impuestos</span><span class="t-val">${currency(data.taxTotal)}</span></div>
      <div class="t-divider"></div>
      <div class="t-final"><span class="t-label">Total</span><span class="t-val">${currency(data.total)}</span></div>
    </div>
  </div>

  <div class="footer">
    <span>${footerStr}</span>
    <span>${formatDisplayDate(data.date)}</span>
  </div>
</div>
</body>
</html>`;
}
