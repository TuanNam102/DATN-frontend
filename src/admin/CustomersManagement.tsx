import React, { useState } from 'react';
import {
  Plus,
  Edit,
  Trash2,
  Filter,
  Download,
  Upload,
  Eye,
  Search,
  Package,
  CheckCircle2,
  AlertTriangle,
  DollarSign,
  Users,
  UserSquare2,
  User,
  RefreshCw,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';
import { GlassCard, Badge, StatCard } from './components/SharedComponents';

const CustomersManagement = () => {
  const [customers] = useState([
    { id: 'CUS001', name: 'Nguyễn Văn A', email: 'nguyenvana@email.com', phone: '0912345678', address: 'Hà Nội', totalOrders: 12, totalSpent: 2400000, status: 'VIP', joinDate: '2023-01-15' },
    { id: 'CUS002', name: 'Trần Thị B', email: 'tranthib@email.com', phone: '0923456789', address: 'TP. HCM', totalOrders: 8, totalSpent: 1600000, status: 'Thân thiết', joinDate: '2023-03-20' },
    { id: 'CUS003', name: 'Lê Văn C', email: 'levanc@email.com', phone: '0934567890', address: 'Đà Nẵng', totalOrders: 5, totalSpent: 950000, status: 'Mới', joinDate: '2023-06-10' },
    { id: 'CUS004', name: 'Phạm Thị D', email: 'phamthid@email.com', phone: '0945678901', address: 'Hà Nội', totalOrders: 15, totalSpent: 3200000, status: 'VIP', joinDate: '2022-11-08' },
    { id: 'CUS005', name: 'Hoàng Văn E', email: 'hoangvane@email.com', phone: '0956789012', address: 'Cần Thơ', totalOrders: 3, totalSpent: 560000, status: 'Mới', joinDate: '2023-07-22' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('Tất cả');

  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedStatus === 'Tất cả' || customer.status === selectedStatus)
  );

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
                      <button className="p-1.5 hover:bg-white/60 rounded-lg transition-colors">
                        <Eye className="h-4 w-4 text-slate-600" />
                      </button>
                      <button className="p-1.5 hover:bg-white/60 rounded-lg transition-colors">
                        <Edit className="h-4 w-4 text-slate-600" />
                      </button>
                      <button className="p-1.5 hover:bg-red-50 rounded-lg transition-colors">
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
    </div>
  );
};

export default CustomersManagement;
