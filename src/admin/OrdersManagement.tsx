import { useState } from 'react';
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
  MapPin,
  Calendar,
  X,
  Save,
} from 'lucide-react';
import { GlassCard, Badge, StatCard } from './components/SharedComponents';

const OrdersManagement = () => {
  const [orders, setOrders] = useState([
    { id: 'ORD001', customer: 'Nguyễn Văn A', date: '2024-01-15', total: 450000, status: 'Chờ xử lý', payment: 'Chưa thanh toán', items: 3, shipping: 'Hà Nội' },
    { id: 'ORD002', customer: 'Trần Thị B', date: '2024-01-16', total: 280000, status: 'Đang giao', payment: 'Đã thanh toán', items: 2, shipping: 'TP. HCM' },
    { id: 'ORD003', customer: 'Lê Văn C', date: '2024-01-17', total: 680000, status: 'Đã giao', payment: 'Đã thanh toán', items: 4, shipping: 'Đà Nẵng' },
    { id: 'ORD004', customer: 'Phạm Thị D', date: '2024-01-18', total: 150000, status: 'Đã hủy', payment: 'Hoàn tiền', items: 1, shipping: 'Hà Nội' },
    { id: 'ORD005', customer: 'Hoàng Văn E', date: '2024-01-19', total: 920000, status: 'Chờ xử lý', payment: 'Chưa thanh toán', items: 5, shipping: 'Cần Thơ' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('Tất cả');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'view' | 'edit'>('view');
  const [editingOrder, setEditingOrder] = useState<any>(null);

  const filteredOrders = orders.filter(order => 
    order.customer.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedStatus === 'Tất cả' || order.status === selectedStatus)
  );

  const handleDelete = (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn hủy đơn hàng này?')) {
      setOrders(orders.map(o => o.id === id ? { ...o, status: 'Đã hủy' } : o));
    }
  };

  const handleOpenModal = (order: any, mode: 'view' | 'edit') => {
    setEditingOrder({ ...order });
    setModalMode(mode);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (modalMode === 'edit') {
      setOrders(orders.map(o => o.id === editingOrder.id ? editingOrder : o));
    }
    setIsModalOpen(false);
  };

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
                  <td className="py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => handleOpenModal(order, 'view')}
                        className="p-1.5 hover:bg-white/60 rounded-lg transition-colors"
                      >
                        <Eye className="h-4 w-4 text-slate-600" />
                      </button>
                      <button 
                        onClick={() => handleOpenModal(order, 'edit')}
                        className="p-1.5 hover:bg-white/60 rounded-lg transition-colors"
                      >
                        <Edit className="h-4 w-4 text-slate-600" />
                      </button>
                      <button 
                        onClick={() => handleDelete(order.id)}
                        className="p-1.5 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* Modal View/Edit */}
      {isModalOpen && editingOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/20 backdrop-blur-sm">
          <GlassCard className="w-full max-w-lg p-6 overflow-hidden">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-900">
                {modalMode === 'view' ? 'Chi Tiết Đơn Hàng' : 'Cập Nhật Trạng Thái Đơn'}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X className="h-5 w-5 text-slate-500" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 uppercase">Mã Đơn Hàng</label>
                  <div className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 font-mono">
                    {editingOrder.id}
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 uppercase">Ngày Đặt</label>
                  <div className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-slate-700">
                    {editingOrder.date}
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 uppercase">Khách Hàng</label>
                <div className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 font-medium">
                  {editingOrder.customer}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 uppercase">Trạng Thái Đơn</label>
                  {modalMode === 'view' ? (
                    <div className="flex pt-1">
                      <Badge tone={getStatusColor(editingOrder.status) as any}>
                        {editingOrder.status}
                      </Badge>
                    </div>
                  ) : (
                    <select
                      className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl outline-none focus:border-[#D56844] transition-colors"
                      value={editingOrder.status}
                      onChange={(e) => setEditingOrder({ ...editingOrder, status: e.target.value })}
                    >
                      <option value="Chờ xử lý">Chờ xử lý</option>
                      <option value="Đang giao">Đang giao</option>
                      <option value="Đã giao">Đã giao</option>
                      <option value="Đã hủy">Đã hủy</option>
                    </select>
                  )}
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 uppercase">Thanh Toán</label>
                  {modalMode === 'view' ? (
                    <div className="flex pt-1">
                      <Badge tone={editingOrder.payment === 'Đã thanh toán' ? 'green' : editingOrder.payment === 'Hoàn tiền' ? 'red' : 'amber'}>
                        {editingOrder.payment}
                      </Badge>
                    </div>
                  ) : (
                    <select
                      className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl outline-none focus:border-[#D56844] transition-colors"
                      value={editingOrder.payment}
                      onChange={(e) => setEditingOrder({ ...editingOrder, payment: e.target.value })}
                    >
                      <option value="Chưa thanh toán">Chưa thanh toán</option>
                      <option value="Đã thanh toán">Đã thanh toán</option>
                      <option value="Hoàn tiền">Hoàn tiền</option>
                    </select>
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 uppercase">Địa Chỉ Giao Hàng</label>
                {modalMode === 'view' ? (
                  <div className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-slate-700">
                    {editingOrder.shipping}
                  </div>
                ) : (
                  <input
                    type="text"
                    className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl outline-none focus:border-[#D56844] transition-colors"
                    value={editingOrder.shipping}
                    onChange={(e) => setEditingOrder({ ...editingOrder, shipping: e.target.value })}
                  />
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 uppercase">Số Sản Phẩm</label>
                  <div className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-slate-700">
                    {editingOrder.items}
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 uppercase">Tổng Tiền</label>
                  <div className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 font-bold text-lg">
                    ₫{editingOrder.total.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="flex-1 px-4 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-medium hover:bg-slate-200 transition-colors"
              >
                Đóng
              </button>
              {modalMode === 'edit' && (
                <button 
                  onClick={handleSave}
                  className="flex-1 px-4 py-2.5 bg-[#D56844] text-white rounded-xl font-medium hover:bg-[#B85A3A] transition-colors flex items-center justify-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  Lưu Thay Đổi
                </button>
              )}
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
};

export default OrdersManagement;
