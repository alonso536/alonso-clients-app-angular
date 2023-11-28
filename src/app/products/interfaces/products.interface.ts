export interface Product {
    id:  number;
    name: string;
    description: string;
    sku: string;
    price: number;
    stock: number;
    image?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ProductResponse {
    product?: Product;
    msg?: string;
    errors?: string[];
    error?: string;
}