import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Sandalwood",
    alt: "Sandalwood fragrance bottle",
    image: "https://borcen-store-newdemo.myshopify.com/cdn/shop/files/b9-1.jpg?v=1756866376",
  },
  {
    id: 2,
    name: "Lavender",
    alt: "Lavender fragrance bottle",
    image: "https://borcen-store-newdemo.myshopify.com/cdn/shop/files/b9-3.jpg?v=1756866375",
  },
  {
    id: 3,
    name: "Jasmine",
    alt: "Jasmine fragrance bottle",
    image: "https://borcen-store-newdemo.myshopify.com/cdn/shop/files/b9-2.jpg?v=1756866375",
  },
];

const OurProductSection = () => {
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
            Dive into the world of golf with exclusive events, community vibes, and beginner-friendly resources.
          </motion.p>
        </div>
      </div>

      {/* Product images - full width, no gaps */}
      <div className="grid grid-cols-3">
        {products.map((product, index) => {
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
              key={product.id}
              {...animation}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 + index * 0.1 }}
              className="group relative aspect-[4/3] overflow-hidden cursor-pointer"
            >
              <Link to={`/product/${product.id}`} className="block w-full h-full">
                <img
                  src={product.image}
                  alt={product.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                <h3 className="absolute bottom-4 left-4 text-lg md:text-xl font-custom text-white z-10 drop-shadow-md">
                  {product.name}
                </h3>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
);
};

export default OurProductSection;
