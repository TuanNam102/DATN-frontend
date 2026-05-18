import React from "react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../../services/productService";
import type { Product } from "../../types";
import { formatPrice } from "../../utils/format";

const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProducts({ limit: 4 });
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching featured products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-custom">Featured Products</h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
          {loading ? (
            [1, 2, 3, 4].map(item => (
              <div key={item} className="aspect-[3/4] rounded-2xl bg-gray-100 placeholder-shimmer" />
            ))
          ) : (
            products.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                className="group"
              >
                <Link to={`/product/${product._id}`} className="block">
                  <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-[#F9F9F9] mb-6 relative">
                    {product.isSale && (
                      <span className="absolute top-4 left-4 bg-primary text-white text-[10px] uppercase tracking-widest px-3 py-1 rounded-full z-10 font-bold">
                        Sale
                      </span>
                    )}
                    <img 
                      src={product.images[0] || "https://via.placeholder.com/400"} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                  </div>
                  <div className="text-center">
                    <h4 className="font-heading font-medium text-2xl text-primary-deep italic mb-2 group-hover:text-primary transition-colors">{product.name}</h4>
                    <div className="flex items-center justify-center gap-3">
                      <span className="text-sm font-body text-primary-deep font-bold">{formatPrice(product.salePrice || product.price)}</span>
                      {product.salePrice && product.salePrice < product.price && (
                        <span className="text-xs text-primary-deep/40 line-through">{formatPrice(product.price)}</span>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
