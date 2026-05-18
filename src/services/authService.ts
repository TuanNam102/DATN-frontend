import apiClient from './api'
import type { AuthResponse, LoginPayload, RegisterPayload, User } from '../types'

// --- Đăng nhập ---
export const login = async (payload: LoginPayload): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>('/users/login', payload)
  return response.data
}

// --- Đăng ký ---
export const register = async (payload: RegisterPayload): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>('/users', payload)
  return response.data
}

// --- Lấy thông tin user hiện tại ---
export const getMe = async (): Promise<User> => {
  const response = await apiClient.get<User>('/users/profile')
  return response.data
}

// --- Đăng xuất ---
export const logout = (): void => {
  localStorage.removeItem('token')
}
