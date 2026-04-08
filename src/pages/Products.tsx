import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const categories = ["All Products", "Perfume", "Body Lotion", "Scented Candles", "Gift Sets"];
const sortOptions = ["Featured", "Best Selling", "Price: Low to High", "Price: High to Low", "Newest"];

const allProducts = [
  { id: "kivra-solen", name: "Kivra Solen", price: "$70.00", oldPrice: "$80.00", tag: "Sale", category: "Perfume", image: "https://images.unsplash.com/photo-1585232351009-aa87416fca90?auto=format&fit=crop&q=80&w=600" },
  { id: "sea-memory", name: "Sea Memory", price: "$65.00", oldPrice: null, tag: "New", category: "Perfume", image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=600" },
  { id: "noir-garden", name: "Noir Garden", price: "$75.00", oldPrice: "$90.00", tag: "Hot", category: "Perfume", image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=600" },
  { id: "amber-dust", name: "Amber Dust", price: "$80.00", oldPrice: null, tag: null, category: "Scented Candles", image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=600" },
  { id: "velvet-bloom", name: "Velvet Bloom", price: "$72.00", oldPrice: null, tag: "New", category: "Body Lotion", image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=600" },
  { id: "silk-vanilla", name: "Silk Vanilla", price: "$55.00", oldPrice: "$65.00", tag: "Sale", category: "Body Lotion", image: "https://images.unsplash.com/photo-1557170334-a9632e77c6e4?auto=format&fit=crop&q=80&w=600" },
  { id: "shadow-musk", name: "Shadow Musk", price: "$85.00", oldPrice: null, tag: null, category: "Perfume", image: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&q=80&w=600" },
  { id: "white-fig", name: "White Fig", price: "$68.00", oldPrice: null, tag: null, category: "Scented Candles", image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=600" },
];

const Products = () => {
  const [activeCategory, setActiveCategory] = useState("All Products");
  const [sortBy, setSortBy] = useState("Featured");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(allProducts);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let result = [...allProducts];
    if (activeCategory !== "All Products") {
      result = result.filter(p => p.category === activeCategory);
    }
    
    // Simple sorting logic
    if (sortBy === "Price: Low to High") {
      result.sort((a, b) => parseFloat(a.price.slice(1)) - parseFloat(b.price.slice(1)));
    } else if (sortBy === "Price: High to Low") {
      result.sort((a, b) => parseFloat(b.price.slice(1)) - parseFloat(a.price.slice(1)));
    }
    
    setFilteredProducts(result);
  }, [activeCategory, sortBy]);

  return (
    <main className="bg-white min-h-screen pt-[100px] pb-24 font-body">
      {/* Page Header / Hero */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden mb-12">
        <img 
          src="https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=1920" 
          alt="Products Header" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative text-center text-white px-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-headline text-5xl md:text-7xl italic mb-4"
          >
            Our Collection
          </motion.h1>
          <nav className="flex justify-center items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/80">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span className="text-[8px]">/</span>
            <span>Products</span>
          </nav>
        </div>
      </section>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Toolbar: Category Filter & Sort */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16 pb-8 border-b border-gray-100">
          <div className="flex flex-wrap justify-center md:justify-start gap-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-[11px] uppercase tracking-[0.2em] transition-all relative ${
                  activeCategory === cat ? "text-primary font-bold" : "text-primary-deep/40 hover:text-primary"
                }`}
              >
                {cat}
                {activeCategory === cat && (
                  <motion.div layoutId="cat-underline" className="absolute -bottom-2 left-0 right-0 h-[2px] bg-primary" />
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <div className="relative group">
              <span className="text-[10px] uppercase tracking-widest text-primary-deep/40 mr-2">Sort by:</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-[11px] uppercase tracking-widest font-bold text-primary-deep outline-none cursor-pointer border-none p-0 focus:ring-0"
              >
                {sortOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 text-[11px] uppercase tracking-widest font-bold text-primary-deep hover:text-primary transition-colors lg:hidden"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
              Filter
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, idx) => (
              <motion.div 
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="group cursor-pointer"
              >
                <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-white mb-6 relative shadow-sm border border-gray-100">
                  {product.tag && (
                    <span className="absolute top-4 left-4 bg-primary text-white text-[9px] uppercase tracking-widest px-3 py-1 rounded-full z-10 font-bold">
                      {product.tag}
                    </span>
                  )}
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                    <Link 
                      to={`/product/${product.id}`}
                      className="px-8 py-3 bg-white text-primary-deep text-[10px] uppercase tracking-[0.2em] font-bold rounded-full transform scale-90 group-hover:scale-100 transition-all shadow-lg"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
                <div className="text-center">
                  <h4 className="font-headline text-2xl text-primary-deep italic mb-2">{product.name}</h4>
                  <div className="flex items-center justify-center gap-3">
                    <span className="text-sm font-body text-primary-deep font-bold">{product.price}</span>
                    {product.oldPrice && <span className="text-xs text-primary-deep/40 line-through">{product.oldPrice}</span>}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* No Results State */}
        {filteredProducts.length === 0 && (
          <div className="py-24 text-center">
            <h3 className="font-headline text-3xl italic text-primary-deep/40">No products found in this category</h3>
          </div>
        )}

        {/* Pagination */}
        <div className="mt-24 flex justify-center items-center gap-4">
          <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-primary-deep/40 hover:border-primary hover:text-primary transition-all">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="text-[11px] font-bold uppercase tracking-widest text-primary-deep">Page 1 of 1</span>
          <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-primary-deep/40 hover:border-primary hover:text-primary transition-all">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </main>
  );
};

export default Products;
