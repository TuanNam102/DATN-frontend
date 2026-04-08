import React, { useState } from 'react';
import {
  Plus,
  Edit,
  Trash2,
  Filter,
  Download,
  Eye,
  Search,
  FileText,
  Clock,
  Package,
  DollarSign,
  ShoppingCart,
  MapPin,
  Calendar,
} from 'lucide-react';
import { GlassCard, Badge, StatCard } from './components/SharedComponents';

const OrdersManagement = () => {
  const [orders] = useState([
    { id: 'ORD001', customer: 'Nguyễn Văn A', date: '2024-01-15', total: 450000, status: 'Chờ xử lý', payment: 'Chưa thanh toán', items: 3, shipping: 'Hà Nội' },
    { id: 'ORD002', customer: 'Trần Thị B', date: '2024-01-16', total: 280000, status: 'Đang giao', payment: 'Đã thanh toán', items: 2, shipping: 'TP. HCM' },
    { id: 'ORD003', customer: 'Lê Văn C', date: '2024-01-17', total: 680000, status: 'Đã giao', payment: 'Đã thanh toán', items: 4, shipping: 'Đà Nẵng' },
    { id: 'ORD004', customer: 'Phạm Thị D', date: '2024-01-18', total: 150000, status: 'Đã hủy', payment: 'Hoàn tiền', items: 1, shipping: 'Hà Nội' },
    { id: 'ORD005', customer: 'Hoàng Văn E', date: '2024-01-19', total: 920000, status: 'Chờ xử lý', payment: 'Chưa thanh toán', items: 5, shipping: 'Cần Thơ' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('Tất cả');

  const filteredOrders = orders.filter(order => 
    order.customer.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedStatus === 'Tất cả' || order.status === selectedStatus)
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Chờ xử lý': return 'blue';
      case 'Đang giao': return 'amber';
      case 'Đã giao': return 'green';
      case 'Đã hủy': return 'red';
      default: return 'slate';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Quản Lý Đơn Hàng</h2>
          <p className="text-sm text-slate-500 mt-1">Tổng số {orders.length} đơn hàng</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white/45 border border-white/60 rounded-xl hover:bg-white/60 transition-colors">
            <Download className="h-4 w-4" />
            <span className="text-sm font-medium">Xuất Báo Cáo</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#D56844] text-white rounded-xl hover:bg-[#B85A3A] transition-colors">
            <Plus className="h-4 w-4" />
            <span className="text-sm font-medium">Tạo Đơn Hàng</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Tổng Đơn Hàng" value={orders.length} icon={FileText} tone="purple" />
        <StatCard title="Chờ Xử Lý" value={orders.filter(o => o.status === 'Chờ xử lý').length} icon={Clock} tone="blue" />
        <StatCard title="Đang Giao" value={orders.filter(o => o.status === 'Đang giao').length} icon={Package} tone="amber" />
        <StatCard title="Doanh Thu" value={`₫${orders.filter(o => o.status === 'Đã giao').reduce((sum, o) => sum + o.total, 0).toLocaleString()}`} icon={DollarSign} tone="green" />
      </div>

      <GlassCard className="p-5">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-3 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Tìm kiếm đơn hàng..."
                className="w-full pl-10 pr-4 py-2 bg-white/45 border border-white/60 rounded-xl outline-none focus:bg-white/60 transition-colors"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="px-4 py-2 bg-white/45 border border-white/60 rounded-xl outline-none focus:bg-white/60 transition-colors"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="Tất cả">Tất cả trạng thái</option>
              <option value="Chờ xử lý">Chờ xử lý</option>
              <option value="Đang giao">Đang giao</option>
              <option value="Đã giao">Đã giao</option>
              <option value="Đã hủy">Đã hủy</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button className="p-2 bg-white/45 border border-white/60 rounded-xl hover:bg-white/60 transition-colors">
              <Filter className="h-4 w-4" />
            </button>
            <button className="p-2 bg-white/45 border border-white/60 rounded-xl hover:bg-white/60 transition-colors">
              <Calendar className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-slate-500 border-b border-white/60">
                <th className="pb-3 font-semibold">Mã ĐH</th>
                <th className="pb-3 font-semibold">Khách Hàng</th>
                <th className="pb-3 font-semibold">Ngày Đặt</th>
                <th className="pb-3 font-semibold">Sản Phẩm</th>
                <th className="pb-3 font-semibold">Tổng Tiền</th>
                <th className="pb-3 font-semibold">Thanh Toán</th>
                <th className="pb-3 font-semibold">Trạng Thái</th>
                <th className="pb-3 font-semibold text-right">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/40">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-white/30 transition-colors">
                  <td className="py-4 font-medium text-slate-900">{order.id}</td>
                  <td className="py-4">
                    <div>
                      <div className="font-medium text-slate-900">{order.customer}</div>
                      <div className="text-sm text-slate-500 flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {order.shipping}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 text-slate-600">{order.date}</td>
                  <td className="py-4 text-slate-600">{order.items} sản phẩm</td>
                  <td className="py-4 font-medium text-slate-900">₫{order.total.toLocaleString()}</td>
                  <td className="py-4">
                    <Badge tone={order.payment === 'Đã thanh toán' ? 'green' : order.payment === 'Hoàn tiền' ? 'red' : 'amber'}>
                      {order.payment}
                    </Badge>
                  </td>
                  <td className="py-4">
                    <Badge tone={getStatusColor(order.status) as any}>
                      {order.status}
                    </Badge>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 hover:bg-white/60 rounded-lg transition-colors">
                        <Eye className="h-4 w-4 text-slate-600" />
                      </button>
                      <button className="p-1.5 hover:bg-white/60 rounded-lg transition-colors">
                        <Edit className="h-4 w-4 text-slate-600" />
                      </button>
                      <button className="p-1.5 hover:bg-red-50 rounded-lg transition-colors">
                        <Package className="h-4 w-4 text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
};

export default OrdersManagement;
