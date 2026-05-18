import { useState } from 'react';
import {
  Plus,
  Edit,
  Trash2,
  Filter,
  Download,
  Eye,
  Search,
  DollarSign,
  Users,
  UserSquare2,
  User,
  RefreshCw,
  Mail,
  Phone,
  MapPin,
  X,
  Save,
} from 'lucide-react';
import { GlassCard, Badge, StatCard } from './components/SharedComponents';

const CustomersManagement = () => {
  const [customers, setCustomers] = useState([
    { id: 'CUS001', name: 'Nguyễn Văn A', email: 'nguyenvana@email.com', phone: '0912345678', address: 'Hà Nội', totalOrders: 12, totalSpent: 2400000, status: 'VIP', joinDate: '2023-01-15' },
    { id: 'CUS002', name: 'Trần Thị B', email: 'tranthib@email.com', phone: '0923456789', address: 'TP. HCM', totalOrders: 8, totalSpent: 1600000, status: 'Thân thiết', joinDate: '2023-03-20' },
    { id: 'CUS003', name: 'Lê Văn C', email: 'levanc@email.com', phone: '0934567890', address: 'Đà Nẵng', totalOrders: 5, totalSpent: 950000, status: 'Mới', joinDate: '2023-06-10' },
    { id: 'CUS004', name: 'Phạm Thị D', email: 'phamthid@email.com', phone: '0945678901', address: 'Hà Nội', totalOrders: 15, totalSpent: 3200000, status: 'VIP', joinDate: '2022-11-08' },
    { id: 'CUS005', name: 'Hoàng Văn E', email: 'hoangvane@email.com', phone: '0956789012', address: 'Cần Thơ', totalOrders: 3, totalSpent: 560000, status: 'Mới', joinDate: '2023-07-22' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('Tất cả');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'view' | 'edit'>('view');
  const [editingCustomer, setEditingCustomer] = useState<any>(null);

  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedStatus === 'Tất cả' || customer.status === selectedStatus)
  );

  const handleDelete = (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xoá khách hàng này?')) {
      setCustomers(customers.filter(c => c.id !== id));
    }
  };

  const handleOpenModal = (customer: any, mode: 'view' | 'edit') => {
    setEditingCustomer({ ...customer });
    setModalMode(mode);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (modalMode === 'edit') {
      setCustomers(customers.map(c => c.id === editingCustomer.id ? editingCustomer : c));
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Quản Lý Khách Hàng</h2>
          <p className="text-sm text-slate-500 mt-1">Tổng số {customers.length} khách hàng</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white/45 border border-white/60 rounded-xl hover:bg-white/60 transition-colors">
            <Download className="h-4 w-4" />
            <span className="text-sm font-medium">Xuất Excel</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#D56844] text-white rounded-xl hover:bg-[#B85A3A] transition-colors">
            <Plus className="h-4 w-4" />
            <span className="text-sm font-medium">Thêm Khách Hàng</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Tổng Khách Hàng" value={customers.length} icon={Users} tone="blue" />
        <StatCard title="Khách VIP" value={customers.filter(c => c.status === 'VIP').length} icon={UserSquare2} tone="purple" />
        <StatCard title="Khách Mới" value={customers.filter(c => c.status === 'Mới').length} icon={User} tone="green" />
        <StatCard title="Tổng Chi Tiêu" value={`₫${customers.reduce((sum, c) => sum + c.totalSpent, 0).toLocaleString()}`} icon={DollarSign} tone="amber" />
      </div>

      <GlassCard className="p-5">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-3 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Tìm kiếm khách hàng..."
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
              <option value="VIP">VIP</option>
              <option value="Thân thiết">Thân thiết</option>
              <option value="Mới">Mới</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button className="p-2 bg-white/45 border border-white/60 rounded-xl hover:bg-white/60 transition-colors">
              <Filter className="h-4 w-4" />
            </button>
            <button className="p-2 bg-white/45 border border-white/60 rounded-xl hover:bg-white/60 transition-colors">
              <RefreshCw className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-slate-500 border-b border-white/60">
                <th className="pb-3 font-semibold">Khách Hàng</th>
                <th className="pb-3 font-semibold">Liên Hệ</th>
                <th className="pb-3 font-semibold">Địa Chỉ</th>
                <th className="pb-3 font-semibold">Đơn Hàng</th>
                <th className="pb-3 font-semibold">Tổng Chi</th>
                <th className="pb-3 font-semibold">Trạng Thái</th>
                <th className="pb-3 font-semibold text-right">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/40">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-white/30 transition-colors">
                  <td className="py-4">
                    <div>
                      <div className="font-medium text-slate-900">{customer.name}</div>
                      <div className="text-sm text-slate-500">{customer.id}</div>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Mail className="h-3 w-3" />
                        {customer.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Phone className="h-3 w-3" />
                        {customer.phone}
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <MapPin className="h-3 w-3" />
                      {customer.address}
                    </div>
                  </td>
                  <td className="py-4 text-slate-900">{customer.totalOrders}</td>
                  <td className="py-4 font-medium text-slate-900">₫{customer.totalSpent.toLocaleString()}</td>
                  <td className="py-4">
                    <Badge tone={customer.status === 'VIP' ? 'purple' : customer.status === 'Thân thiết' ? 'blue' : 'green'}>
                      {customer.status}
                    </Badge>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => handleOpenModal(customer, 'view')}
                        className="p-1.5 hover:bg-white/60 rounded-lg transition-colors"
                      >
                        <Eye className="h-4 w-4 text-slate-600" />
                      </button>
                      <button 
                        onClick={() => handleOpenModal(customer, 'edit')}
                        className="p-1.5 hover:bg-white/60 rounded-lg transition-colors"
                      >
                        <Edit className="h-4 w-4 text-slate-600" />
                      </button>
                      <button 
                        onClick={() => handleDelete(customer.id)}
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
      {isModalOpen && editingCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/20 backdrop-blur-sm">
          <GlassCard className="w-full max-w-lg p-6 overflow-hidden">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-900">
                {modalMode === 'view' ? 'Chi Tiết Khách Hàng' : 'Chỉnh Sửa Khách Hàng'}
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
                  <label className="text-xs font-semibold text-slate-500 uppercase">Mã Khách Hàng</label>
                  <div className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 font-mono">
                    {editingCustomer.id}
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 uppercase">Trạng Thái</label>
                  {modalMode === 'view' ? (
                    <div className="flex pt-1">
                      <Badge tone={editingCustomer.status === 'VIP' ? 'purple' : editingCustomer.status === 'Thân thiết' ? 'blue' : 'green'}>
                        {editingCustomer.status}
                      </Badge>
                    </div>
                  ) : (
                    <select
                      className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl outline-none focus:border-[#D56844] transition-colors"
                      value={editingCustomer.status}
                      onChange={(e) => setEditingCustomer({ ...editingCustomer, status: e.target.value })}
                    >
                      <option value="VIP">VIP</option>
                      <option value="Thân thiết">Thân thiết</option>
                      <option value="Mới">Mới</option>
                    </select>
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 uppercase">Họ Và Tên</label>
                {modalMode === 'view' ? (
                  <div className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 font-medium">
                    {editingCustomer.name}
                  </div>
                ) : (
                  <input
                    type="text"
                    className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl outline-none focus:border-[#D56844] transition-colors"
                    value={editingCustomer.name}
                    onChange={(e) => setEditingCustomer({ ...editingCustomer, name: e.target.value })}
                  />
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 uppercase">Email</label>
                  {modalMode === 'view' ? (
                    <div className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-slate-700">
                      {editingCustomer.email}
                    </div>
                  ) : (
                    <input
                      type="email"
                      className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl outline-none focus:border-[#D56844] transition-colors"
                      value={editingCustomer.email}
                      onChange={(e) => setEditingCustomer({ ...editingCustomer, email: e.target.value })}
                    />
                  )}
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 uppercase">Số Điện Thoại</label>
                  {modalMode === 'view' ? (
                    <div className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-slate-700">
                      {editingCustomer.phone}
                    </div>
                  ) : (
                    <input
                      type="text"
                      className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl outline-none focus:border-[#D56844] transition-colors"
                      value={editingCustomer.phone}
                      onChange={(e) => setEditingCustomer({ ...editingCustomer, phone: e.target.value })}
                    />
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 uppercase">Địa Chỉ</label>
                {modalMode === 'view' ? (
                  <div className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-slate-700">
                    {editingCustomer.address}
                  </div>
                ) : (
                  <input
                    type="text"
                    className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl outline-none focus:border-[#D56844] transition-colors"
                    value={editingCustomer.address}
                    onChange={(e) => setEditingCustomer({ ...editingCustomer, address: e.target.value })}
                  />
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 uppercase">Tổng Đơn Hàng</label>
                  <div className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-slate-700">
                    {editingCustomer.totalOrders}
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 uppercase">Tổng Chi Tiêu</label>
                  <div className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 font-medium">
                    ₫{editingCustomer.totalSpent.toLocaleString()}
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

export default CustomersManagement;
