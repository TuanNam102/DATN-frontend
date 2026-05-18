import React from "react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../../services/productService";
import type { Product } from "../../types";

const OurProductSection = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProducts({ limit: 3 });
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching our products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section className="py-16 md:py-24 bg-white">
      {/* Header row */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-8 md:mb-12">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 md:gap-12">
          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-5xl lg:text-6xl font-custom italic"
          >
            Our Product
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-sm md:text-base text-gray-600 max-w-sm md:pt-2"
          >
            Dive into the world of perfumes with exclusive scents, community vibes, and premium collections.
          </motion.p>
        </div>
      </div>

      {/* Product images - full width, no gaps */}
      <div className="grid grid-cols-3 min-h-[400px]">
        {loading ? (
          [1, 2, 3].map(item => (
            <div key={item} className="aspect-[4/3] bg-gray-50 placeholder-shimmer" />
          ))
        ) : (
          products.map((product, index) => {
            const getAnimation = () => {
              if (index === 0) {
                return {
                  initial: { opacity: 0, rotate: -5, scale: 0.95 },
                  whileInView: { opacity: 1, rotate: 0, scale: 1 },
                };
              }
              if (index === 2) {
                return {
                  initial: { opacity: 0, rotate: 5, scale: 0.95 },
                  whileInView: { opacity: 1, rotate: 0, scale: 1 },
                };
              }
              return {
                initial: { opacity: 0, y: 30 },
                whileInView: { opacity: 1, y: 0 },
              };
            };

            const animation = getAnimation();

            return (
              <motion.div
                key={product._id}
                {...animation}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3 + index * 0.1 }}
                className="group relative aspect-[4/3] overflow-hidden cursor-pointer"
              >
                <Link to={`/product/${product._id}`} className="block w-full h-full">
                  <img
                    src={product.images[0] || "https://via.placeholder.com/800"}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  <h3 className="absolute bottom-4 left-4 text-lg md:text-xl font-custom text-white z-10 drop-shadow-md">
                    {product.name}
                  </h3>
                </Link>
              </motion.div>
            );
          })
        )}
      </div>
    </section>
  );
};

export default OurProductSection;
