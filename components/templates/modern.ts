import { hexToRgba, type PdfTheme } from "../../features/pdf-settings/lib/pdf-theme";
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
 * MODERN — Header full-color con empresa centrada y tipo+número superpuestos,
 * tarjetas de cliente en grid 2-col, tabla con bordes redondeados completos
 * y totales en banner de color.
 */
export function buildModernInvoiceHtml(
  data: InvoicePdfData,
  theme: PdfTheme,
  preview: boolean,
): string {
  const { primaryColor, secondaryColor, fontFamily, footerText } = theme;
  const footerStr = escapeHtml(footerText ?? "Documento no fiscal generado por Facturando");
  const hasDiscount = data.items.some((i) => i.discountPercent > 0);
  const itemRows = buildItemRowsHtml(data.items, hasDiscount);
  const logo = logoImgHtml(data.businessLogoUrl, 56, 12);

  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<style>
  @page { margin: 0; }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: ${fontFamily}; color: #1e293b; font-size: 11px; line-height: 1.5; background: #fff; }
  .page { max-width: 595px; margin: 0 auto; }

  /* ── HERO HEADER ── */
  .hero { background: ${primaryColor}; padding: 28px 36px 48px; position: relative; border-radius: 0 0 24px 24px; }
  .hero-top { display: flex; align-items: center; gap: 14px; margin-bottom: 20px; }
  .biz-name { font-size: 18px; font-weight: 900; color: #fff; text-transform: uppercase; letter-spacing: 1px; }
  .biz-sub { font-size: 9px; color: ${hexToRgba("#ffffff", 0.65)}; margin-top: 2px; }
  .badge-container { position: absolute; bottom: -28px; left: 50%; transform: translateX(-50%); display: flex; align-items: center; gap: 12px; background: #fff; border-radius: 14px; padding: 10px 24px; box-shadow: 0 6px 24px rgba(0,0,0,0.12); }
  .badge-type { width: 44px; height: 44px; background: ${primaryColor}; border-radius: 10px; display: flex; align-items: center; justify-content: center; }
  .badge-type span { font-size: 24px; font-weight: 900; color: #fff; line-height: 1; }
  .badge-info {}
  .badge-label { font-size: 8px; color: #94a3b8; text-transform: uppercase; letter-spacing: 1.2px; font-weight: 700; }
  .badge-num { font-size: 16px; font-weight: 800; color: ${primaryColor}; font-family: 'Courier New', monospace; }

  .body-pad { padding: 52px 36px 28px; }

  /* ── META ROW ── */
  .meta-strip { display: flex; gap: 6px; margin-bottom: 24px; flex-wrap: wrap; }
  .meta-chip { background: ${hexToRgba(secondaryColor, 0.1)}; border-radius: 20px; padding: 5px 14px; font-size: 9px; color: #334155; }
  .meta-chip strong { color: ${primaryColor}; }

  /* ── CLIENT CARDS ── */
  .client-grid { display: flex; gap: 14px; margin-bottom: 24px; }
  .client-card { flex: 1; background: ${hexToRgba(secondaryColor, 0.07)}; border-left: 3px solid ${primaryColor}; border-radius: 0 8px 8px 0; padding: 14px 16px; }
  .card-label { font-size: 7px; font-weight: 800; text-transform: uppercase; letter-spacing: 1.5px; color: #94a3b8; margin-bottom: 6px; }
  .card-name { font-size: 13px; font-weight: 700; color: ${primaryColor}; margin-bottom: 3px; }
  .card-detail { font-size: 9px; color: #64748b; line-height: 1.8; }

  /* ── ITEMS ── */
  .table-wrapper { border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; margin-bottom: 0; }
  .items-table { width: 100%; border-collapse: collapse; }
  .items-table thead th { background: ${primaryColor}; color: #f1f5f9; font-size: 7.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; padding: 11px 16px; text-align: left; }
  .items-table thead th.th-qty, .items-table thead th.th-disc { text-align: center; }
  .items-table thead th.th-price { text-align: right; }
  .items-table thead th:last-child { text-align: right; }
  .items-table tbody tr { border-bottom: 1px solid #f1f5f9; }
  .items-table tbody tr:last-child { border-bottom: none; }
  .items-table td { padding: 12px 16px; font-size: 10px; color: #334155; vertical-align: middle; }
  .cell-desc { font-weight: 500; }
  .cell-qty { text-align: center; width: 52px; color: #64748b; }
  .cell-price { text-align: right; width: 95px; }
  .cell-disc { text-align: center; width: 52px; color: #dc2626; font-weight: 600; font-size: 9px; }
  .cell-total { text-align: right; width: 95px; font-weight: 700; color: ${primaryColor}; }

  /* ── TOTALS ── */
  .totals-area { display: flex; justify-content: flex-end; padding: 18px 0 24px; }
  .totals-box { width: 260px; }
  .t-row { display: flex; justify-content: space-between; padding: 6px 0; font-size: 10px; color: #64748b; border-bottom: 1px dashed #e2e8f0; }
  .t-row:last-of-type { border-bottom: none; }
  .t-row .t-val { font-weight: 600; color: #334155; }
  .total-banner { margin-top: 10px; background: ${primaryColor}; border-radius: 12px; padding: 14px 18px; display: flex; justify-content: space-between; align-items: center; }
  .total-banner .t-label { font-size: 11px; font-weight: 800; color: ${hexToRgba("#ffffff", 0.75)}; text-transform: uppercase; letter-spacing: 1px; }
  .total-banner .t-val { font-size: 20px; font-weight: 900; color: #fff; }

  /* ── FOOTER ── */
  .footer { margin: 0 36px; border-top: 1px solid #e2e8f0; padding: 12px 0 24px; text-align: center; font-size: 8px; color: #94a3b8; }
  .footer span { color: ${secondaryColor}; font-weight: 600; }
</style>
${preview ? previewStyles(primaryColor) : ""}
</head>
<body>
<div class="page">

  <div class="hero">
    <div class="hero-top">
      ${logo}
      <div>
        <div class="biz-name">${escapeHtml(data.businessName)}</div>
        <div class="biz-sub">${escapeHtml(data.ivaCondition)}${data.businessTaxId ? ` &bull; CUIT ${data.businessTaxId}` : ""}${data.businessAddress ? ` &bull; ${escapeHtml(data.businessAddress)}` : ""}</div>
      </div>
    </div>
    <div class="badge-container">
      <div class="badge-type"><span>${escapeHtml(data.invoiceType)}</span></div>
      <div class="badge-info">
        <div class="badge-label">Comprobante</div>
        <div class="badge-num">Nº ${padInvoiceNumber(data.invoiceNumber)}</div>
      </div>
    </div>
  </div>

  <div class="body-pad">

    <div class="meta-strip">
      <div class="meta-chip">Fecha: <strong>${formatDisplayDate(data.date)}</strong></div>
      ${data.businessTaxId ? `<div class="meta-chip">CUIT: <strong>${data.businessTaxId}</strong></div>` : ""}
      ${data.iibbNumber ? `<div class="meta-chip">IIBB: <strong>${data.iibbNumber}</strong></div>` : ""}
      ${data.activitiesStartDate ? `<div class="meta-chip">Inicio Act.: <strong>${formatActivityDate(data.activitiesStartDate)}</strong></div>` : ""}
    </div>

    <div class="client-grid">
      <div class="client-card">
        <div class="card-label">Facturado a</div>
        <div class="card-name">${escapeHtml(data.clientName)}</div>
        <div class="card-detail">${data.clientTaxId ? `CUIT: ${data.clientTaxId}` : ""}</div>
      </div>
      ${data.clientAddress ? `<div class="client-card"><div class="card-label">Domicilio</div><div class="card-detail">${escapeHtml(data.clientAddress)}</div></div>` : ""}
    </div>

    <div class="table-wrapper">
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
    </div>

    <div class="totals-area">
      <div class="totals-box">
        <div class="t-row"><span class="t-label">Subtotal</span><span class="t-val">${currency(data.netTotal)}</span></div>
        <div class="t-row"><span class="t-label">Impuestos</span><span class="t-val">${currency(data.taxTotal)}</span></div>
        <div class="total-banner">
          <span class="t-label">Total</span>
          <span class="t-val">${currency(data.total)}</span>
        </div>
      </div>
    </div>

  </div>

  <div class="footer">${footerStr} &mdash; ${formatDisplayDate(data.date)}</div>
</div>
</body>
</html>`;
}
