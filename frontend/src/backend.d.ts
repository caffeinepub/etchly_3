import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Material {
    title: string;
    imageKey: string;
    priceUSD: number;
}
export type Time = bigint;
export interface Order {
    id: string;
    status: OrderStatus;
    createdAt: Time;
}
export interface Product {
    id: string;
    name: string;
    description: string;
    materials: Array<Material>;
}
export enum OrderStatus {
    shipped = "shipped",
    etching = "etching",
    designing = "designing"
}
export interface backendInterface {
    getAllOrders(): Promise<Array<Order>>;
    getOrderDetails(orderId: string): Promise<Order>;
    getOrderStatus(orderId: string): Promise<OrderStatus>;
    getProductById(productId: string): Promise<Product>;
    getProducts(): Promise<Array<Product>>;
}
