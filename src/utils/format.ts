/**
 * Format số lượng tiền mặt thành chuỗi có chấm (ví dụ: 210000 -> 210.000₫)
 */
export const formatCurrency = (amount: number): string => {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + '₫'
}

export const formatPrice = formatCurrency;
