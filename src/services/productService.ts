import apiClient from './api'
import type { Product, PaginatedResponse } from '../types'

// --- Lấy danh sách sản phẩm ---
export const getProducts = async (params?: {
  page?: number
  limit?: number
  category?: string
  search?: string
}): Promise<PaginatedResponse<Product>> => {
  const response = await apiClient.get<PaginatedResponse<Product>>('/products', { params })
  return response.data
}

// --- Lấy chi tiết sản phẩm theo ID ---
export const getProductById = async (id: string): Promise<Product> => {
  const response = await apiClient.get<Product>(`/products/${id}`)
  return response.data
}
