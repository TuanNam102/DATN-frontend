import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    _id: 1,
    title: "Jasmine Fragrance",
    bgColor: "#000000",
    leftImage: "https://borcen-store-newdemo.myshopify.com/cdn/shop/files/s29-1_1.jpg?v=1756867089",
    rightImage: "https://borcen-store-newdemo.myshopify.com/cdn/shop/files/s29-1_2.jpg?v=1756867129",
  },
  {
    _id: 2,
    title: "Rose Fragrance",
    bgColor: "#000000",
    leftImage: "https://borcen-store-newdemo.myshopify.com/cdn/shop/files/s29-2_1.jpg?v=1756868462",
    rightImage: "https://borcen-store-newdemo.myshopify.com/cdn/shop/files/s29-1_2.jpg?v=1756867129",
  },
];

const HeroSlideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[900px] md:h-[900px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={slides[currentSlide]._id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 flex items-center justify-center"
          style={{ backgroundColor: slides[currentSlide].bgColor }}
        >
          <div className="relative h-full flex items-center justify-center">
            <div className="text-center z-10 px-6">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-6xl md:text-8xl font-custom text-white mb-8"
                style={{ fontWeight: 400 }}
              >
                {slides[currentSlide].title}
              </motion.h1>
              <motion.button
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="px-8 py-3 bg-[#4B47FF] text-white text-sm uppercase tracking-widest rounded-lg font-serif hover:bg-[#3B37EF] transition-colors"
              >
                shop now
              </motion.button>
            </div>

            {/* Left product image */}
            <motion.img
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.1 }}
              src={slides[currentSlide].leftImage}
              alt="Left product"
              className="absolute left-[5%] md:left-[10%] top-1/2 -translate-y-1/2 w-[200px] md:w-[350px] h-[224px] md:h-[393px] object-cover rounded-lg"
            />

            {/* Right product image */}
            <motion.img
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.1 }}
              src={slides[currentSlide].rightImage}
              alt="Right product"
              className="absolute right-[5%] md:right-[10%] top-1/2 -translate-y-1/2 w-[200px] md:w-[350px] h-[224px] md:h-[393px] object-cover rounded-lg"
            />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Pagination dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide ? "bg-white w-8" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlideshow;
