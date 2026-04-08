// ============================================================
// TYPES CHUNG CHO TOÀN DỰ ÁN
// ============================================================

// --- API Response ---
export interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

// --- User ---
export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: 'admin' | 'user'
  createdAt: string
}

// --- Auth ---
export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  name: string
  email: string
  password: string
}

export interface AuthResponse {
  token: string
  user: User
}

// --- Product ---
export interface Product {
  id: string
  name: string
  description: string
  price: number
  images: string[]
  category: Category
  stock: number
  createdAt: string
}

// --- Category ---
export interface Category {
  id: string
  name: string
  slug: string
  image?: string
}

// --- Cart ---
export interface CartItem {
  product: Product
  quantity: number
}

// --- Route ---
export interface RouteConfig {
  path: string
  element: React.ReactNode
  protected?: boolean
}
