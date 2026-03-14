/**
 * Tipo de datos para generar el PDF de factura.
 * Usado por las plantillas en components/templates.
 */
export interface InvoicePdfItem {
  description: string;
  quantity: number;
  unitPrice: number;
  discountPercent: number;
  total: number;
}

export interface InvoicePdfData {
  businessName: string;
  ivaCondition: string;
  businessAddress?: string;
  businessTaxId?: string;
  iibbNumber?: string;
  businessLogoUrl?: string | null;
  invoiceType: string;
  invoiceNumber: number;
  date: string;
  activitiesStartDate?: string | null;
  clientName: string;
  clientTaxId?: string | null;
  clientAddress?: string | null;
  items: InvoicePdfItem[];
  netTotal: number;
  taxTotal: number;
  total: number;
}
