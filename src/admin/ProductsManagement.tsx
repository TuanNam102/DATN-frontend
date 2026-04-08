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
} from 'lucide-react';
import { GlassCard, Badge, StatCard } from './components/SharedComponents';

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

export default ProductsManagement;
