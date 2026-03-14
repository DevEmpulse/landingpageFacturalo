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
import type { InvoicePdfData, InvoicePdfItem } from "../generate-invoice-pdf";

/**
 * CLASSIC — Disposición tradicional:
 * Header partido en dos (empresa | tipo+número), cliente en panel horizontal,
 * tabla de ítems ancha, totales alineados a la derecha.
 */
export function buildClassicInvoiceHtml(
  data: InvoicePdfData,
  theme: PdfTheme,
  preview: boolean,
): string {
  const { primaryColor, secondaryColor, fontFamily, footerText } = theme;
  const footerStr = escapeHtml(footerText ?? "Documento no fiscal generado por Facturando");
  const hasDiscount = data.items.some((i: InvoicePdfItem) => i.discountPercent > 0);
  const itemRows = buildItemRowsHtml(data.items, hasDiscount);
  const logo = logoImgHtml(data.businessLogoUrl, 52, 8);

  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<style>
  @page { margin: 0; }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: ${fontFamily}; color: #1e293b; font-size: 11px; line-height: 1.5; background:#fff; }
  .page { max-width: 595px; margin: 0 auto; padding: 36px 40px 28px; }

  .header-wrapper { border: 2px solid ${primaryColor}; border-radius: 10px; overflow: hidden; margin-bottom: 22px; }
  .header-top { display: flex; position: relative; }
  .header-left { flex: 1; padding: 20px 22px; display: flex; gap: 14px; align-items: flex-start; border-right: 1px solid ${primaryColor}; }
  .biz-name { font-size: 15px; font-weight: 800; color: ${primaryColor}; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 3px; }
  .biz-iva { display: inline-block; font-size: 8px; font-weight: 700; color: ${primaryColor}; text-transform: uppercase; letter-spacing: 0.8px; background: ${hexToRgba(secondaryColor, 0.14)}; padding: 2px 8px; border-radius: 4px; margin-bottom: 8px; }
  .biz-detail { font-size: 9px; color: #64748b; line-height: 1.7; }
  .type-badge-wrapper { position: absolute; top: -2px; left: 50%; transform: translateX(-50%); z-index: 10; }
  .type-badge { width: 48px; height: 48px; background: ${primaryColor}; border-radius: 0 0 8px 8px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(15,23,42,0.25); }
  .type-letter { font-size: 26px; font-weight: 900; color: #fff; line-height: 1; }
  .header-right { flex: 1; padding: 20px 22px; }
  .invoice-label { font-size: 9px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 2px; }
  .invoice-num { font-size: 18px; font-weight: 800; color: ${primaryColor}; font-family: 'Courier New', monospace; letter-spacing: 0.5px; margin-bottom: 12px; }
  .meta-row { display: flex; justify-content: space-between; font-size: 9px; color: #64748b; padding: 2px 0; }
  .meta-val { font-weight: 700; color: #334155; }

  .client-section { display: flex; gap: 20px; margin-bottom: 22px; padding: 16px 20px; background: ${hexToRgba(secondaryColor, 0.07)}; border: 1px solid #e2e8f0; border-radius: 8px; }
  .client-col { flex: 1; }
  .section-label { font-size: 7px; font-weight: 800; text-transform: uppercase; letter-spacing: 1.5px; color: #94a3b8; margin-bottom: 6px; }
  .client-name { font-size: 13px; font-weight: 700; color: ${primaryColor}; margin-bottom: 2px; }
  .client-detail { font-size: 9px; color: #64748b; line-height: 1.7; }

  .items-table { width: 100%; border-collapse: collapse; margin-bottom: 0; }
  .items-table thead th { background: ${primaryColor}; color: #f1f5f9; font-size: 7.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; padding: 10px 14px; text-align: left; }
  .items-table thead th:first-child { border-radius: 8px 0 0 0; }
  .items-table thead th:last-child { border-radius: 0 8px 0 0; text-align: right; }
  .items-table thead th.th-qty, .items-table thead th.th-disc { text-align: center; }
  .items-table thead th.th-price { text-align: right; }
  .items-table tbody tr { border-bottom: 1px solid #f1f5f9; }
  .items-table tbody tr:nth-child(even) { background: #fafbfc; }
  .items-table td { padding: 11px 14px; font-size: 10px; color: #334155; vertical-align: middle; }
  .cell-desc { font-weight: 500; }
  .cell-qty { text-align: center; width: 52px; color: #64748b; }
  .cell-price { text-align: right; width: 95px; }
  .cell-disc { text-align: center; width: 52px; color: #dc2626; font-weight: 600; font-size: 9px; }
  .cell-total { text-align: right; width: 95px; font-weight: 700; color: ${primaryColor}; }

  .totals-wrapper { display: flex; justify-content: flex-end; padding: 16px 0 24px; }
  .totals-box { width: 250px; }
  .totals-row { display: flex; justify-content: space-between; align-items: center; padding: 7px 0; font-size: 10px; color: #64748b; }
  .totals-row .t-val { font-weight: 600; color: #334155; }
  .totals-row.total-final { margin-top: 6px; padding: 12px 16px; background: ${primaryColor}; border-radius: 8px; }
  .totals-row.total-final .t-label { font-size: 11px; font-weight: 800; color: #e2e8f0; text-transform: uppercase; letter-spacing: 1px; }
  .totals-row.total-final .t-val { font-size: 18px; font-weight: 800; color: #fff; }

  .footer { border-top: 1px solid #e2e8f0; padding-top: 14px; text-align: center; color: #94a3b8; font-size: 8px; letter-spacing: 0.3px; }
  .footer span { color: ${secondaryColor}; font-weight: 600; }
</style>
${preview ? previewStyles(primaryColor) : ""}
</head>
<body>
<div class="page">
  <div class="header-wrapper">
    <div class="header-top">
      <div class="header-left">
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
      <div class="type-badge-wrapper">
        <div class="type-badge"><span class="type-letter">${escapeHtml(data.invoiceType)}</span></div>
      </div>
      <div class="header-right">
        <div class="invoice-label">Comprobante</div>
        <div class="invoice-num">Nº ${padInvoiceNumber(data.invoiceNumber)}</div>
        <div class="meta-row"><span>Fecha de emisión</span><span class="meta-val">${formatDisplayDate(data.date)}</span></div>
        ${data.businessTaxId ? `<div class="meta-row"><span>CUIT</span><span class="meta-val">${data.businessTaxId}</span></div>` : ""}
        ${data.activitiesStartDate ? `<div class="meta-row"><span>Inicio Actividades</span><span class="meta-val">${formatActivityDate(data.activitiesStartDate)}</span></div>` : ""}
      </div>
    </div>
  </div>

  <div class="client-section">
    <div class="client-col">
      <div class="section-label">Datos del cliente</div>
      <div class="client-name">${escapeHtml(data.clientName)}</div>
      <div class="client-detail">${data.clientTaxId ? `CUIT: ${data.clientTaxId}` : ""}</div>
    </div>
    ${data.clientAddress ? `<div class="client-col"><div class="section-label">Domicilio</div><div class="client-detail">${escapeHtml(data.clientAddress)}</div></div>` : ""}
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

  <div class="totals-wrapper">
    <div class="totals-box">
      <div class="totals-row"><span class="t-label">Subtotal</span><span class="t-val">${currency(data.netTotal)}</span></div>
      <div class="totals-row"><span class="t-label">Impuestos</span><span class="t-val">${currency(data.taxTotal)}</span></div>
      <div class="totals-row total-final"><span class="t-label">Total</span><span class="t-val">${currency(data.total)}</span></div>
    </div>
  </div>

  <div class="footer">${footerStr} &mdash; ${formatDisplayDate(data.date)}</div>
</div>
</body>
</html>`;
}
