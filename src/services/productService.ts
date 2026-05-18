import apiClient from './api'
import type { Product, PaginatedResponse } from '../types'

// --- Lấy danh sách sản phẩm ---
export const getProducts = async (params?: {
  page?: number
  limit?: number
  category?: string
  brand?: string
  search?: string
}): Promise<PaginatedResponse<Product>> => {
  const response = await apiClient.get<any>('/products', { 
    params: {
      pageNumber: params?.page,
      keyword: params?.search,
      category: params?.category,
      brand: params?.brand
    }
  })
  
  // Chuyển đổi format từ backend sang frontend
  return {
    data: response.data.products,
    total: response.data.products.length, // Backend không trả về total, chỉ trả về pages
    page: response.data.page,
    limit: 12, // Backend mặc định là 12
    totalPages: response.data.pages
  }
}

// --- Lấy chi tiết sản phẩm theo ID ---
export const getProductById = async (id: string): Promise<Product> => {
  const response = await apiClient.get<Product>(`/products/${id}`)
  return response.data
}
