import { Invoice } from "src/app/invoices/interfaces/invoice.interface";
import { Region } from "./region.interface";

export interface Client {
  id: number;
  name: string;
  lastname: string;
  email: string;
  phone: number;
  birthdate?: Date;
  region?: Region
  image?: string;
  invoices?: Invoice[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Response {
  client?: Client;
  msg?: string;
  errors?: string[];
  error?: string;
}