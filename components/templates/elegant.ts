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
 * ELEGANT — Barra lateral izquierda de color con datos de empresa en vertical,
 * número grande en la barra. Cuerpo principal a la derecha con cliente en ficha
 * destacada, tabla sin bordes externos y totales en bloque centrado inferior.
 */
export function buildElegantInvoiceHtml(
  data: InvoicePdfData,
  theme: PdfTheme,
  preview: boolean,
): string {
  const { primaryColor, secondaryColor, fontFamily, footerText } = theme;
  const footerStr = escapeHtml(footerText ?? "Documento no fiscal generado por Facturando");
  const hasDiscount = data.items.some((i) => i.discountPercent > 0);
  const itemRows = buildItemRowsHtml(data.items, hasDiscount);
  const logo = logoImgHtml(data.businessLogoUrl, 52, 26);

  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<style>
  @page { margin: 0; }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: ${fontFamily}; color: #1e293b; font-size: 11px; line-height: 1.5; background: #fff; }
  .page { max-width: 595px; margin: 0 auto; min-height: 840px; display: flex; }

  /* ── SIDEBAR ── */
  .sidebar { width: 155px; flex-shrink: 0; background: ${primaryColor}; padding: 32px 18px; display: flex; flex-direction: column; gap: 0; }
  .sidebar-logo { margin-bottom: 20px; }
  .sidebar-biz-name { font-size: 13px; font-weight: 900; color: #fff; text-transform: uppercase; letter-spacing: 0.5px; line-height: 1.3; margin-bottom: 6px; }
  .sidebar-iva { font-size: 7.5px; color: ${hexToRgba("#ffffff", 0.55)}; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 14px; }
  .sidebar-detail { font-size: 8px; color: ${hexToRgba("#ffffff", 0.7)}; line-height: 1.9; }
  .sidebar-divider { border-top: 1px solid ${hexToRgba("#ffffff", 0.18)}; margin: 20px 0; }
  .sidebar-type-label { font-size: 7px; color: ${hexToRgba("#ffffff", 0.45)}; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 4px; }
  .sidebar-type { font-size: 52px; font-weight: 900; color: #fff; line-height: 1; opacity: 0.9; }
  .sidebar-num-label { font-size: 7px; color: ${hexToRgba("#ffffff", 0.45)}; text-transform: uppercase; letter-spacing: 1.2px; margin-top: 10px; margin-bottom: 2px; }
  .sidebar-num { font-size: 9px; font-weight: 700; color: ${hexToRgba("#ffffff", 0.9)}; font-family: 'Courier New', monospace; word-break: break-all; }
  .sidebar-date-label { font-size: 7px; color: ${hexToRgba("#ffffff", 0.45)}; text-transform: uppercase; letter-spacing: 1.2px; margin-top: 10px; margin-bottom: 2px; }
  .sidebar-date { font-size: 9px; font-weight: 700; color: ${hexToRgba("#ffffff", 0.9)}; }

  /* ── MAIN ── */
  .main { flex: 1; padding: 32px 28px 28px; display: flex; flex-direction: column; }

  .main-title { font-size: 10px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 20px; padding-bottom: 12px; border-bottom: 1px solid #e2e8f0; }

  /* ── CLIENT CARD ── */
  .client-card { background: ${hexToRgba(secondaryColor, 0.08)}; border-radius: 10px; padding: 14px 16px; margin-bottom: 22px; }
  .client-header { display: flex; justify-content: space-between; align-items: flex-start; }
  .client-label { font-size: 7px; font-weight: 800; text-transform: uppercase; letter-spacing: 1.5px; color: #94a3b8; margin-bottom: 5px; }
  .client-name { font-size: 14px; font-weight: 800; color: ${primaryColor}; }
  .client-details { font-size: 9px; color: #64748b; margin-top: 4px; line-height: 1.8; }
  .client-badge { background: ${primaryColor}; color: #fff; font-size: 7.5px; font-weight: 700; padding: 3px 10px; border-radius: 20px; text-transform: uppercase; letter-spacing: 0.8px; white-space: nowrap; }

  /* ── ITEMS ── */
  .items-table { width: 100%; border-collapse: collapse; }
  .items-table thead th { border-bottom: 2px solid ${primaryColor}; font-size: 7.5px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: ${primaryColor}; padding: 8px 0; text-align: left; background: none; }
  .items-table thead th.th-qty, .items-table thead th.th-disc { text-align: center; }
  .items-table thead th.th-price, .items-table thead th:last-child { text-align: right; }
  .items-table tbody tr { border-bottom: 1px solid #f1f5f9; }
  .items-table tbody tr:last-child { border-bottom: 1px solid #e2e8f0; }
  .items-table td { padding: 10px 0; font-size: 10px; color: #334155; vertical-align: middle; }
  .cell-desc { font-weight: 500; }
  .cell-qty { text-align: center; width: 40px; color: #64748b; }
  .cell-price { text-align: right; width: 85px; }
  .cell-disc { text-align: center; width: 40px; color: #dc2626; font-weight: 600; font-size: 9px; }
  .cell-total { text-align: right; width: 85px; font-weight: 700; color: ${primaryColor}; }

  /* ── TOTALS ── */
  .totals-block { margin-top: 16px; }
  .t-row { display: flex; justify-content: space-between; padding: 5px 0; font-size: 10px; color: #64748b; }
  .t-row .t-val { font-weight: 600; color: #334155; }
  .t-total-row { display: flex; justify-content: space-between; align-items: center; margin-top: 10px; padding: 14px 18px; background: ${primaryColor}; border-radius: 10px; }
  .t-total-row .t-label { font-size: 11px; font-weight: 800; color: ${hexToRgba("#ffffff", 0.75)}; text-transform: uppercase; letter-spacing: 1px; }
  .t-total-row .t-val { font-size: 20px; font-weight: 900; color: #fff; }

  /* ── FOOTER ── */
  .footer { margin-top: auto; padding-top: 16px; border-top: 1px solid #f1f5f9; font-size: 7.5px; color: #94a3b8; text-align: center; }
  .footer span { color: ${secondaryColor}; font-weight: 600; }
</style>
${preview ? `<style>
  body { padding: 0; }
  .page { max-width: 100%; min-height: unset; }
  .sidebar { width: 120px; padding: 18px 12px; }
  .sidebar-type { font-size: 38px; }
  .main { padding: 18px 16px 16px; }
  @media (max-width: 480px) {
    .page { flex-direction: column; }
    .sidebar { width: 100%; flex-direction: row; flex-wrap: wrap; gap: 10px; padding: 14px; }
    .sidebar-type { font-size: 32px; }
    .sidebar-divider { display: none; }
  }
</style>` : ""}
</head>
<body>
<div class="page">

  <div class="sidebar">
    ${logo ? `<div class="sidebar-logo">${logo.replace(/width:\d+px/, "width:48px").replace(/height:\d+px/, "height:48px")}</div>` : ""}
    <div class="sidebar-biz-name">${escapeHtml(data.businessName)}</div>
    <div class="sidebar-iva">${escapeHtml(data.ivaCondition)}</div>
    <div class="sidebar-detail">
      ${data.businessAddress ? `${escapeHtml(data.businessAddress)}<br/>` : ""}
      ${data.businessTaxId ? `CUIT:<br/>${data.businessTaxId}` : ""}
      ${data.iibbNumber ? `<br/>IIBB: ${data.iibbNumber}` : ""}
    </div>
    <div class="sidebar-divider"></div>
    <div class="sidebar-type-label">Tipo</div>
    <div class="sidebar-type">${escapeHtml(data.invoiceType)}</div>
    <div class="sidebar-num-label">Número</div>
    <div class="sidebar-num">${padInvoiceNumber(data.invoiceNumber)}</div>
    <div class="sidebar-date-label">Fecha</div>
    <div class="sidebar-date">${formatDisplayDate(data.date)}</div>
    ${data.activitiesStartDate ? `<div class="sidebar-date-label" style="margin-top:10px">Inicio Act.</div><div class="sidebar-date">${formatActivityDate(data.activitiesStartDate)}</div>` : ""}
  </div>

  <div class="main">
    <div class="main-title">Comprobante de venta</div>

    <div class="client-card">
      <div class="client-header">
        <div>
          <div class="client-label">Facturado a</div>
          <div class="client-name">${escapeHtml(data.clientName)}</div>
          <div class="client-details">
            ${data.clientTaxId ? `CUIT: ${data.clientTaxId}<br/>` : ""}
            ${data.clientAddress ? escapeHtml(data.clientAddress) : ""}
          </div>
        </div>
        <div class="client-badge">${escapeHtml(data.invoiceType)}</div>
      </div>
    </div>

    <table class="items-table">
      <thead>
        <tr>
          <th>Descripción</th>
          <th class="th-qty">Cant.</th>
          <th class="th-price">Precio</th>
          ${hasDiscount ? `<th class="th-disc">Dto.</th>` : ""}
          <th style="text-align:right">Total</th>
        </tr>
      </thead>
      <tbody>${itemRows}</tbody>
    </table>

    <div class="totals-block">
      <div class="t-row"><span class="t-label">Subtotal</span><span class="t-val">${currency(data.netTotal)}</span></div>
      <div class="t-row"><span class="t-label">Impuestos</span><span class="t-val">${currency(data.taxTotal)}</span></div>
      <div class="t-total-row">
        <span class="t-label">Total</span>
        <span class="t-val">${currency(data.total)}</span>
      </div>
    </div>

    <div class="footer">${footerStr}</div>
  </div>

</div>
</body>
</html>`;
}
