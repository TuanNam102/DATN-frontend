import apiClient from './api';
import type { Order } from '../types';

// --- Lấy danh sách đơn hàng của user hiện tại ---
export const getMyOrders = async (): Promise<Order[]> => {
  const response = await apiClient.get<Order[]>('/orders/mine');
  return response.data;
};

// --- Lấy chi tiết đơn hàng ---
export const getOrderById = async (id: string): Promise<Order> => {
  const response = await apiClient.get<Order>(`/orders/${id}`);
  return response.data;
};
