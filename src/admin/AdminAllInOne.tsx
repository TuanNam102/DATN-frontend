import React, { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  AlertTriangle,
  BarChart3,
  Bell,
  CheckCircle2,
  Clock,
  FileText,
  FolderOpen,
  LayoutDashboard,
  Landmark,
  LogOut,
  Package,
  Search,
  Settings,
  Users,
  UserSquare2,
  Sparkles,
  Plus,
  Edit,
  Trash2,
  Filter,
  Download,
  Upload,
  Eye,
  TrendingUp,
  TrendingDown,
  Calendar,
  MapPin,
  Phone,
  Mail,
  ShoppingCart,
  Box,
  AlertCircle,
  User,
  DollarSign,
  Archive,
  Shield,
  Database,
  RefreshCw,
} from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Area,
  AreaChart,
} from 'recharts';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

const GlassCard = ({ children, className = '' }: GlassCardProps) => {
  return (
    <div
      className={[
        'bg-white/55 backdrop-blur-lg border border-white/60',
        'shadow-[0_8px_30px_rgba(0,0,0,0.04)] rounded-2xl',
        className,
      ].join(' ')}
    >
      {children}
    </div>
  );
};

interface BadgeProps {
  children: React.ReactNode;
  tone?: 'purple' | 'blue' | 'green' | 'amber' | 'slate' | 'red';
}

const Badge = ({ children, tone = 'purple' }: BadgeProps) => {
  const toneClasses =
    tone === 'purple'
      ? 'bg-[#D56844]/15 text-[#D56844] border-[#D56844]/25'
      : tone === 'blue'
        ? 'bg-blue-500/15 text-blue-700 border-blue-400/25'
        : tone === 'green'
          ? 'bg-emerald-500/15 text-emerald-700 border-emerald-400/25'
          : tone === 'amber'
            ? 'bg-amber-500/15 text-amber-800 border-amber-400/25'
            : tone === 'red'
              ? 'bg-red-500/15 text-red-700 border-red-400/25'
              : 'bg-slate-500/10 text-slate-700 border-slate-400/25';

  return (
    <span
      className={[
        'inline-flex items-center px-3 py-1 rounded-full border text-xs font-semibold',
        'backdrop-blur-md',
        toneClasses,
      ].join(' ')}
    >
      {children}
    </span>
  );
};

interface IconPillProps {
  icon: React.ElementType;
  tone?: 'purple' | 'blue' | 'green' | 'amber' | 'red';
}

const IconPill = ({ icon, tone = 'purple' }: IconPillProps) => {
  const Icon = icon;
  const toneClasses =
    tone === 'purple'
      ? 'bg-[#D56844]/12 text-[#D56844] border-[#D56844]/25'
      : tone === 'blue'
        ? 'bg-blue-600/12 text-blue-700 border-blue-400/25'
        : tone === 'green'
          ? 'bg-emerald-600/12 text-emerald-700 border-emerald-400/25'
          : tone === 'amber'
            ? 'bg-amber-600/12 text-amber-700 border-amber-400/25'
            : 'bg-red-600/12 text-red-700 border-red-400/25';
  return (
    <span className={['h-10 w-10 rounded-xl border flex items-center justify-center', toneClasses].join(' ')}>
      <Icon className="h-5 w-5" />
    </span>
  );
};

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  tone?: 'purple' | 'blue' | 'green' | 'amber' | 'red';
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const StatCard = ({ title, value, icon: Icon, tone, trend }: StatCardProps) => {
  return (
    <GlassCard className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="text-sm font-medium text-slate-600">{title}</div>
          <div className="mt-2 text-3xl font-bold text-slate-900">{value}</div>
          {trend && (
            <div className={`mt-2 flex items-center gap-1 text-sm ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {trend.isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
              <span>{trend.value}%</span>
            </div>
          )}
        </div>
        <IconPill icon={Icon} tone={tone} />
      </div>
    </GlassCard>
  );
};

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const SidebarItem = ({ icon, label, active = false, onClick }: SidebarItemProps) => {
  const Icon = icon;
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'w-full h-11 rounded-xl px-3 flex items-center gap-2.5 text-sm font-medium transition-all duration-200 ease-out',
        active
          ? 'bg-[#D56844] text-white shadow-lg'
          : 'text-[#555555] hover:bg-[rgba(213,104,68,0.08)] hover:text-[#D56844]'
      ].join(' ')}
    >
      <Icon className={['h-5 w-5', active ? 'text-white' : 'text-[#888888]'].join(' ')} />
      <span className="truncate">{label}</span>
    </button>
  );
};

const ProductsManagement = () => {
  const [products] = useState([
    { id: 'PRD001', name: 'Chanel No.5', category: 'Eau de Parfum', price: 150000, stock: 45, status: 'Còn hàng', image: '/api/placeholder/80/80' },
    { id: 'PRD002', name: 'Dior Sauvage', category: 'Eau de Toilette', price: 120000, stock: 23, status: 'Tồn kho thấp', image: '/api/placeholder/80/80' },
    { id: 'PRD003', name: 'Tom Ford Black Orchid', category: 'Eau de Parfum', price: 280000, stock: 67, status: 'Còn hàng', image: '/api/placeholder/80/80' },
    { id: 'PRD004', name: 'YSL Libre', category: 'Eau de Parfum', price: 180000, stock: 12, status: 'Tồn kho thấp', image: '/api/placeholder/80/80' },
    { id: 'PRD005', name: 'Body Mist Victoria Secret', category: 'Body Mist', price: 45000, stock: 89, status: 'Còn hàng', image: '/api/placeholder/80/80' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === 'Tất cả' || product.category === selectedCategory)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Quản Lý Sản Phẩm</h2>
          <p className="text-sm text-slate-500 mt-1">Tổng số {products.length} sản phẩm</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white/45 border border-white/60 rounded-xl hover:bg-white/60 transition-colors">
            <Upload className="h-4 w-4" />
            <span className="text-sm font-medium">Nhập Excel</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#D56844] text-white rounded-xl hover:bg-[#B85A3A] transition-colors">
            <Plus className="h-4 w-4" />
            <span className="text-sm font-medium">Thêm Sản Phẩm</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Tổng Sản Phẩm" value={products.length} icon={Package} tone="purple" />
        <StatCard title="Đang Bán" value={products.filter(p => p.status === 'Còn hàng').length} icon={CheckCircle2} tone="green" />
        <StatCard title="Tồn Kho Thấp" value={products.filter(p => p.status === 'Tồn kho thấp').length} icon={AlertTriangle} tone="amber" />
        <StatCard title="Giá Trị Kho" value={`₫${products.reduce((sum, p) => sum + (p.price * p.stock), 0).toLocaleString()}`} icon={DollarSign} tone="blue" />
      </div>

      <GlassCard className="p-5">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-3 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                className="w-full pl-10 pr-4 py-2 bg-white/45 border border-white/60 rounded-xl outline-none focus:bg-white/60 transition-colors"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="px-4 py-2 bg-white/45 border border-white/60 rounded-xl outline-none focus:bg-white/60 transition-colors"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="Tất cả">Tất cả danh mục</option>
              <option value="Eau de Parfum">Eau de Parfum</option>
              <option value="Eau de Toilette">Eau de Toilette</option>
              <option value="Body Mist">Body Mist</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button className="p-2 bg-white/45 border border-white/60 rounded-xl hover:bg-white/60 transition-colors">
              <Filter className="h-4 w-4" />
            </button>
            <button className="p-2 bg-white/45 border border-white/60 rounded-xl hover:bg-white/60 transition-colors">
              <Download className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-slate-500 border-b border-white/60">
                <th className="pb-3 font-semibold">Sản Phẩm</th>
                <th className="pb-3 font-semibold">Mã SP</th>
                <th className="pb-3 font-semibold">Danh Mục</th>
                <th className="pb-3 font-semibold">Giá</th>
                <th className="pb-3 font-semibold">Tồn Kho</th>
                <th className="pb-3 font-semibold">Trạng Thái</th>
                <th className="pb-3 font-semibold text-right">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/40">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-white/30 transition-colors">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-lg bg-slate-200 overflow-hidden">
                        <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                      </div>
                      <div className="font-medium text-slate-900">{product.name}</div>
                    </div>
                  </td>
                  <td className="py-4 text-slate-600">{product.id}</td>
                  <td className="py-4 text-slate-600">{product.category}</td>
                  <td className="py-4 font-medium text-slate-900">₫{product.price.toLocaleString()}</td>
                  <td className="py-4">
                    <span className={`font-medium ${product.stock < 20 ? 'text-amber-600' : 'text-slate-900'}`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="py-4">
                    <Badge tone={product.status === 'Còn hàng' ? 'green' : 'amber'}>
                      {product.status}
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

const WarehouseManagement = () => {
  const [inventory] = useState([
    { id: 'PRD001', name: 'Chanel No.5', category: 'Eau de Parfum', currentStock: 45, minStock: 20, maxStock: 100, location: 'A1-01', lastUpdated: '2024-01-15', status: 'Bình thường' },
    { id: 'PRD002', name: 'Dior Sauvage', category: 'Eau de Toilette', currentStock: 12, minStock: 25, maxStock: 80, location: 'A1-02', lastUpdated: '2024-01-14', status: 'Tồn kho thấp' },
    { id: 'PRD003', name: 'Tom Ford Black Orchid', category: 'Eau de Parfum', currentStock: 67, minStock: 15, maxStock: 120, location: 'B2-01', lastUpdated: '2024-01-16', status: 'Bình thường' },
    { id: 'PRD004', name: 'YSL Libre', category: 'Eau de Parfum', currentStock: 8, minStock: 20, maxStock: 90, location: 'B2-02', lastUpdated: '2024-01-13', status: 'Cần nhập hàng' },
    { id: 'PRD005', name: 'Body Mist Victoria Secret', category: 'Body Mist', currentStock: 89, minStock: 30, maxStock: 150, location: 'C3-01', lastUpdated: '2024-01-15', status: 'Bình thường' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('Tất cả');

  const filteredInventory = inventory.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedLocation === 'Tất cả' || item.location.startsWith(selectedLocation))
  );

  const getStockStatus = (item: any) => {
    if (item.currentStock <= item.minStock) return { tone: 'red' as const, text: 'Cần nhập hàng' };
    if (item.currentStock <= item.minStock * 1.5) return { tone: 'amber' as const, text: 'Tồn kho thấp' };
    return { tone: 'green' as const, text: 'Bình thường' };
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Quản Lý Kho Hàng</h2>
          <p className="text-sm text-slate-500 mt-1">Tổng số {inventory.length} sản phẩm trong kho</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white/45 border border-white/60 rounded-xl hover:bg-white/60 transition-colors">
            <Archive className="h-4 w-4" />
            <span className="text-sm font-medium">Kiểm Kê</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#D56844] text-white rounded-xl hover:bg-[#B85A3A] transition-colors">
            <Plus className="h-4 w-4" />
            <span className="text-sm font-medium">Nhập Hàng</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Tổng Sản Phẩm" value={inventory.length} icon={Package} tone="purple" />
        <StatCard title="Cần Nhập Hàng" value={inventory.filter(i => i.currentStock <= i.minStock).length} icon={AlertTriangle} tone="red" />
        <StatCard title="Tồn Kho Thấp" value={inventory.filter(i => i.currentStock <= i.minStock * 1.5 && i.currentStock > i.minStock).length} icon={AlertCircle} tone="amber" />
        <StatCard title="Tổng Giá Trị" value="₫2.8M" icon={DollarSign} tone="green" />
      </div>

      <GlassCard className="p-5">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-3 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                className="w-full pl-10 pr-4 py-2 bg-white/45 border border-white/60 rounded-xl outline-none focus:bg-white/60 transition-colors"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="px-4 py-2 bg-white/45 border border-white/60 rounded-xl outline-none focus:bg-white/60 transition-colors"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              <option value="Tất cả">Tất cả vị trí</option>
              <option value="A1">Khu A1</option>
              <option value="B2">Khu B2</option>
              <option value="C3">Khu C3</option>
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
                <th className="pb-3 font-semibold">Sản Phẩm</th>
                <th className="pb-3 font-semibold">Mã SP</th>
                <th className="pb-3 font-semibold">Vị Trí</th>
                <th className="pb-3 font-semibold">Tồn Kho</th>
                <th className="pb-3 font-semibold">Min/Max</th>
                <th className="pb-3 font-semibold">Trạng Thái</th>
                <th className="pb-3 font-semibold">Cập Nhật</th>
                <th className="pb-3 font-semibold text-right">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/40">
              {filteredInventory.map((item) => {
                const stockStatus = getStockStatus(item);
                return (
                  <tr key={item.id} className="hover:bg-white/30 transition-colors">
                    <td className="py-4">
                      <div>
                        <div className="font-medium text-slate-900">{item.name}</div>
                        <div className="text-sm text-slate-500">{item.category}</div>
                      </div>
                    </td>
                    <td className="py-4 text-slate-600">{item.id}</td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <Box className="h-4 w-4 text-slate-400" />
                        <span className="font-mono text-sm">{item.location}</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="text-center">
                        <div className={`font-bold ${item.currentStock <= item.minStock ? 'text-red-600' : item.currentStock <= item.minStock * 1.5 ? 'text-amber-600' : 'text-green-600'}`}>
                          {item.currentStock}
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2 mt-1">
                          <div 
                            className={`h-2 rounded-full ${item.currentStock <= item.minStock ? 'bg-red-500' : item.currentStock <= item.minStock * 1.5 ? 'bg-amber-500' : 'bg-green-500'}`}
                            style={{ width: `${Math.min((item.currentStock / item.maxStock) * 100, 100)}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-4 text-center">
                      <div className="text-sm text-slate-600">
                        <div>{item.minStock}</div>
                        <div className="text-slate-400">/</div>
                        <div>{item.maxStock}</div>
                      </div>
                    </td>
                    <td className="py-4">
                      <Badge tone={stockStatus.tone}>
                        {stockStatus.text}
                      </Badge>
                    </td>
                    <td className="py-4 text-sm text-slate-600">{item.lastUpdated}</td>
                    <td className="py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-1.5 hover:bg-white/60 rounded-lg transition-colors">
                          <Eye className="h-4 w-4 text-slate-600" />
                        </button>
                        <button className="p-1.5 hover:bg-white/60 rounded-lg transition-colors">
                          <Edit className="h-4 w-4 text-slate-600" />
                        </button>
                        <button className="p-1.5 hover:bg-green-50 rounded-lg transition-colors">
                          <Plus className="h-4 w-4 text-green-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
};

const StatisticsManagement = () => {
  const salesData = useMemo(() => [
    { month: 'T1', revenue: 45000000, orders: 120, customers: 85 },
    { month: 'T2', revenue: 52000000, orders: 145, customers: 98 },
    { month: 'T3', revenue: 48000000, orders: 132, customers: 91 },
    { month: 'T4', revenue: 61000000, orders: 168, customers: 112 },
    { month: 'T5', revenue: 58000000, orders: 156, customers: 105 },
    { month: 'T6', revenue: 67000000, orders: 178, customers: 124 },
  ], []);

  const categoryData = useMemo(() => [
    { name: 'Eau de Parfum', value: 45, amount: '₫2.25M', color: '#D56844' },
    { name: 'Eau de Toilette', value: 30, amount: '₫1.5M', color: '#4F8EF7' },
    { name: 'Body Mist', value: 15, amount: '₫750K', color: '#34C48B' },
    { name: 'Bộ Quà Tặng', value: 10, amount: '₫500K', color: '#A0A0A0' },
  ], []);

  const topProducts = useMemo(() => [
    { name: 'Chanel No.5', sales: 234, revenue: '₫35.1M', growth: 12 },
    { name: 'Dior Sauvage', sales: 198, revenue: '₫23.8M', growth: 8 },
    { name: 'Tom Ford Black Orchid', sales: 167, revenue: '₫46.8M', growth: 15 },
    { name: 'YSL Libre', sales: 145, revenue: '₫26.1M', growth: -3 },
    { name: 'Victoria Secret Body Mist', sales: 289, revenue: '₫13M', growth: 22 },
  ], []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Thống Kê & Báo Cáo</h2>
          <p className="text-sm text-slate-500 mt-1">Phân tích dữ liệu kinh doanh</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white/45 border border-white/60 rounded-xl hover:bg-white/60 transition-colors">
            <Calendar className="h-4 w-4" />
            <span className="text-sm font-medium">Chọn Kỳ</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#D56844] text-white rounded-xl hover:bg-[#B85A3A] transition-colors">
            <Download className="h-4 w-4" />
            <span className="text-sm font-medium">Xuất Báo Cáo</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Doanh Thu 6 Tháng" value="₫331M" icon={DollarSign} tone="green" trend={{ value: 18, isPositive: true }} />
        <StatCard title="Tổng Đơn Hàng" value={899} icon={ShoppingCart} tone="purple" trend={{ value: 12, isPositive: true }} />
        <StatCard title="Khách Hàng Mới" value={615} icon={Users} tone="blue" trend={{ value: 8, isPositive: true }} />
        <StatCard title="Giá Trị TB Đơn Hàng" value="₫368K" icon={TrendingUp} tone="amber" trend={{ value: 5, isPositive: true }} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <GlassCard className="p-5">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Xu Hướng Doanh Thu</h3>
              <p className="text-xs text-slate-500 mt-1">6 tháng gần nhất</p>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 text-xs bg-white/45 border border-white/60 rounded-lg hover:bg-white/60 transition-colors">
                Tuần
              </button>
              <button className="px-3 py-1.5 text-xs bg-[#D56844]/15 text-[#D56844] border border-white/60 rounded-lg">
                Tháng
              </button>
              <button className="px-3 py-1.5 text-xs bg-white/45 border border-white/60 rounded-lg hover:bg-white/60 transition-colors">
                Năm
              </button>
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData} margin={{ top: 10, right: 16, left: -6, bottom: 0 }}>
                <CartesianGrid stroke="rgba(15,23,42,0.08)" strokeDasharray="4 6" />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: 'rgba(15,23,42,0.55)', fontSize: 12 }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: 'rgba(15,23,42,0.55)', fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    background: 'rgba(255,255,255,0.7)',
                    border: '1px solid rgba(255,255,255,0.65)',
                    borderRadius: 16,
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#D56844"
                  fill="#D56844"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard className="p-5">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-slate-900">Doanh Thu Theo Danh Mục</h3>
            <p className="text-xs text-slate-500 mt-1">Phân bổ theo loại sản phẩm</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-6 items-center">
            <div className="h-[200px] relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                  >
                    {categoryData.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: 'rgba(255,255,255,0.7)',
                      border: '1px solid rgba(255,255,255,0.65)',
                      borderRadius: 16,
                      backdropFilter: 'blur(10px)',
                      boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <div className="text-[11px] text-[#888] font-normal">Tổng</div>
                <div className="text-[18px] text-[#1a1a1a] font-bold">₫5M</div>
              </div>
            </div>
            <div className="space-y-3">
              {categoryData.map((row) => (
                <div key={row.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="h-3 w-3 rounded-sm" style={{ backgroundColor: row.color }} />
                    <div className="text-sm font-semibold text-slate-800">{row.name}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-slate-900">{row.amount}</div>
                    <div className="text-xs text-slate-500">{row.value}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>
      </div>

      <GlassCard className="p-5">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-slate-900">Top Sản Phẩm Bán Chạy</h3>
          <p className="text-xs text-slate-500 mt-1">Sản phẩm có doanh thu cao nhất</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-slate-500 border-b border-white/60">
                <th className="pb-3 font-semibold">Sản Phẩm</th>
                <th className="pb-3 font-semibold">Đã Bán</th>
                <th className="pb-3 font-semibold">Doanh Thu</th>
                <th className="pb-3 font-semibold">Tăng Trưởng</th>
                <th className="pb-3 font-semibold">Xu Hướng</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/40">
              {topProducts.map((product, index) => (
                <tr key={product.name} className="hover:bg-white/30 transition-colors">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-[#D56844]/15 flex items-center justify-center text-sm font-bold text-[#D56844]">
                        {index + 1}
                      </div>
                      <div className="font-medium text-slate-900">{product.name}</div>
                    </div>
                  </td>
                  <td className="py-4 text-slate-900">{product.sales}</td>
                  <td className="py-4 font-medium text-slate-900">{product.revenue}</td>
                  <td className="py-4">
                    <div className={`flex items-center gap-1 text-sm font-medium ${product.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {product.growth > 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                      {Math.abs(product.growth)}%
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`h-8 w-1 rounded-full ${i < Math.ceil(product.growth / 5) ? 'bg-[#D56844]' : 'bg-slate-200'}`}
                        />
                      ))}
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

const SettingsManagement = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    lowStockAlert: true,
    newOrderAlert: true,
    customerFeedback: false,
  });

  const [security, setSecurity] = useState({
    twoFactorAuth: false,
    sessionTimeout: 30,
    passwordComplexity: true,
    loginAlerts: true,
  });

  const [system, setSystem] = useState({
    language: 'vi',
    timezone: 'Asia/Ho_Chi_Minh',
    currency: 'VND',
    dateFormat: 'DD/MM/YYYY',
    autoBackup: true,
    maintenanceMode: false,
  });

  const settingsTabs = [
    { id: 'general', label: 'Cài Đặt Chung', icon: Settings },
    { id: 'notifications', label: 'Thông Báo', icon: Bell },
    { id: 'security', label: 'Bảo Mật', icon: Shield },
    { id: 'system', label: 'Hệ Thống', icon: Database },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Cài Đặt Hệ Thống</h2>
        <p className="text-sm text-slate-500 mt-1">Quản lý cấu hình và tùy chọn hệ thống</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
        <GlassCard className="p-4">
          <div className="space-y-2">
            {settingsTabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full h-11 rounded-xl px-3 flex items-center gap-2.5 text-sm font-medium transition-all duration-200 ease-out ${
                    activeTab === tab.id
                      ? 'bg-[#D56844] text-white shadow-lg'
                      : 'text-[#555555] hover:bg-[rgba(213,104,68,0.08)] hover:text-[#D56844]'
                  }`}
                >
                  <Icon className={['h-5 w-5', activeTab === tab.id ? 'text-white' : 'text-[#888888]'].join(' ')} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          {activeTab === 'general' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-4">Cài Đặt Chung</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Tên Cửa Hàng</label>
                    <input
                      type="text"
                      defaultValue="Aventis Perfume"
                      className="w-full px-4 py-2 bg-white/45 border border-white/60 rounded-xl outline-none focus:bg-white/60 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                    <input
                      type="email"
                      defaultValue="contact@aventis.com"
                      className="w-full px-4 py-2 bg-white/45 border border-white/60 rounded-xl outline-none focus:bg-white/60 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Số Điện Thoại</label>
                    <input
                      type="tel"
                      defaultValue="0123456789"
                      className="w-full px-4 py-2 bg-white/45 border border-white/60 rounded-xl outline-none focus:bg-white/60 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Địa Chỉ</label>
                    <textarea
                      rows={3}
                      defaultValue="123 Nguyễn Trãi, Q.1, TP.HCM"
                      className="w-full px-4 py-2 bg-white/45 border border-white/60 rounded-xl outline-none focus:bg-white/60 transition-colors resize-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-4">Cài Đặt Thông Báo</h3>
                <div className="space-y-4">
                  {Object.entries(notifications).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-slate-900">
                          {key === 'emailNotifications' && 'Thông báo email'}
                          {key === 'smsNotifications' && 'Thông báo SMS'}
                          {key === 'pushNotifications' && 'Thông báo đẩy'}
                          {key === 'lowStockAlert' && 'Cảnh báo tồn kho thấp'}
                          {key === 'newOrderAlert' && 'Thông báo đơn hàng mới'}
                          {key === 'customerFeedback' && 'Phản hồi khách hàng'}
                        </div>
                        <div className="text-sm text-slate-500">
                          {key === 'emailNotifications' && 'Nhận thông báo qua email'}
                          {key === 'smsNotifications' && 'Nhận thông báo qua tin nhắn SMS'}
                          {key === 'pushNotifications' && 'Nhận thông báo đẩy trên trình duyệt'}
                          {key === 'lowStockAlert' && 'Cảnh báo khi sản phẩm sắp hết hàng'}
                          {key === 'newOrderAlert' && 'Thông báo khi có đơn hàng mới'}
                          {key === 'customerFeedback' && 'Thông báo khi khách hàng gửi phản hồi'}
                        </div>
                      </div>
                      <button
                        onClick={() => setNotifications(prev => ({ ...prev, [key as keyof typeof notifications]: !prev[key as keyof typeof notifications] }))}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          value ? 'bg-[#D56844]' : 'bg-slate-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            value ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-4">Cài Đặt Bảo Mật</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-slate-900">Xác thực hai yếu tố</div>
                      <div className="text-sm text-slate-500">Yêu cầu mã xác thực khi đăng nhập</div>
                    </div>
                    <button
                      onClick={() => setSecurity(prev => ({ ...prev, twoFactorAuth: !prev.twoFactorAuth }))}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        security.twoFactorAuth ? 'bg-[#D56844]' : 'bg-slate-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          security.twoFactorAuth ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Thời gian hết phiên (phút)</label>
                    <input
                      type="number"
                      value={security.sessionTimeout}
                      onChange={(e) => setSecurity(prev => ({ ...prev, sessionTimeout: parseInt(e.target.value) }))}
                      className="w-full px-4 py-2 bg-white/45 border border-white/60 rounded-xl outline-none focus:bg-white/60 transition-colors"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-slate-900">Độ phức tạp mật khẩu</div>
                      <div className="text-sm text-slate-500">Yêu cầu mật khẩu mạnh</div>
                    </div>
                    <button
                      onClick={() => setSecurity(prev => ({ ...prev, passwordComplexity: !prev.passwordComplexity }))}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        security.passwordComplexity ? 'bg-[#D56844]' : 'bg-slate-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          security.passwordComplexity ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-slate-900">Cảnh báo đăng nhập</div>
                      <div className="text-sm text-slate-500">Thông báo khi có đăng nhập mới</div>
                    </div>
                    <button
                      onClick={() => setSecurity(prev => ({ ...prev, loginAlerts: !prev.loginAlerts }))}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        security.loginAlerts ? 'bg-[#D56844]' : 'bg-slate-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          security.loginAlerts ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'system' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-4">Cài Đặt Hệ Thống</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Ngôn ngữ</label>
                    <select
                      value={system.language}
                      onChange={(e) => setSystem(prev => ({ ...prev, language: e.target.value }))}
                      className="w-full px-4 py-2 bg-white/45 border border-white/60 rounded-xl outline-none focus:bg-white/60 transition-colors"
                    >
                      <option value="vi">Tiếng Việt</option>
                      <option value="en">English</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Múi giờ</label>
                    <select
                      value={system.timezone}
                      onChange={(e) => setSystem(prev => ({ ...prev, timezone: e.target.value }))}
                      className="w-full px-4 py-2 bg-white/45 border border-white/60 rounded-xl outline-none focus:bg-white/60 transition-colors"
                    >
                      <option value="Asia/Ho_Chi_Minh">Asia/Ho_Chi_Minh</option>
                      <option value="Asia/Bangkok">Asia/Bangkok</option>
                      <option value="UTC">UTC</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Tiền tệ</label>
                    <select
                      value={system.currency}
                      onChange={(e) => setSystem(prev => ({ ...prev, currency: e.target.value }))}
                      className="w-full px-4 py-2 bg-white/45 border border-white/60 rounded-xl outline-none focus:bg-white/60 transition-colors"
                    >
                      <option value="VND">VND (₫)</option>
                      <option value="USD">USD ($)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Định dạng ngày</label>
                    <select
                      value={system.dateFormat}
                      onChange={(e) => setSystem(prev => ({ ...prev, dateFormat: e.target.value }))}
                      className="w-full px-4 py-2 bg-white/45 border border-white/60 rounded-xl outline-none focus:bg-white/60 transition-colors"
                    >
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-slate-900">Sao lưu tự động</div>
                      <div className="text-sm text-slate-500">Tự động sao lưu dữ liệu hàng ngày</div>
                    </div>
                    <button
                      onClick={() => setSystem(prev => ({ ...prev, autoBackup: !prev.autoBackup }))}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        system.autoBackup ? 'bg-[#D56844]' : 'bg-slate-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          system.autoBackup ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-slate-900">Chế độ bảo trì</div>
                      <div className="text-sm text-slate-500">Tạm thời vô hiệu hóa cửa hàng</div>
                    </div>
                    <button
                      onClick={() => setSystem(prev => ({ ...prev, maintenanceMode: !prev.maintenanceMode }))}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        system.maintenanceMode ? 'bg-red-500' : 'bg-slate-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          system.maintenanceMode ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-white/60">
            <button className="px-6 py-2 bg-white/45 border border-white/60 rounded-xl hover:bg-white/60 transition-colors font-medium text-slate-700">
              Hủy
            </button>
            <button className="px-6 py-2 bg-[#D56844] text-white rounded-xl hover:bg-[#B85A3A] transition-colors font-medium">
              Lưu Thay Đổi
            </button>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedYears, setSelectedYears] = useState(['2023', '2024', '2025', '2026']);

  const getActiveNavLabel = (pathname: string) => {
    if (pathname.startsWith('/admin/products')) return 'Sản Phẩm';
    if (pathname.startsWith('/admin/customers')) return 'Khách Hàng';
    if (pathname.startsWith('/admin/orders')) return 'Đơn Hàng';
    if (pathname.startsWith('/admin/inventory')) return 'Kho Hàng';
    if (pathname.startsWith('/admin/analytics')) return 'Thống Kê';
    if (pathname.startsWith('/admin/settings')) return 'Cài Đặt';
    return 'Tổng Quan';
  };

  const activeNav = getActiveNavLabel(location.pathname);

  const performanceData = useMemo(
    () => [
      { semester: 1, cohort2023: 2.7, cohort2024: 2.6, cohort2025: 3.1, cohort2026: 3.5 },
      { semester: 2, cohort2023: 3.4, cohort2024: 3.1, cohort2025: 3.7, cohort2026: 4.0 },
      { semester: 3, cohort2023: 3.3, cohort2024: 3.4, cohort2025: 4.0, cohort2026: 4.3 },
      { semester: 4, cohort2023: 4.1, cohort2024: 3.6, cohort2025: 4.5, cohort2026: 4.8 },
      { semester: 5, cohort2023: 3.6, cohort2024: 3.9, cohort2025: 4.3, cohort2026: 4.6 },
      { semester: 6, cohort2023: 4.4, cohort2024: 4.1, cohort2025: 4.8, cohort2026: 5.0 },
    ],
    []
  );

  const fundingData = useMemo(
    () => [
      { name: 'Eau de Parfum', value: 40, amount: '$1,081', color: '#D56844' },
      { name: 'Eau de Toilette', value: 35, amount: '$323', color: '#4F8EF7' },
      { name: 'Body Mist', value: 15, amount: '$55', color: '#34C48B' },
      { name: 'Bộ Quà Tặng', value: 10, amount: '$33', color: '#A0A0A0' },
    ],
    []
  );

  const recentApplications = useMemo(
    () => [
      {
        name: 'Malon Gram',
        product: 'Chanel No.5',
        date: 'Jan 13, 2023',
        status: 'Chờ Xử Lý',
        tone: 'blue',
        docs: ['file', 'clock'],
      },
      {
        name: 'Joan Binwon',
        product: 'Dior Sauvage',
        date: 'Jan 15, 2023',
        status: 'Đang Xử Lý',
        tone: 'amber',
        docs: ['file', 'check'],
      },
      {
        name: 'James Parns',
        product: 'Tom Ford Black Orchid',
        date: 'Jan 13, 2023',
        status: 'Đã Giao',
        tone: 'purple',
        docs: ['file', 'check'],
      },
      {
        name: 'Andiller Walnson',
        product: 'YSL Libre',
        date: 'Jan 14, 2023',
        status: 'Đã Nhận',
        tone: 'purple',
        docs: ['file', 'clock'],
      },
    ],
    []
  );

  const documentTracking = useMemo(
    () => [
      {
        id: '10101001',
        name: 'Chanel No.5',
        type: 'Product Sheet',
        status: 'Đang Hoạt Động - Còn Hàng',
        statusTone: 'green',
        deadline: '02/09/2023',
      },
      {
        id: '10102002',
        name: 'Dior Sauvage',
        type: 'Safety Data',
        status: 'Tồn Kho Thấp',
        statusTone: 'red',
        deadline: '02/12/2023',
      },
      {
        id: '10202003',
        name: 'Tom Ford Black Orchid',
        type: 'Marketing',
        status: 'Đang Hoạt Động - Còn Hàng',
        statusTone: 'green',
        deadline: '02/12/2023',
      },
      {
        id: '10202004',
        name: 'YSL Libre',
        type: 'Marketing',
        status: 'Đang Hoạt Động - Còn Hàng',
        statusTone: 'green',
        deadline: '02/12/2023',
      },
    ],
    []
  );

  const nav = [
    { label: 'Tổng Quan', icon: LayoutDashboard, route: '/admin' },
    { label: 'Sản Phẩm', icon: Package, route: '/admin/products' },
    { label: 'Khách Hàng', icon: Users, route: '/admin/customers' },
    { label: 'Đơn Hàng', icon: FileText, route: '/admin/orders' },
    { label: 'Kho Hàng', icon: FolderOpen, route: '/admin/inventory' },
    { label: 'Thống Kê', icon: BarChart3, route: '/admin/analytics' },
    { label: 'Cài Đặt', icon: Settings, route: '/admin/settings' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FDFBF7] to-[#EEF2F6] text-slate-800">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
          <GlassCard className="p-4 lg:sticky lg:top-6 h-fit">
            <div className="flex items-center gap-3 px-2 py-3">
              <div className="h-11 w-11 rounded-2xl bg-[#D56844]/15 border border-white/60 backdrop-blur-lg flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-[#D56844]" />
              </div>
              <div className="min-w-0">
                <div className="font-bold text-slate-900 leading-tight">Aventis</div>
                <div className="text-xs text-slate-500">Perfume</div>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              {nav.map((item) => (
                <SidebarItem
                  key={item.label}
                  icon={item.icon}
                  label={item.label}
                  active={activeNav === item.label}
                  onClick={() => navigate(item.route)}
                />
              ))}
            </div>

            {/* User Info Section */}
            <div className="mt-6 pt-6 border-t border-white/20">
              <div className="flex items-center gap-3 px-2 py-3">
                <div className="h-10 w-10 rounded-full bg-[#D56844] flex items-center justify-center text-white font-semibold text-sm">
                  ER
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-slate-900">Dr. Evelyn Reed</div>
                  <div className="text-xs text-slate-500">Quản trị viên</div>
                </div>
                <button
                  type="button"
                  className="p-2 rounded-lg text-[#888888] hover:text-red-500 hover:bg-red-50 transition-colors"
                  aria-label="Logout"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            </div>
          </GlassCard>

          <div>
            {activeNav === 'Sản Phẩm' && <ProductsManagement />}
            {activeNav === 'Khách Hàng' && <CustomersManagement />}
            {activeNav === 'Đơn Hàng' && <OrdersManagement />}
            {activeNav === 'Kho Hàng' && <WarehouseManagement />}
            {activeNav === 'Thống Kê' && <StatisticsManagement />}
            {activeNav === 'Cài Đặt' && <SettingsManagement />}
            {activeNav === 'Tổng Quan' && (
              <div className="space-y-6">
                <GlassCard className="px-5 py-4">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div>
                      <div className="text-xl md:text-2xl font-extrabold text-slate-900">
                        Tổng Quan – Aventis
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                      <div className="flex items-center gap-2 bg-white/45 border border-white/60 rounded-2xl px-3 py-2 backdrop-blur-lg shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
                        <Search className="h-4 w-4 text-slate-500" />
                        <input
                          className="bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400 w-56"
                          placeholder="Tìm kiếm sản phẩm, đơn hàng..."
                          type="text"
                        />
                      </div>
                      <button
                        type="button"
                        className="h-11 w-11 rounded-2xl bg-white/45 border border-white/60 backdrop-blur-lg shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex items-center justify-center hover:bg-white/60 transition-colors"
                        aria-label="Notifications"
                      >
                        <Bell className="h-5 w-5 text-slate-600" />
                      </button>
                      <div className="flex items-center gap-3 bg-white/45 border border-white/60 rounded-2xl px-3 py-2 backdrop-blur-lg shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
                        <div className="h-9 w-9 rounded-xl bg-[#D56844]/15 border border-white/60 flex items-center justify-center overflow-hidden">
                          <UserSquare2 className="h-5 w-5 text-[#D56844]" />
                        </div>
                        <div className="leading-tight">
                          <div className="text-sm font-semibold text-slate-900">Dr. Evelyn Reed</div>
                          <div className="text-xs text-slate-500">(Quản trị viên)</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </GlassCard>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                  <StatCard title="Khách Hàng Hiện Có" value="1,245" icon={Users} tone="blue" />
                  <StatCard title="Đơn Hàng Chờ Xử Lý" value="310" icon={FileText} tone="purple" />
                  <StatCard title="Tổng Doanh Thu" value="$15.6M" icon={Landmark} tone="green" />
                  <StatCard title="Cảnh Báo Tồn Kho Thấp" value="45" icon={AlertTriangle} tone="amber" />
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  <GlassCard className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-lg font-bold text-slate-900">Tổng Quan Hiệu Suất Bán Hàng</div>
                        <div className="text-xs text-slate-500 mt-1">Xu Hướng Doanh Thu Theo Kỳ</div>
                      </div>
                      <div className="flex items-center gap-3">
                        {['2023', '2024', '2025', '2026'].map((year) => (
                          <button
                            key={year}
                            onClick={() => {
                              if (selectedYears.includes(year)) {
                                setSelectedYears(selectedYears.filter(y => y !== year));
                              } else {
                                setSelectedYears([...selectedYears, year]);
                              }
                            }}
                            className={`text-sm px-3 py-2 rounded-xl backdrop-blur-lg outline-none transition-colors ${
                              selectedYears.includes(year)
                                ? 'bg-[#D56844]/15 text-[#D56844] border border-white/60'
                                : 'bg-white/45 text-slate-700 border border-white/60'
                            }`}
                          >
                            {year}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="mt-4 h-[280px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={performanceData} margin={{ top: 10, right: 16, left: -6, bottom: 0 }}>
                          <CartesianGrid stroke="rgba(15,23,42,0.08)" strokeDasharray="4 6" />
                          <XAxis
                            dataKey="semester"
                            tickLine={false}
                            axisLine={false}
                            tick={{ fill: 'rgba(15,23,42,0.55)', fontSize: 12 }}
                            label={{ value: 'Kỳ', position: 'insideBottom', offset: -2, fill: 'rgba(15,23,42,0.45)', fontSize: 12 }}
                          />
                          <YAxis
                            domain={[0, 5]}
                            tickLine={false}
                            axisLine={false}
                            tick={{ fill: 'rgba(15,23,42,0.55)', fontSize: 12 }}
                            label={{ value: 'Doanh Thu', angle: -90, position: 'insideLeft', fill: 'rgba(15,23,42,0.45)', fontSize: 12 }}
                          />
                          <Tooltip
                            contentStyle={{
                              background: 'rgba(255,255,255,0.7)',
                              border: '1px solid rgba(255,255,255,0.65)',
                              borderRadius: 16,
                              backdropFilter: 'blur(10px)',
                              boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
                            }}
                            labelStyle={{ color: 'rgba(15,23,42,0.7)' }}
                          />
                          <Legend
                            iconType="circle"
                            wrapperStyle={{ color: 'rgba(15,23,42,0.65)', fontSize: 12 }}
                          />
                          {selectedYears.includes('2023') && (
                            <Bar
                              dataKey="cohort2023"
                              name="Năm 2023"
                              fill="#D56844"
                              radius={[4, 4, 0, 0]}
                            />
                          )}
                          {selectedYears.includes('2024') && (
                            <Bar
                              dataKey="cohort2024"
                              name="Năm 2024"
                              fill="#F4A97A"
                              radius={[4, 4, 0, 0]}
                            />
                          )}
                          {selectedYears.includes('2025') && (
                            <Bar
                              dataKey="cohort2025"
                              name="Năm 2025"
                              fill="#8B3E1E"
                              radius={[4, 4, 0, 0]}
                            />
                          )}
                          {selectedYears.includes('2026') && (
                            <Bar
                              dataKey="cohort2026"
                              name="Năm 2026"
                              fill="#2D6A4F"
                              radius={[4, 4, 0, 0]}
                            />
                          )}
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </GlassCard>

                  <GlassCard className="p-5">
                    <div className="text-lg font-bold text-slate-900">Doanh Thu Theo Danh Mục</div>
                    <div className="mt-5 grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6 items-center">
                      <div className="h-[240px] relative">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={[
                                { name: 'Eau de Parfum', value: 40, color: '#D56844' },
                                { name: 'Eau de Toilette', value: 35, color: '#4F8EF7' },
                                { name: 'Body Mist', value: 15, color: '#34C48B' },
                                { name: 'Bộ Quà Tặng', value: 10, color: '#A0A0A0' },
                              ]}
                              dataKey="value"
                              nameKey="name"
                              innerRadius={70}
                              outerRadius={100}
                              paddingAngle={2}
                            >
                              {[
                                { name: 'Eau de Parfum', value: 40, color: '#D56844' },
                                { name: 'Eau de Toilette', value: 35, color: '#4F8EF7' },
                                { name: 'Body Mist', value: 15, color: '#34C48B' },
                                { name: 'Bộ Quà Tặng', value: 10, color: '#A0A0A0' },
                              ].map((entry) => (
                                <Cell key={entry.name} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip
                              contentStyle={{
                                background: 'rgba(255,255,255,0.7)',
                                border: '1px solid rgba(255,255,255,0.65)',
                                borderRadius: 16,
                                backdropFilter: 'blur(10px)',
                                boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
                              }}
                            />
                          </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                          <div className="text-[13px] text-[#888] font-normal">Tổng</div>
                          <div className="text-[22px] text-[#1a1a1a] font-bold">$1,492</div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        {[
                          { name: 'Eau de Parfum', amount: '$1,081', value: 40, color: '#D56844' },
                          { name: 'Eau de Toilette', amount: '$323', value: 35, color: '#4F8EF7' },
                          { name: 'Body Mist', amount: '$55', value: 15, color: '#34C48B' },
                          { name: 'Bộ Quà Tặng', amount: '$33', value: 10, color: '#A0A0A0' },
                        ].map((row) => (
                          <div key={row.name} className="grid grid-cols-[1fr_auto_auto] items-center gap-4">
                            <div className="flex items-center gap-3 min-w-0">
                              <span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: row.color }} />
                              <div className="text-sm font-semibold text-slate-800 truncate">{row.name}</div>
                            </div>
                            <div className="text-sm text-slate-600 tabular-nums">{row.amount}</div>
                            <div className="text-sm text-slate-600 tabular-nums">{row.value}%</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </GlassCard>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
