import type { InvoicePdfData } from "../generate-invoice-pdf";
import type { PdfTheme } from "../../features/pdf-settings/lib/pdf-theme";

export const defaultPdfTheme: PdfTheme = {
  primaryColor: "#1E40AF",
  secondaryColor: "#3B82F6",
  fontFamily: "Inter, system-ui, sans-serif",
  footerText: "Documento no fiscal generado por Facturalo",
};

export const mockInvoicePdfData: InvoicePdfData = {
  businessName: "Mi Empresa S.R.L.",
  ivaCondition: "IVA Responsable Inscripto",
  businessAddress: "Av. Corrientes 1234, CABA",
  businessTaxId: "30-71234567-9",
  iibbNumber: "901-123456-7",
  businessLogoUrl: undefined,
  invoiceType: "A",
  invoiceNumber: 1,
  date: "2025-03-13",
  activitiesStartDate: "2024-01-15",
  clientName: "Juan Pérez",
  clientTaxId: "20-30123456-7",
  clientAddress: "Lavalle 500, CABA",
  items: [
    {
      description: "Desarrollo de software",
      quantity: 1,
      unitPrice: 150000,
      discountPercent: 0,
      total: 150000,
    },
    {
      description: "Consultoría técnica",
      quantity: 5,
      unitPrice: 12000,
      discountPercent: 10,
      total: 54000,
    },
  ],
  netTotal: 195652.17,
  taxTotal: 41347.83,
  total: 237000,
};
