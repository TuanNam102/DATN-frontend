import React from 'react'

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
  _id: string
  name: string
  email: string
  avatar?: string
  isAdmin: boolean
  createdAt?: string
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

export interface AuthResponse extends User {
  token: string
}

// --- Product ---
export interface Product {
  _id: string
  name: string
  brand: string
  description: string
  price: number
  salePrice?: number
  images: string[]
  category: string
  scentNotes?: string[]
  stock: number
  rating: number
  isHot: boolean
  isSale: boolean
  createdAt: string
}

// --- Category ---
export interface Category {
  _id: string
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

// --- Order ---
export interface OrderItem {
  name: string
  qty: number
  image: string
  price: number
  product: string | Product
}

export interface ShippingAddress {
  address: string
  city: string
  postalCode: string
  country: string
}

export interface Order {
  _id: string
  user: string | User
  orderItems: OrderItem[]
  shippingAddress: ShippingAddress
  paymentMethod: string
  paymentResult?: {
    id: string
    status: string
    update_time: string
    email_address: string
  }
  itemsPrice: number
  taxPrice: number
  shippingPrice: number
  totalPrice: number
  isPaid: boolean
  paidAt?: string
  isDelivered: boolean
  deliveredAt?: string
  createdAt: string
  updatedAt: string
}
