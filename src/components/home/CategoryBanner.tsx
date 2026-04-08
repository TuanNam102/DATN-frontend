import { motion } from "framer-motion";

const categories = [
  {
    id: 1,
    name: "Sandalwood",
    animationType: "rotate-left",
    image: "https://borcen-store-newdemo.myshopify.com/cdn/shop/files/b9-1.jpg?v=1756866376",
  },
  {
    id: 2,
    name: "Lavender",
    animationType: "fade",
    image: "https://borcen-store-newdemo.myshopify.com/cdn/shop/files/b9-3.jpg?v=1756866375",
  },
  {
    id: 3,
    name: "Jasmine",
    animationType: "rotate-left",
    image: "https://borcen-store-newdemo.myshopify.com/cdn/shop/files/b9-2.jpg?v=1756866375",
  },
];

const CategoryBanner = () => {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-5xl font-custom mb-4"
          >
            Our product
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-black/70 max-w-2xl mx-auto"
          >
            Dive into the world of golf with exclusive events, community vibes, and beginner-friendly resources.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {categories.map((category, index) => {
            const getAnimation = () => {
              if (category.animationType === "rotate-left") {
                return {
                  initial: { opacity: 0, rotate: -5, scale: 0.95 },
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
              <motion.a
                key={category.id}
                href="/collections/all"
                {...animation}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                className="group relative aspect-[4/3] overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 transition-transform duration-500 group-hover:scale-110">
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                    Product Image
                  </div>
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                <h4 className="absolute bottom-6 left-6 text-2xl font-custom text-black z-10">
                  {category.name}
                </h4>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoryBanner;
