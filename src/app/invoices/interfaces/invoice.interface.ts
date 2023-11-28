import { Client } from "src/app/clients/interfaces/client.interface";
import { Product } from "src/app/products/interfaces/products.interface";

export interface Invoice {
    id: number;
    description?: string;
    observation?: string;
    items: InvoiceItem[];
    total: number;
    client: Client;
    createdAt?: Date;
    updatedAt?: Date; 
}

export interface InvoiceItem {
    id: number;
    quantity: number;
    product: Product;
    import: number;
}

export interface InvoiceResponse {
    invoice?: Invoice;
    msg?: string;
    errors?: string[];
    error?: string;
  }