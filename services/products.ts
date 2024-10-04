import { Product } from "@prisma/client";
import { axiosInstance } from "./instance";


export async function GET(query: string) {
    const { data } = await axiosInstance.get<Product>(`/products/search`)
}