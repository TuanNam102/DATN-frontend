import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const products = [
  { id: "kivra-solen", name: "Kivra Solen" },
  { id: "sea-memory", name: "Sea Memory" },
  { id: "noir-garden", name: "Noir Garden" },
  { id: "amber-dust", name: "Amber Dust" },
  { id: "velvet-bloom", name: "Velvet Bloom" },
  { id: "silk-vanilla", name: "Silk Vanilla" },
  { id: "shadow-musk", name: "Shadow Musk" },
  { id: "white-fig", name: "White Fig" },
];

const productTabs = ["Bán Chạy Nhất", "Hàng Mới", "Nổi Bật"];

const tabProducts: Record<string, { id: string; name: string }[]> = {
  "Bán Chạy Nhất": [
    { id: "kivra-solen", name: "Kivra Solen" },
    { id: "sea-memory", name: "Sea Memory" },
    { id: "noir-garden", name: "Noir Garden" },
    { id: "amber-dust", name: "Amber Dust" },
  ],
  "Hàng Mới": [
    { id: "velvet-bloom", name: "Velvet Bloom" },
    { id: "silk-vanilla", name: "Silk Vanilla" },
    { id: "shadow-musk", name: "Shadow Musk" },
    { id: "white-fig", name: "White Fig" },
  ],
  "Nổi Bật": [
    { id: "cedar-moon", name: "Cedar Moon" },
    { id: "soft-iris", name: "Soft Iris" },
    { id: "gold-musk", name: "Gold Musk" },
    { id: "night-jasmine", name: "Night Jasmine" },
  ],
};

const productVariants = ["30ml", "50ml", "100ml"];
const deals = ["Jasmine Night", "Velvet Bloom", "Sea Memory"];
const noteGroups = ["Hương Hoa", "Vani", "Ấm & Cay", "Hương Gỗ", "Oải Hương", "Tươi Mát"];
const menProducts = ["Rovek Soryn", "Cylor Elvor", "Firae Talor", "Venor Pryne", "Navor Elin", "Musk Talor"];
const womenProducts = ["Dalin Rovek", "Zorvi Mivan", "Kivra Solen", "Kivra Solen", "Elora Vyn", "Mivan Sore"];

const heroSlides = [
  { titleTop: "web", titleBottom: "dang cap" },
  { titleTop: "tao", titleBottom: "dang cap" },
  { titleTop: "tao", titleBottom: "dang cap" },
];

const Home = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeTab, setActiveTab] = useState(productTabs[0]);
  const [quickView, setQuickView] = useState<string | null>(null);
  const [showNewsletterPopup, setShowNewsletterPopup] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(productVariants[1]);
  const [quantity, setQuantity] = useState(1);
  const [noteStart, setNoteStart] = useState(0);
  const [menStart, setMenStart] = useState(0);
  const [womenStart, setWomenStart] = useState(0);
  const [dealCountdowns, setDealCountdowns] = useState(
    deals.map((_, i) => ({ total: 172800 + i * 5400 }))
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4500);
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
      setMenStart((prev) => (prev + 1) % menProducts.length);
      setWomenStart((prev) => (prev + 1) % womenProducts.length);
    }, 3200);
    return () => window.clearInterval(timer);
  }, []);

  const getWindowedItems = (items: string[], start: number, count: number) =>
    Array.from({ length: count }, (_, i) => items[(start + i) % items.length]);

  return (
    <main className="bg-[#f7f4ef] text-[#111]">
      <section className="min-h-screen bg-gradient-to-b from-black to-[#FE7200] text-white pt-[132px]">
        <div className="max-w-[1320px] mx-auto px-4 md:px-8 py-14 md:py-20">
          <div className="grid lg:grid-cols-[260px_1fr_260px] gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="relative floating-soft h-[360px] md:h-[470px] rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm overflow-hidden"
            >
              <img src="/hero_product_1_1775105975925.png" alt="Hero Product 1" className="absolute inset-0 w-full h-full object-cover" />
            </motion.div>
            <div className="text-center">
              <p className="text-xs tracking-[0.35em] uppercase text-white/60 mb-6">Perfume Collection 2026</p>
              <AnimatePresence mode="wait">
                <motion.h1
                  key={activeSlide}
                  initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -26, filter: "blur(6px)" }}
                  transition={{ duration: 0.6 }}
                  className="text-5xl md:text-7xl lg:text-8xl italic font-headline leading-[1.05]"
                >
                  {heroSlides[activeSlide].titleTop}
                  <br />
                  {heroSlides[activeSlide].titleBottom}
                </motion.h1>
              </AnimatePresence>
              <button className="mt-8 px-8 h-12 rounded-full border border-white/30 hover:bg-white hover:text-black transition-colors text-xs tracking-[0.25em] uppercase">
                Mua ngay
              </button>
              <div className="mt-8 flex items-center justify-center gap-2">
                {heroSlides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveSlide(i)}
                    className={`h-1.5 rounded-full transition-all ${i === activeSlide ? "w-10 bg-white" : "w-5 bg-white/35"
                      }`}
                  />
                ))}
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="relative floating-soft h-[360px] md:h-[470px] rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm overflow-hidden"
            >
              <img src="/hero_product_2_1775105990450.png" alt="Hero Product 2" className="absolute inset-0 w-full h-full object-cover" />
            </motion.div>
          </div>
        </div>
        <div className="marquee-strip border-y border-white/10 text-white/70 text-xs tracking-[0.35em] uppercase py-3">
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
      </section>

      <section className="py-20 md:py-24">
        <div className="max-w-[1320px] mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <h2 className="text-4xl md:text-6xl italic font-headline">Sản Phẩm Nổi Bật</h2>
            <p className="max-w-md text-sm text-black/60">
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[1, 2, 3].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.01 }}
                className="placeholder-shimmer aspect-[4/5] rounded-2xl border border-black/10 bg-gradient-to-b from-[#ece8df] to-[#ddd7cd] grid place-items-center text-black/35 text-xs tracking-[0.2em] uppercase"
              >
                Empty Product Photo
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#f4f4f4]">
        <div className="max-w-[1320px] mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between">
            <h2 className="text-[40px] md:text-[46px] font-headline mb-2">Nhóm Hương</h2>
            <div className="hidden md:flex gap-2 text-xs text-black/40">
              <button
                className="w-6 h-6 border border-black/15 rounded-full"
                onClick={() => setNoteStart((prev) => (prev - 1 + noteGroups.length) % noteGroups.length)}
              >
                ‹
              </button>
              <button
                className="w-6 h-6 border border-black/15 rounded-full"
                onClick={() => setNoteStart((prev) => (prev + 1) % noteGroups.length)}
              >
                ›
              </button>
            </div>
          </div>
          <div className="w-12 h-[2px] bg-[#9ad9d6] mb-8" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {getWindowedItems(noteGroups, noteStart, 6).map((note, index) => (
              <motion.div key={`${note}-${index}`} layout className="bg-white border border-black/10 p-3 hover:-translate-y-1 transition-transform">
                <div className="placeholder-shimmer h-[140px] bg-[#f1f1f1] grid place-items-center text-[10px] tracking-[0.2em] uppercase text-black/35">
                  Empty
                </div>
                <p className="text-center mt-3 text-sm">{note}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#f4f4f4]">
        <div className="max-w-[1320px] mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-[40px] md:text-[46px] font-headline">Nước Hoa Nam</h2>
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
                <p className="text-xl tracking-[0.15em] uppercase">Giảm đến 30%</p>
                <button className="mt-3 border border-black/60 h-8 px-4 text-[10px] uppercase tracking-[0.2em]">Mua ngay</button>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {getWindowedItems(menProducts, menStart, 4).map((name, index) => (
                <motion.article
                  key={`${name}-${index}`}
                  layout
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25 }}
                  className="bg-[#f6f6f6] p-3 group"
                >
                  <div className="relative placeholder-shimmer h-[210px] bg-[#ececec] grid place-items-center text-[10px] tracking-[0.2em] uppercase text-black/35 overflow-hidden">
                    Product Empty
                    <div className="absolute top-0 right-0 w-12 h-12 bg-[#df3153] text-white text-[9px] grid place-items-center rotate-45 translate-x-6 -translate-y-6">
                      -8%
                    </div>
                    <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="h-7 px-3 rounded-full bg-black text-white text-[10px] uppercase tracking-[0.15em]">
                        Xem
                      </button>
                    </div>
                  </div>
                  <p className="mt-3 text-sm">{name}</p>
                  <p className="text-xs text-[#FE7200]">700.000₫ <span className="line-through text-black/50">900.000₫</span></p>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#f4f4f4]">
        <div className="max-w-[1320px] mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-[40px] md:text-[46px] font-headline">Nước Hoa Nữ</h2>
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
                <p className="text-xl tracking-[0.15em] uppercase">Giảm đến 30%</p>
                <button className="mt-3 border border-black/60 h-8 px-4 text-[10px] uppercase tracking-[0.2em]">Mua ngay</button>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {getWindowedItems(womenProducts, womenStart, 4).map((name, index) => (
                <motion.article
                  key={`${name}-${index}`}
                  layout
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25 }}
                  className="bg-[#f6f6f6] p-3 group"
                >
                  <div className="relative placeholder-shimmer h-[210px] bg-[#ececec] grid place-items-center text-[10px] tracking-[0.2em] uppercase text-black/35 overflow-hidden">
                    Product Empty
                    <div className="absolute top-0 right-0 w-12 h-12 bg-[#df3153] text-white text-[9px] grid place-items-center rotate-45 translate-x-6 -translate-y-6">
                      -8%
                    </div>
                    <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="h-7 px-3 rounded-full bg-black text-white text-[10px] uppercase tracking-[0.15em]">
                        Xem
                      </button>
                    </div>
                  </div>
                  <p className="mt-3 text-sm">{name}</p>
                  <p className="text-xs text-[#FE7200]">800.000₫ <span className="line-through text-black/50">990.000₫</span></p>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-[1320px] mx-auto px-4 md:px-8">
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-6xl italic font-headline">Gợi Ý Cho Bạn</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <motion.article
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <Link to={`/product/${product.id}`} className="block">
                  <div className="placeholder-shimmer aspect-square rounded-xl bg-[#f3efe8] border border-black/10 grid place-items-center text-black/30 text-[11px] tracking-[0.18em] uppercase transition-transform duration-500 group-hover:scale-[1.02]">
                    Product Image Empty
                  </div>
                  <div className="pt-4 flex items-center justify-between gap-2">
                    <h3 className="text-base italic font-headline">{product.name}</h3>
                    <span className="text-sm text-[#FE7200]">890.000₫</span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#141414] text-white">
        <div className="max-w-[1320px] mx-auto px-4 md:px-8">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-[0.3em] text-white/55 mb-3">Ưu đãi trong tuần</p>
            <h2 className="text-3xl md:text-5xl italic font-headline">Đếm Ngược Khuyến Mãi</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {deals.map((deal, index) => {
              const t = getTimeParts(dealCountdowns[index].total);
              return (
                <div key={deal} className="rounded-2xl border border-white/15 bg-white/5 p-4">
                  <div className="placeholder-shimmer rounded-xl border border-white/10 h-[150px] mb-4 grid place-items-center text-[10px] tracking-[0.2em] uppercase text-white/45">
                    Deal Image Empty
                  </div>
                  <h3 className="text-2xl italic font-headline mb-3">{deal}</h3>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { label: "D", value: t.days },
                      { label: "H", value: t.hours },
                      { label: "M", value: t.mins },
                      { label: "S", value: t.secs },
                    ].map((time) => (
                      <div key={`${deal}-${time.label}`} className="rounded-lg border border-white/15 py-2 text-center">
                        <p className="text-lg font-semibold">{String(time.value).padStart(2, "0")}</p>
                        <p className="text-[10px] text-white/60">{time.label}</p>
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
            <h2 className="text-4xl md:text-6xl italic font-headline">Sản Phẩm Đa Dạng</h2>
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
              <motion.article key={product.id} layout className="group">
                <div className="w-full text-left relative">
                  <Link to={`/product/${product.id}`} className="block">
                    <div className="placeholder-shimmer aspect-square rounded-xl bg-[#f3efe8] border border-black/10 grid place-items-center text-black/30 text-[11px] tracking-[0.18em] uppercase">
                      Product Image Empty
                    </div>
                    <div className="pt-4 flex items-center justify-between gap-2">
                      <h3 className="text-base italic font-headline">{product.name}</h3>
                      <span className="text-sm text-[#FE7200]">790.000₫</span>
                    </div>
                  </Link>
                  <button
                    onClick={() => {
                      setQuickView(product.name);
                      setSelectedVariant(productVariants[1]);
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

      <section className="py-20 md:py-24 bg-[#efebe4]">
        <div className="max-w-[1320px] mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-5">
            <p className="text-xs tracking-[0.3em] uppercase text-black/60">Banner Bộ Sưu Tập</p>
            <h2 className="text-4xl md:text-6xl italic font-headline">Hương Thơm Tinh Tế Cho Phong Cách Hiện Đại</h2>
            <button className="px-7 h-11 rounded-full border border-black/25 text-xs tracking-[0.22em] uppercase hover:bg-black hover:text-white transition-colors">
              Xem bộ sưu tập
            </button>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-black/10 bg-[#e4ddd2] grid place-items-center text-black/35 text-xs tracking-[0.2em] uppercase"
          >
            <img src="/collection_banner_1775105686852.png" alt="Collection Banner" className="absolute inset-0 w-full h-full object-cover" />
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-[1320px] mx-auto px-4 md:px-8">
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-6xl italic font-headline">Kinh Nghiệm</h2>
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
                <div className="placeholder-shimmer aspect-[16/10] bg-[#ece6db] grid place-items-center text-black/30 text-xs tracking-[0.2em] uppercase">
                  Blog Image Empty
                </div>
                <div className="p-5 space-y-3">
                  <p className="text-xs uppercase tracking-[0.2em] text-black/45">Tháng 3, 2026</p>
                  <h3 className="text-2xl italic font-headline">Cách chọn mùi hương đặc trưng của bạn</h3>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#111] text-white">
        <div className="max-w-[820px] mx-auto px-4 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-white/55 mb-5">Bản Tin</p>
          <h2 className="text-4xl md:text-6xl italic font-headline mb-8">Tham gia cộng đồng yêu hương thơm</h2>
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
              <div className="placeholder-shimmer rounded-xl border border-black/10 bg-[#f3efe8] min-h-[280px] grid place-items-center text-black/35 text-xs tracking-[0.2em] uppercase">
                Quick View Image Empty
              </div>
              <div className="flex flex-col">
                <p className="text-xs uppercase tracking-[0.2em] text-black/45">Xem Nhanh</p>
                <h3 className="text-3xl italic font-headline mt-2">{quickView}</h3>
                <p className="mt-3 text-black/65 text-sm">Mô phỏng popup quick view theo mẫu, phần hình sản phẩm để trống đúng yêu cầu.</p>
                <p className="mt-4 text-xl text-[#FE7200]">790.000₫</p>
                <div className="mt-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-black/50 mb-2">Dung Tích</p>
                  <div className="flex gap-2">
                    {productVariants.map((variant) => (
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
                <button className="mt-auto h-11 rounded-full bg-black text-white text-xs uppercase tracking-[0.2em]">
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
              <h3 className="text-3xl md:text-4xl italic font-headline">Giảm 10% cho đơn hàng đầu tiên</h3>
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
