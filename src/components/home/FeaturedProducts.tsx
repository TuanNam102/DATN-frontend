import { motion } from "framer-motion";

const products = [
  { id: 1, name: "Kivra Solen", price: 89.99, salePrice: 69.99, badge: "Sale" },
  { id: 2, name: "Floral Essence", price: 79.99, salePrice: null, badge: null },
  { id: 3, name: "Ocean Breeze", price: 94.99, salePrice: 74.99, badge: "Sale" },
  { id: 4, name: "Midnight Rose", price: 84.99, salePrice: null, badge: "New" },
];

const FeaturedProducts = () => {
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
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                  Product Image
                </div>

                {product.badge && (
                  <div className="absolute top-4 left-4 px-3 py-1 bg-black text-white text-xs uppercase tracking-wider rounded">
                    {product.badge}
                  </div>
                )}

                <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-black hover:text-white transition-colors shadow-lg"
                    title="Add to Cart"
                  >
                    <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
                  </button>
                  <button
                    className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-black hover:text-white transition-colors shadow-lg"
                    title="Quick View"
                  >
                    <span className="material-symbols-outlined text-[18px]">visibility</span>
                  </button>
                  <button
                    className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-black hover:text-white transition-colors shadow-lg"
                    title="Add to Wishlist"
                  >
                    <span className="material-symbols-outlined text-[18px]">favorite</span>
                  </button>
                </div>
              </div>

              <div className="text-center">
                <h3 className="font-serif text-lg mb-2">{product.name}</h3>
                <div className="flex items-center justify-center gap-2">
                  {product.salePrice ? (
                    <>
                      <span className="text-gray-400 line-through">${product.price}</span>
                      <span className="text-black font-semibold">${product.salePrice}</span>
                    </>
                  ) : (
                    <span className="text-black font-semibold">${product.price}</span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
