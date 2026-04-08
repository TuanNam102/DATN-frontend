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
  GraduationCap,
  Home,
  LayoutDashboard,
  Landmark,
  LogOut,
  Package,
  RefreshCcw,
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
  X,
  Save,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  MoreVertical,
  Calendar,
  MapPin,
  Phone,
  Mail,
  ShoppingCart,
  Box,
  AlertCircle,
  CheckSquare,
  Square,
  User,
  Building,
  CreditCard,
  DollarSign,
  PackageOpen,
  Archive,
  Activity,
  LineChart as LineChartIcon,
  Zap,
  Shield,
  Database,
  Globe,
  Lock,
  Key,
  Palette,
  Volume2,
  Wifi,
  HelpCircle,
  FileDown,
  FileUp,
  RefreshCw,
} from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Label,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Area,
  AreaChart,
} from 'recharts';
import { GlassCard, Badge, StatCard, SidebarItem } from './components/SharedComponents';
import ProductsManagement from './ProductsManagement';
import CustomersManagement from './CustomersManagement';
import OrdersManagement from './OrdersManagement';
import WarehouseManagement from './WarehouseManagement';
import StatisticsManagement from './StatisticsManagement';
import SettingsManagement from './SettingsManagement';

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
