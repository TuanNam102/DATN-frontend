import React from "react";
import AnimatedPerfumeBanner from "../components/home/AnimatedPerfumeBanner";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../services/productService";
import type { Product } from "../types";
import { formatPrice } from "../utils/format";

const productTabs = ["Bán Chạy Nhất", "Hàng Mới", "Nổi Bật"];

const heroSlides = [
  {
    id: 1,
    titleTop: "Hương Thơm",
    titleBottom: "Đẳng Cấp",
    image: "https://borcen-store-newdemo.myshopify.com/cdn/shop/files/s29-1_1.jpg?v=1756867089",
    description: "Khám phá bộ sưu tập nước hoa mới nhất năm 2026 với những mùi hương độc bản."
  },
  {
    id: 2,
    titleTop: "Sự Quyến Rũ",
    titleBottom: "Tinh Tế",
    image: "https://borcen-store-newdemo.myshopify.com/cdn/shop/files/s29-2_1.jpg?v=1756868462",
    description: "Đánh thức mọi giác quan với những nốt hương hoa hồng và nhài tinh khiết."
  },
  {
    id: 3,
    titleTop: "Phong Cách",
    titleBottom: "Thời Thượng",
    image: "https://borcen-store-newdemo.myshopify.com/cdn/shop/files/s29-1_2.jpg?v=1756867129",
    description: "Khẳng định phong cách riêng biệt của bạn qua từng giọt hương quý giá."
  },
];

const Home = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [activeTab, setActiveTab] = useState(productTabs[0]);
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [showNewsletterPopup, setShowNewsletterPopup] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState("50ml");
  const [quantity, setQuantity] = useState(1);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [menProducts, setMenProducts] = useState<Product[]>([]);
  const [womenProducts, setWomenProducts] = useState<Product[]>([]);
  const [unisexProducts, setUnisexProducts] = useState<Product[]>([]);
  const [tabProducts, setTabProducts] = useState<Record<string, Product[]>>({
    "Bán Chạy Nhất": [],
    "Hàng Mới": [],
    "Nổi Bật": [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      setLoading(true);
      try {
        const [featuredRes, menRes, womenRes, unisexRes] = await Promise.all([
          getProducts({ limit: 4 }), // Featured
          getProducts({ category: "Nam", limit: 8 }),
          getProducts({ category: "Nữ", limit: 8 }),
          getProducts({ category: "Unisex", limit: 8 }),
        ]);

        setFeaturedProducts(featuredRes.data);
        setMenProducts(menRes.data);
        setWomenProducts(womenRes.data);
        setUnisexProducts(unisexRes.data);
        
        // Mocking tabs from featured for now since backend doesn't have specific flags yet
        setTabProducts({
          "Bán Chạy Nhất": featuredRes.data,
          "Hàng Mới": featuredRes.data.slice().reverse(),
          "Nổi Bật": featuredRes.data,
        });
      } catch (error) {
        console.error("Error fetching home data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  const [noteStart, setNoteStart] = useState(0);
  const noteGroups = ["Hương Hoa", "Hương Gỗ", "Hương Cam", "Mùi Ngọt"];
  const [menStart, setMenStart] = useState(0);
  const [womenStart, setWomenStart] = useState(0);
  const [unisexStart, setUnisexStart] = useState(0);
  const [dealCountdowns, setDealCountdowns] = useState([
    { total: 172800 }, { total: 178200 }, { total: 183600 }
  ]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setDirection(1);
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setDealCountdowns((prev) =>
        prev.map((deal) => {
          let next = deal.total - 1;
          if (next < 0) next = 172800;
          return { total: next };
        })
      );
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const getTimeParts = (total: number) => {
    const days = Math.floor(total / 86400);
    const hours = Math.floor((total % 86400) / 3600);
    const mins = Math.floor((total % 3600) / 60);
    const secs = total % 60;
    return { days, hours, mins, secs };
  };

  useEffect(() => {
    const popupTimer = window.setTimeout(() => setShowNewsletterPopup(true), 2500);
    return () => window.clearTimeout(popupTimer);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNoteStart((prev) => (prev + 1) % noteGroups.length);
      if (menProducts.length > 4) setMenStart((prev) => (prev + 1) % menProducts.length);
      if (womenProducts.length > 4) setWomenStart((prev) => (prev + 1) % womenProducts.length);
      if (unisexProducts.length > 4) setUnisexStart((prev) => (prev + 1) % unisexProducts.length);
    }, 3200);
    return () => window.clearInterval(timer);
  }, [menProducts.length, womenProducts.length, unisexProducts.length]);

  const getWindowedItems = <T,>(items: T[], start: number, count: number): T[] => {
    if (items.length === 0) return [];
    return Array.from({ length: Math.min(count, items.length) }, (_, i) => items[(start + i) % items.length]);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0
    })
  };

  return (
    <main className="bg-white text-[#111]">
      <AnimatedPerfumeBanner />

      <div className="marquee-strip border-y border-black/10 text-black/70 bg-white text-xs tracking-[0.35em] uppercase py-3">
        <div className="marquee-track">
          <span>Bộ Sưu Tập Mới</span>
          <span>Hương Thơm Đặc Trưng</span>
          <span>Miễn Phí Giao Hàng Trên 500k</span>
          <span>Bản Giới Hạn</span>
          <span>Bộ Sưu Tập Mới</span>
          <span>Hương Thơm Đặc Trưng</span>
          <span>Miễn Phí Giao Hàng Trên 500k</span>
          <span>Bản Giới Hạn</span>
        </div>
      </div>

      <section className="py-20 md:py-24 bg-white">
        <div className="max-w-[1320px] mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <h2 className="text-4xl md:text-6xl  font-heading font-medium">Sản Phẩm Nổi Bật</h2>
            <p className="max-w-md text-sm text-black/60">
              Khám phá những mùi hương độc bản được yêu thích nhất trong bộ sưu tập của chúng tôi.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {loading ? (
              [1, 2, 3, 4].map((item) => (
                <div key={item} className="placeholder-shimmer aspect-[4/5] rounded-2xl border border-black/10 bg-[#ddd7cd]" />
              ))
            ) : (
              featuredProducts.map((product, index) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.01 }}
                  className="group relative aspect-[4/5] rounded-2xl overflow-hidden border border-black/10 bg-white"
                >
                  <Link to={`/product/${product._id}`}>
                    <img 
                      src={product.images[0] || "https://via.placeholder.com/600"} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                      <div className="text-white">
                        <p className="text-[10px] uppercase tracking-widest text-white/70 mb-1">{product.category}</p>
                        <h3 className="text-2xl  font-heading font-medium">{product.name}</h3>
                        <p className="text-primary font-bold mt-2">{formatPrice(product.price)}</p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-[1320px] mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-[40px] md:text-[46px] font-heading font-medium">Nước Hoa Nam</h2>
            <div className="hidden md:flex gap-2 text-xs text-black/40">
              <button
                className="w-5 h-5 border border-black/15 rounded-full"
                onClick={() => setMenStart((prev) => (prev - 1 + menProducts.length) % menProducts.length)}
              >
                ‹
              </button>
              <button
                className="w-5 h-5 border border-black/15 rounded-full"
                onClick={() => setMenStart((prev) => (prev + 1) % menProducts.length)}
              >
                ›
              </button>
            </div>
          </div>
          <div className="w-12 h-[2px] bg-[#9ad9d6] mb-8" />
          <div className="grid md:grid-cols-[300px_1fr] gap-4">
            <div className="relative bg-[#fcd4b8] overflow-hidden min-h-[310px] border border-black/10">
              <img src="/men_perfume_banner_1775105655086.png" alt="Men Perfume Banner" className="absolute inset-0 w-full h-full object-cover opacity-[0.85]" />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/90 border border-black/20 px-7 py-5 text-center">
                <p className="text-xl tracking-[0.15em] uppercase font-heading font-medium ">Dành Cho Phái Mạnh</p>
                <Link to="/products?category=Nam" className="mt-3 inline-flex items-center justify-center border border-black/60 h-8 px-4 text-[10px] uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-colors">Mua ngay</Link>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {loading ? (
                [1, 2, 3, 4].map((item) => (
                  <div key={item} className="placeholder-shimmer h-[310px] bg-[#ececec]" />
                ))
              ) : (
                getWindowedItems(menProducts, menStart, 4).map((product, index) => (
                  <motion.article
                    key={`${product._id}-${index}`}
                    layout
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25 }}
                    className="bg-white p-3 group border border-black/5"
                  >
                    <div className="relative h-[210px] bg-[#f9f9f9] overflow-hidden">
                      <img 
                        src={product.images[0] || "https://via.placeholder.com/400"} 
                        alt={product.name} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {product.isSale && (
                        <div className="absolute top-0 right-0 w-12 h-12 bg-[#df3153] text-white text-[9px] grid place-items-center rotate-45 translate-x-6 -translate-y-6">
                          SALE
                        </div>
                      )}
                      <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link to={`/product/${product._id}`} className="h-7 px-3 rounded-full bg-black text-white text-[10px] uppercase tracking-[0.15em] flex items-center">
                          Xem
                        </Link>
                      </div>
                    </div>
                    <h4 className="mt-3 text-sm font-heading font-medium  truncate">{product.name}</h4>
                    <p className="text-xs text-[#FE7200] font-bold mt-1">
                      {formatPrice(product.salePrice || product.price)}
                      {product.salePrice && product.salePrice < product.price && (
                        <span className="line-through text-black/30 ml-2 font-normal">{formatPrice(product.price)}</span>
                      )}
                    </p>
                  </motion.article>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-[1320px] mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-[40px] md:text-[46px] font-heading font-medium">Nước Hoa Nữ</h2>
            <div className="hidden md:flex gap-2 text-xs text-black/40">
              <button
                className="w-5 h-5 border border-black/15 rounded-full"
                onClick={() => setWomenStart((prev) => (prev - 1 + womenProducts.length) % womenProducts.length)}
              >
                ‹
              </button>
              <button
                className="w-5 h-5 border border-black/15 rounded-full"
                onClick={() => setWomenStart((prev) => (prev + 1) % womenProducts.length)}
              >
                ›
              </button>
            </div>
          </div>
          <div className="w-12 h-[2px] bg-[#9ad9d6] mb-8" />
          <div className="grid md:grid-cols-[300px_1fr] gap-4">
            <div className="relative bg-[#fce0d4] overflow-hidden min-h-[310px] border border-black/10">
              <img src="/women_perfume_banner_1775105670217.png" alt="Women Perfume Banner" className="absolute inset-0 w-full h-full object-cover opacity-[0.85]" />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/90 border border-black/20 px-7 py-5 text-center">
                <p className="text-xl tracking-[0.15em] uppercase font-heading font-medium ">Quyến Rũ Phái Đẹp</p>
                <Link to="/products?category=Nữ" className="mt-3 inline-flex items-center justify-center border border-black/60 h-8 px-4 text-[10px] uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-colors">Mua ngay</Link>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {loading ? (
                [1, 2, 3, 4].map((item) => (
                  <div key={item} className="placeholder-shimmer h-[310px] bg-[#ececec]" />
                ))
              ) : (
                getWindowedItems(womenProducts, womenStart, 4).map((product, index) => (
                  <motion.article
                    key={`${product._id}-${index}`}
                    layout
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25 }}
                    className="bg-white p-3 group border border-black/5"
                  >
                    <div className="relative h-[210px] bg-[#f9f9f9] overflow-hidden">
                      <img 
                        src={product.images[0] || "https://via.placeholder.com/400"} 
                        alt={product.name} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {product.isSale && (
                        <div className="absolute top-0 right-0 w-12 h-12 bg-[#df3153] text-white text-[9px] grid place-items-center rotate-45 translate-x-6 -translate-y-6">
                          SALE
                        </div>
                      )}
                      <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link to={`/product/${product._id}`} className="h-7 px-3 rounded-full bg-black text-white text-[10px] uppercase tracking-[0.15em] flex items-center">
                          Xem
                        </Link>
                      </div>
                    </div>
                    <h4 className="mt-3 text-sm font-heading font-medium  truncate">{product.name}</h4>
                    <p className="text-xs text-[#FE7200] font-bold mt-1">
                      {formatPrice(product.salePrice || product.price)}
                      {product.salePrice && product.salePrice < product.price && (
                        <span className="line-through text-black/30 ml-2 font-normal">{formatPrice(product.price)}</span>
                      )}
                    </p>
                  </motion.article>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-[1320px] mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-[40px] md:text-[46px] font-heading font-medium">Nước Hoa Unisex</h2>
            <div className="hidden md:flex gap-2 text-xs text-black/40">
              <button
                className="w-5 h-5 border border-black/15 rounded-full"
                onClick={() => setUnisexStart((prev) => (prev - 1 + unisexProducts.length) % unisexProducts.length)}
              >
                ‹
              </button>
              <button
                className="w-5 h-5 border border-black/15 rounded-full"
                onClick={() => setUnisexStart((prev) => (prev + 1) % unisexProducts.length)}
              >
                ›
              </button>
            </div>
          </div>
          <div className="w-12 h-[2px] bg-[#9ad9d6] mb-8" />
          <div className="grid md:grid-cols-[300px_1fr] gap-4">
            <div className="relative bg-[#e9f2ee] overflow-hidden min-h-[310px] border border-black/10">
              <img src="https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&q=80&w=600" alt="Unisex Perfume Banner" className="absolute inset-0 w-full h-full object-cover opacity-[0.85]" />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/90 border border-black/20 px-7 py-5 text-center w-[80%]">
                <p className="text-xl tracking-[0.15em] uppercase font-heading font-medium ">Phong Cách Phi Giới Tính</p>
                <Link to="/products?category=Unisex" className="mt-3 inline-flex items-center justify-center border border-black/60 h-8 px-4 text-[10px] uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-colors">Mua ngay</Link>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {loading ? (
                [1, 2, 3, 4].map((item) => (
                  <div key={item} className="placeholder-shimmer h-[310px] bg-[#ececec]" />
                ))
              ) : (
                getWindowedItems(unisexProducts, unisexStart, 4).map((product, index) => (
                  <motion.article
                    key={`${product._id}-${index}`}
                    layout
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25 }}
                    className="bg-white p-3 group border border-black/5"
                  >
                    <div className="relative h-[210px] bg-[#f9f9f9] overflow-hidden">
                      <img 
                        src={product.images[0] || "https://via.placeholder.com/400"} 
                        alt={product.name} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {product.isSale && (
                        <div className="absolute top-0 right-0 w-12 h-12 bg-[#df3153] text-white text-[9px] grid place-items-center rotate-45 translate-x-6 -translate-y-6">
                          SALE
                        </div>
                      )}
                      <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link to={`/product/${product._id}`} className="h-7 px-3 rounded-full bg-black text-white text-[10px] uppercase tracking-[0.15em] flex items-center">
                          Xem
                        </Link>
                      </div>
                    </div>
                    <h4 className="mt-3 text-sm font-heading font-medium  truncate">{product.name}</h4>
                    <p className="text-xs text-[#FE7200] font-bold mt-1">
                      {formatPrice(product.salePrice || product.price)}
                      {product.salePrice && product.salePrice < product.price && (
                        <span className="line-through text-black/30 ml-2 font-normal">{formatPrice(product.price)}</span>
                      )}
                    </p>
                  </motion.article>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-[1320px] mx-auto px-4 md:px-8">
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-6xl  font-heading font-medium">Gợi Ý Cho Bạn</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading ? (
              [1, 2, 3, 4].map((item) => (
                <div key={item} className="placeholder-shimmer aspect-square rounded-xl bg-[#f3efe8]" />
              ))
            ) : (
              featuredProducts.map((product, index) => (
                <motion.article
                  key={product._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.06 }}
                  whileHover={{ y: -8 }}
                  className="group"
                >
                  <Link to={`/product/${product._id}`} className="block">
                    <div className="aspect-square rounded-xl bg-white border border-black/10 overflow-hidden transition-transform duration-500 group-hover:scale-[1.02]">
                      <img src={product.images[0] || "https://via.placeholder.com/600"} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="pt-4 flex items-center justify-between gap-2">
                      <h3 className="text-base  font-heading font-medium truncate">{product.name}</h3>
                      <span className="text-sm text-[#FE7200] font-bold shrink-0">{formatPrice(product.price)}</span>
                    </div>
                  </Link>
                </motion.article>
              ))
            )}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#141414] text-white">
        <div className="max-w-[1320px] mx-auto px-4 md:px-8">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-[0.3em] text-white/55 mb-3">Ưu đãi trong tuần</p>
            <h2 className="text-3xl md:text-5xl  font-heading font-medium">Đếm Ngược Khuyến Mãi</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {featuredProducts.slice(0, 3).map((product, index) => {
              const t = getTimeParts(dealCountdowns[index].total);
              return (
                <div key={product._id} className="rounded-2xl border border-white/15 bg-white/5 p-4">
                  <div className="rounded-xl border border-white/10 h-[200px] mb-4 overflow-hidden">
                    <img src={product.images[0] || "https://via.placeholder.com/600"} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-2xl  font-heading font-medium mb-3 truncate">{product.name}</h3>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { label: "Ngày", value: t.days },
                      { label: "Giờ", value: t.hours },
                      { label: "Phút", value: t.mins },
                      { label: "Giây", value: t.secs },
                    ].map((time) => (
                      <div key={`${product._id}-${time.label}`} className="rounded-lg border border-white/15 py-2 text-center">
                        <p className="text-lg font-semibold">{String(time.value).padStart(2, "0")}</p>
                        <p className="text-[10px] text-white/60 uppercase">{time.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-[1320px] mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 mb-8">
            <h2 className="text-4xl md:text-6xl  font-heading font-medium">Sản Phẩm Đa Dạng</h2>
            <div className="flex flex-wrap gap-2">
              {productTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 h-10 rounded-full text-xs uppercase tracking-[0.2em] border transition-colors ${activeTab === tab ? "bg-black text-white border-black" : "border-black/20 hover:border-black"
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tabProducts[activeTab].map((product) => (
              <motion.article key={product._id} layout className="group">
                <div className="w-full text-left relative">
                  <Link to={`/product/${product._id}`} className="block">
                    <div className="aspect-square rounded-xl bg-white border border-black/10 overflow-hidden">
                      <img src={product.images[0] || "https://via.placeholder.com/600"} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
                    </div>
                    <div className="pt-4 flex items-center justify-between gap-2">
                      <h3 className="text-base  font-heading font-medium truncate">{product.name}</h3>
                      <span className="text-sm text-[#FE7200] font-bold">{formatPrice(product.price)}</span>
                    </div>
                  </Link>
                  <button
                    onClick={() => {
                      setQuickView(product);
                      setSelectedVariant("50ml");
                      setQuantity(1);
                    }}
                    className="text-xs uppercase tracking-[0.2em] text-black/45 mt-1 hover:text-black transition-colors"
                  >
                    Xem Nhanh
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-white">
        <div className="max-w-[1320px] mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-5">
            <p className="text-xs tracking-[0.3em] uppercase text-black/60">Banner Bộ Sưu Tập</p>
            <h2 className="text-4xl md:text-6xl  font-heading font-medium">Hương Thơm Tinh Tế Cho Phong Cách Hiện Đại</h2>
            <Link to="/products" className="inline-flex items-center justify-center px-7 h-11 rounded-full border border-black/25 text-xs tracking-[0.22em] uppercase hover:bg-black hover:text-white transition-colors">
              Xem bộ sưu tập
            </Link>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-black/10 bg-[#e4ddd2]"
          >
            <img src="/collection_banner_1775105686852.png" alt="Collection Banner" className="absolute inset-0 w-full h-full object-cover" />
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-[1320px] mx-auto px-4 md:px-8">
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-6xl  font-heading font-medium">Kinh Nghiệm</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <motion.article
                key={item}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: item * 0.08 }}
                whileHover={{ y: -6 }}
                className="rounded-2xl overflow-hidden border border-black/10 bg-[#faf8f4]"
              >
                <div className="aspect-[16/10] bg-[#ece6db] overflow-hidden">
                  <img src={`https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=600`} alt="Blog" className="w-full h-full object-cover" />
                </div>
                <div className="p-5 space-y-3">
                  <p className="text-xs uppercase tracking-[0.2em] text-black/45">Tháng 3, 2026</p>
                  <h3 className="text-2xl  font-heading font-medium">Cách chọn mùi hương đặc trưng của bạn</h3>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#111] text-white">
        <div className="max-w-[820px] mx-auto px-4 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-white/55 mb-5">Bản Tin</p>
          <h2 className="text-4xl md:text-6xl  font-heading font-medium mb-8">Tham gia cộng đồng yêu hương thơm</h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Nhập email của bạn"
              className="flex-1 h-12 rounded-full bg-white/10 border border-white/20 px-5 outline-none"
            />
            <button className="h-12 px-8 rounded-full bg-white text-black text-xs uppercase tracking-[0.2em] hover:bg-white/80">
              Đăng ký
            </button>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {quickView && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm p-4 flex items-center justify-center"
            onClick={() => setQuickView(null)}
          >
            <motion.div
              initial={{ y: 30, opacity: 0, scale: 0.96 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-[900px] rounded-2xl bg-white text-black p-5 md:p-8 grid md:grid-cols-2 gap-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="rounded-xl border border-black/10 bg-[#f3efe8] min-h-[280px] overflow-hidden">
                <img src={quickView.images[0] || "https://via.placeholder.com/600"} alt={quickView.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col">
                <p className="text-xs uppercase tracking-[0.2em] text-black/45">{quickView.category}</p>
                <h3 className="text-3xl  font-heading font-medium mt-2">{quickView.name}</h3>
                <p className="mt-3 text-black/65 text-sm line-clamp-3">{quickView.description}</p>
                <p className="mt-4 text-xl text-[#FE7200] font-bold">{formatPrice(quickView.price)}</p>
                <div className="mt-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-black/50 mb-2">Dung Tích</p>
                  <div className="flex gap-2">
                    {["30ml", "50ml", "100ml"].map((variant) => (
                      <button
                        key={variant}
                        onClick={() => setSelectedVariant(variant)}
                        className={`px-4 h-9 rounded-full border text-xs ${selectedVariant === variant ? "bg-black text-white border-black" : "border-black/20"
                          }`}
                      >
                        {variant}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-black/50 mb-2">Số Lượng</p>
                  <div className="inline-flex items-center border border-black/20 rounded-full h-10 px-1">
                    <button
                      className="w-9 h-8 rounded-full hover:bg-black/5"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    >
                      -
                    </button>
                    <span className="w-10 text-center text-sm">{quantity}</span>
                    <button className="w-9 h-8 rounded-full hover:bg-black/5" onClick={() => setQuantity((q) => q + 1)}>
                      +
                    </button>
                  </div>
                </div>
                <button className="mt-auto h-11 rounded-full bg-black text-white text-xs uppercase tracking-[0.2em] hover:bg-black/80 transition-colors">
                  Thêm vào giỏ - {selectedVariant} x{quantity}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showNewsletterPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[65] bg-black/40 p-4 flex items-center justify-center"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              className="w-full max-w-[580px] rounded-2xl bg-[#131313] text-white p-7 relative border border-white/15"
            >
              <button
                onClick={() => setShowNewsletterPopup(false)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full border border-white/20 text-white/75"
              >
                ×
              </button>
              <p className="text-xs uppercase tracking-[0.25em] text-white/60 mb-4">Đăng ký nhận tin</p>
              <h3 className="text-3xl md:text-4xl  font-heading font-medium">Giảm 10% cho đơn hàng đầu tiên</h3>
              <div className="mt-6 flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Email của bạn"
                  className="flex-1 h-11 rounded-full bg-white/10 border border-white/20 px-4 outline-none"
                />
                <button className="h-11 px-6 rounded-full bg-white text-black text-xs uppercase tracking-[0.2em]">
                  Đăng ký
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default Home;

