import React, { useMemo } from 'react';
import {
  Download,
  Calendar,
  DollarSign,
  ShoppingCart,
  Users,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
  Pie,
  PieChart,
  Cell,
} from 'recharts';
import { GlassCard, Badge, StatCard } from './components/SharedComponents';

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

export default StatisticsManagement;
