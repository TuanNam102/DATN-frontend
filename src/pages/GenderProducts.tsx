import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getProducts } from "../services/productService";
import type { Product } from "../types";
import { formatPrice } from "../utils/format";

const sortOptions = [
  { label: "Hàng mới", value: "newest" },
  { label: "Giá thấp đến cao", value: "price-asc" },
  { label: "Giá cao xuống thấp", value: "price-desc" },
];

const brands = [
  "AFNAN", "CHANEL", "GUCCI", "HERMES", "YSL", "DIOR"
];

const priceRanges = [
  "Giá dưới 100.000₫",
  "100.000₫ - 200.000₫",
  "200.000₫ - 300.000₫",
  "300.000₫ - 500.000₫",
  "500.000₫ - 1.000.000₫",
  "Trên 1.000.000₫"
];

const GenderProducts = () => {
  const { gender } = useParams<{ gender: string }>();
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const genderCategory = gender === "nam" ? "Nam" : "Nữ";
  const genderTitle = gender === "nam" ? "Nước hoa Nam chính hãng" : "Nước hoa Nữ chính hãng";

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await getProducts({ 
          category: genderCategory,
          limit: 20 
        });
        
        let sortedData = [...res.data];
        if (sortBy === "price-asc") {
          sortedData.sort((a, b) => a.price - b.price);
        } else if (sortBy === "price-desc") {
          sortedData.sort((a, b) => b.price - a.price);
        }
        
        setProducts(sortedData);
      } catch (error) {
        console.error("Error fetching gender products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [gender, genderCategory, sortBy]);

  return (
    <main className="bg-[#fcfcfc] min-h-screen pt-[140px] pb-24 font-body">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[13px] text-gray-500 mb-8">
          <Link to="/" className="hover:text-primary transition-colors">Trang chủ</Link>
          <span className="text-[10px] opacity-50">&gt;</span>
          <span className="text-primary font-medium">{genderTitle}</span>
        </nav>

        <div className="grid md:grid-cols-[280px_1fr] gap-8 items-start">
          {/* Sidebar: Filters */}
          <aside className="space-y-8 sticky top-[140px]">
            {/* Header Filter */}
            <div>
              <h2 className="text-lg font-bold text-gray-800 uppercase tracking-wider mb-1">Bộ lọc</h2>
              <p className="text-[11px] text-gray-400 uppercase tracking-widest">Giúp lọc nhanh sản phẩm bạn tìm kiếm</p>
            </div>

            {/* Brand Filter */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-sm font-bold text-gray-800 uppercase tracking-widest mb-4">Thương hiệu</h3>
              <div className="relative mb-4">
                <input 
                  type="text" 
                  placeholder="Tìm thương hiệu" 
                  className="w-full h-10 pl-4 pr-10 bg-gray-50 border border-gray-100 rounded text-sm outline-none focus:border-primary transition-colors"
                />
                <button className="absolute right-0 top-0 h-10 w-10 bg-primary-deep text-white rounded flex items-center justify-center hover:bg-primary transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
              <div className="max-h-60 overflow-y-auto custom-scrollbar space-y-3">
                {brands.map((brand) => (
                  <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-4 h-4 border-gray-300 rounded text-primary focus:ring-primary cursor-pointer" />
                    <span className="text-[13px] text-gray-500 group-hover:text-primary transition-colors">{brand}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-sm font-bold text-gray-800 uppercase tracking-widest mb-4">Giá sản phẩm</h3>
              <div className="space-y-3">
                {priceRanges.map((range) => (
                  <label key={range} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-4 h-4 border-gray-300 rounded text-primary focus:ring-primary cursor-pointer" />
                    <span className="text-[13px] text-gray-500 group-hover:text-primary transition-colors">{range}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content: Products */}
          <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100">
            <h1 className="text-2xl md:text-3xl font-bold text-primary-deep mb-8">{genderTitle}</h1>

            {/* Toolbar */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10 pb-6 border-b border-gray-100">
              <div className="flex flex-wrap items-center gap-6">
                <span className="text-sm font-bold text-gray-700">Xếp theo:</span>
                <div className="flex gap-6">
                  {sortOptions.map((opt) => (
                    <label key={opt.value} className="flex items-center gap-2 cursor-pointer group">
                      <input 
                        type="radio" 
                        name="sort" 
                        value={opt.value}
                        checked={sortBy === opt.value}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-4 h-4 border-gray-300 text-primary focus:ring-primary cursor-pointer"
                      />
                      <span className={`text-sm transition-colors ${sortBy === opt.value ? "text-primary font-bold" : "text-gray-500 group-hover:text-primary"}`}>
                        {opt.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500">Xem:</span>
                <button 
                  onClick={() => setViewMode("grid")}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded border transition-all ${viewMode === "grid" ? "bg-primary/10 border-primary text-primary" : "border-gray-200 text-gray-400 hover:border-primary/50"}`}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4 4h4v4H4V4zm6 0h4v4h-4V4zm6 0h4v4h-4V4zM4 10h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4zM4 16h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4z"/>
                  </svg>
                  <span className="text-xs font-bold uppercase tracking-widest text-inherit">Lưới</span>
                </button>
                <button 
                  onClick={() => setViewMode("list")}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded border transition-all ${viewMode === "list" ? "bg-primary/10 border-primary text-primary" : "border-gray-200 text-gray-400 hover:border-primary/50"}`}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z"/>
                  </svg>
                  <span className="text-xs font-bold uppercase tracking-widest text-inherit">Cột</span>
                </button>
              </div>
            </div>

            {/* Grid */}
            <div className={`grid ${viewMode === "grid" ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4" : "grid-cols-1"} gap-x-8 gap-y-12`}>
              <AnimatePresence mode="popLayout">
                {loading ? (
                  [1, 2, 3, 4, 5, 6, 7, 8].map(item => (
                    <div key={item} className="aspect-[3/4] rounded-2xl bg-gray-100 placeholder-shimmer" />
                  ))
                ) : (
                  products.map((product, idx) => (
                    <motion.div 
                      key={product._id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: idx * 0.05 }}
                      className={`group cursor-pointer ${viewMode === "list" ? "flex gap-8 items-center border-b border-gray-50 pb-8" : ""}`}
                    >
                      <Link to={`/product/${product._id}`} className={`${viewMode === "grid" ? "aspect-square w-full" : "w-48 aspect-square"} block rounded-xl overflow-hidden bg-white mb-4 relative border border-gray-50 group-hover:border-primary/20 transition-all`}>
                        <img 
                          src={product.images[0] || "https://via.placeholder.com/400"} 
                          alt={product.name} 
                          className="w-full h-full object-contain p-4 transition-transform duration-700 group-hover:scale-110" 
                        />
                        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                      <div className={viewMode === "grid" ? "text-center" : "flex-1 text-left"}>
                        <Link to={`/product/${product._id}`}>
                          <h4 className="text-[15px] font-medium text-gray-800 group-hover:text-primary transition-colors mb-2 line-clamp-2 min-h-[40px]">
                            {product.name}
                          </h4>
                        </Link>
                        <p className="text-primary font-bold text-sm">
                          {formatPrice(product.salePrice || product.price)}
                        </p>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {!loading && products.length === 0 && (
              <div className="py-20 text-center">
                <p className="text-gray-400 ">Không tìm thấy sản phẩm nào trong danh mục này.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default GenderProducts;
