import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getProducts } from "../services/productService";
import type { Product } from "../types";
import { formatPrice } from "../utils/format";

const brands = ["Tất cả", "AFNAN", "CHANEL", "GUCCI", "HERMES", "YSL", "DIOR"];
const sortOptions = ["Nổi bật", "Bán chạy nhất", "Giá: Thấp đến Cao", "Giá: Cao đến Thấp", "Mới nhất"];

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeBrand, setActiveBrand] = useState("Tất cả");
  const [sortBy, setSortBy] = useState("Nổi bật");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await getProducts({
          page: pagination.page,
          brand: activeBrand === "Tất cả" ? undefined : activeBrand,
        });
        
        let sortedData = [...res.data];
        if (sortBy === "Giá: Thấp đến Cao") {
          sortedData.sort((a, b) => a.price - b.price);
        } else if (sortBy === "Giá: Cao đến Thấp") {
          sortedData.sort((a, b) => b.price - a.price);
        }
        
        setProducts(sortedData);
        setPagination(prev => ({ ...prev, totalPages: res.totalPages }));
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [activeBrand, sortBy, pagination.page]);

  const handleBrandChange = (brand: string) => {
    setActiveBrand(brand);
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  return (
    <main className="bg-white min-h-screen pt-[100px] pb-24 font-body">
      {/* Page Header / Hero */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden mb-12">
        <img 
          src="/images/perfume_collection_banner.png" 
          alt="Products Header" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative text-center text-white px-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading font-medium text-5xl md:text-7xl  mb-4"
          >
            Bộ sưu tập
          </motion.h1>
          <nav className="flex justify-center items-center gap-2 text-sm font-medium text-white/80">
            <Link to="/" className="hover:text-primary transition-colors">Trang chủ</Link>
            <span className="text-[10px]">/</span>
            <span>Sản phẩm</span>
          </nav>
        </div>
      </section>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Sidebar */}
          <aside className="w-full lg:w-[260px] shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-[13px] font-bold text-primary-deep mb-6 tracking-widest uppercase">THƯƠNG HIỆU</h3>
              
              <div className="flex items-center bg-[#f9f9f9] rounded-lg overflow-hidden mb-6">
                <input 
                  type="text" 
                  placeholder="Tìm thương hiệu" 
                  className="w-full bg-transparent border-none text-[13px] px-4 py-3 outline-none text-primary-deep/70" 
                />
                <button className="bg-black text-white w-12 h-[44px] flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>

              <div className="max-h-[260px] overflow-y-auto custom-scrollbar pr-3 space-y-4">
                {brands.map(brand => {
                  if (brand === "Tất cả") return null;
                  return (
                    <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        checked={activeBrand === brand}
                        onChange={() => handleBrandChange(activeBrand === brand ? "Tất cả" : brand)}
                        className="w-[14px] h-[14px] rounded-[3px] border-gray-300 text-black focus:ring-black cursor-pointer accent-black"
                      />
                      <span className={`text-[13px] transition-colors ${activeBrand === brand ? "text-primary-deep font-bold" : "text-primary-deep/70 group-hover:text-primary-deep"}`}>
                        {brand}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar: Sort */}
            <div className="flex flex-col md:flex-row items-center justify-end gap-8 mb-12 pb-6 border-b border-gray-100">

          <div className="flex items-center gap-6">
            <div className="relative group">
              <span className="text-xs font-medium text-primary-deep/40 mr-2">Sắp xếp:</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-[13px] font-bold text-primary-deep outline-none cursor-pointer border-none p-0 focus:ring-0"
              >
                {sortOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 text-sm font-bold text-primary-deep hover:text-primary transition-colors lg:hidden"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
              Lọc
            </button>
          </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {loading ? (
            [1, 2, 3, 4, 5, 6, 7, 8].map(item => (
              <div key={item} className="aspect-[3/4] rounded-2xl bg-gray-100 placeholder-shimmer" />
            ))
          ) : (
            <AnimatePresence mode="popLayout">
              {products.map((product, idx) => (
                <motion.div 
                  key={product._id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="group cursor-pointer"
                >
                  <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-white mb-6 relative shadow-sm border border-gray-100">
                    {(product.isHot || product.isSale) && (
                      <span className="absolute top-4 left-4 bg-primary text-white text-[9px] uppercase tracking-widest px-3 py-1 rounded-full z-10 font-bold">
                        {product.isHot ? "Hot" : "Sale"}
                      </span>
                    )}
                    <img 
                      src={product.images[0] || "https://via.placeholder.com/600"} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                      <Link 
                        to={`/product/${product._id}`}
                        className="px-8 py-3 bg-white text-primary-deep text-[13px] font-bold rounded-full transform scale-90 group-hover:scale-100 transition-all shadow-lg"
                      >
                        Xem chi tiết
                      </Link>
                    </div>
                  </div>
                  <div className="text-center">
                    <h4 className="font-heading font-medium text-2xl text-primary-deep  mb-2">{product.name}</h4>
                    <div className="flex items-center justify-center gap-3">
                      <span className="text-sm font-body text-primary-deep font-bold">{formatPrice(product.salePrice || product.price)}</span>
                      {product.salePrice && product.salePrice < product.price && (
                        <span className="text-xs text-primary-deep/40 line-through">{formatPrice(product.price)}</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

        {/* No Results State */}
        {!loading && products.length === 0 && (
          <div className="py-24 text-center">
            <h3 className="font-heading font-medium text-3xl  text-primary-deep/40">Không tìm thấy sản phẩm nào trong danh mục này</h3>
          </div>
        )}

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="mt-24 flex justify-center items-center gap-4">
            <button 
              disabled={pagination.page === 1}
              onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
              className={`w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center transition-all ${
                pagination.page === 1 ? "opacity-30 cursor-not-allowed" : "text-primary-deep/40 hover:border-primary hover:text-primary"
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="text-[13px] font-bold text-primary-deep">
              Trang {pagination.page} / {pagination.totalPages}
            </span>
            <button 
              disabled={pagination.page === pagination.totalPages}
              onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
              className={`w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center transition-all ${
                pagination.page === pagination.totalPages ? "opacity-30 cursor-not-allowed" : "text-primary-deep/40 hover:border-primary hover:text-primary"
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
              </button>
            </div>
          )}
        </div>
      </div>
      </div>
    </main>
  );
};

export default Products;
