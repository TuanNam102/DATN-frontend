import React, { useState } from 'react';
import {
  Plus,
  Edit,
  Trash2,
  Filter,
  Download,
  Eye,
  Search,
  Package,
  AlertTriangle,
  AlertCircle,
  DollarSign,
  Archive,
  Box,
  RefreshCw,
} from 'lucide-react';
import { GlassCard, Badge, StatCard } from './components/SharedComponents';

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

export default WarehouseManagement;
