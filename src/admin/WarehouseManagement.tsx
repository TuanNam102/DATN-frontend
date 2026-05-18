import { useState } from 'react';
import {
  Plus,
  Edit,
  Trash2,
  Filter,
  Eye,
  Search,
  Package,
  AlertTriangle,
  AlertCircle,
  DollarSign,
  Archive,
  Box,
  RefreshCw,
  X,
  Save,
} from 'lucide-react';
import { GlassCard, Badge, StatCard } from './components/SharedComponents';

const WarehouseManagement = () => {
  const [inventory, setInventory] = useState([
    { id: 'PRD001', name: 'Chanel No.5', category: 'Eau de Parfum', currentStock: 45, minStock: 20, maxStock: 100, location: 'A1-01', lastUpdated: '2024-01-15', status: 'Bình thường' },
    { id: 'PRD002', name: 'Dior Sauvage', category: 'Eau de Toilette', currentStock: 12, minStock: 25, maxStock: 80, location: 'A1-02', lastUpdated: '2024-01-14', status: 'Tồn kho thấp' },
    { id: 'PRD003', name: 'Tom Ford Black Orchid', category: 'Eau de Parfum', currentStock: 67, minStock: 15, maxStock: 120, location: 'B2-01', lastUpdated: '2024-01-16', status: 'Bình thường' },
    { id: 'PRD004', name: 'YSL Libre', category: 'Eau de Parfum', currentStock: 8, minStock: 20, maxStock: 90, location: 'B2-02', lastUpdated: '2024-01-13', status: 'Cần nhập hàng' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('Tất cả');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'view' | 'edit'>('view');
  const [editingItem, setEditingItem] = useState<any>(null);

  const filteredInventory = inventory.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedLocation === 'Tất cả' || item.location.startsWith(selectedLocation))
  );

  const handleDelete = (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xoá mục này khỏi danh sách kiểm kê?')) {
      setInventory(inventory.filter(i => i.id !== id));
    }
  };

  const handleOpenModal = (item: any, mode: 'view' | 'edit') => {
    setEditingItem({ ...item });
    setModalMode(mode);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (modalMode === 'edit') {
      const updatedItem = {
        ...editingItem,
        lastUpdated: new Date().toISOString().split('T')[0]
      };
      setInventory(inventory.map(i => i.id === updatedItem.id ? updatedItem : i));
    }
    setIsModalOpen(false);
  };

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
                    <td className="py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleOpenModal(item, 'view')}
                          className="p-1.5 hover:bg-white/60 rounded-lg transition-colors"
                        >
                          <Eye className="h-4 w-4 text-slate-600" />
                        </button>
                        <button 
                          onClick={() => handleOpenModal(item, 'edit')}
                          className="p-1.5 hover:bg-white/60 rounded-lg transition-colors"
                        >
                          <Edit className="h-4 w-4 text-slate-600" />
                        </button>
                        <button 
                          onClick={() => handleDelete(item.id)}
                          className="p-1.5 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
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

      {/* Modal View/Edit */}
      {isModalOpen && editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/20 backdrop-blur-sm">
          <GlassCard className="w-full max-w-lg p-6 overflow-hidden">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-900">
                {modalMode === 'view' ? 'Chi Tiết Kho Hàng' : 'Điều Chỉnh Kho'}
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
                  <label className="text-xs font-semibold text-slate-500 uppercase">Mã Sản Phẩm</label>
                  <div className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 font-mono">
                    {editingItem.id}
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 uppercase">Vị Trí Kho</label>
                  {modalMode === 'view' ? (
                    <div className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 font-mono">
                      {editingItem.location}
                    </div>
                  ) : (
                    <input
                      type="text"
                      className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl outline-none focus:border-[#D56844] transition-colors"
                      value={editingItem.location}
                      onChange={(e) => setEditingItem({ ...editingItem, location: e.target.value })}
                    />
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 uppercase">Tên Sản Phẩm</label>
                <div className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 font-medium">
                  {editingItem.name}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 uppercase">Tồn Kho Hiện Tại</label>
                  {modalMode === 'view' ? (
                    <div className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 font-bold">
                      {editingItem.currentStock}
                    </div>
                  ) : (
                    <input
                      type="number"
                      className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl outline-none focus:border-[#D56844] transition-colors font-bold"
                      value={editingItem.currentStock}
                      onChange={(e) => setEditingItem({ ...editingItem, currentStock: parseInt(e.target.value) })}
                    />
                  )}
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 uppercase">Trạng Thái</label>
                  <div className="flex pt-1">
                    <Badge tone={getStockStatus(editingItem).tone}>
                      {getStockStatus(editingItem).text}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 uppercase">Tồn Kho Tối Thiểu (Min)</label>
                  {modalMode === 'view' ? (
                    <div className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-slate-700">
                      {editingItem.minStock}
                    </div>
                  ) : (
                    <input
                      type="number"
                      className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl outline-none focus:border-[#D56844] transition-colors"
                      value={editingItem.minStock}
                      onChange={(e) => setEditingItem({ ...editingItem, minStock: parseInt(e.target.value) })}
                    />
                  )}
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 uppercase">Tồn Kho Tối Đa (Max)</label>
                  {modalMode === 'view' ? (
                    <div className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-slate-700">
                      {editingItem.maxStock}
                    </div>
                  ) : (
                    <input
                      type="number"
                      className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl outline-none focus:border-[#D56844] transition-colors"
                      value={editingItem.maxStock}
                      onChange={(e) => setEditingItem({ ...editingItem, maxStock: parseInt(e.target.value) })}
                    />
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 uppercase">Cập Nhật Lần Cuối</label>
                <div className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-slate-700">
                  {editingItem.lastUpdated}
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
                  Xác Nhận Điều Chỉnh
                </button>
              )}
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
};

export default WarehouseManagement;
