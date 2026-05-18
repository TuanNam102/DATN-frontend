import React from "react";
import { motion } from "framer-motion";

const Hero = () => (
  <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0 z-0">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-dark/30 to-primary-deep/60"></div>
    </div>
    <div className="relative z-10 text-center px-6 max-w-5xl">
      <motion.div 
        className="mb-12"
        animate={{ translateY: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <img 
          alt="Chai nước hoa bay bổng" 
          className="h-[300px] md:h-[450px] mx-auto drop-shadow-[0_35px_35px_rgba(0,0,0,0.4)]" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVNfHGl0rVb2033OFKMPXWvbYy6V4S8-MlKlt72Y_HfP5BKlUNMkHQJUjcV3cUOKFURiQKlquZcQ1VMbTYIFEIVOgbYg0maNvnk-tC1JwkFgWmgTZy9c0x3zxoWk4k29I0Wm4o35b2EF40KiYVDbhaB4I3eBOI_KZ_uc8Fd7R9Tm_JzYbPFTK_pMuDuf89-lEb13QnmmpRB4CVrNTTYYdQveH9OE6XF-qIVvpNqG6wSY4hvomXUBqE3L4nDZPJpHW9irBJDlVq8Zc" 
        />
      </motion.div>
      <motion.div 
        className="space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <h2 className="font-label uppercase tracking-[0.5em] text-white/70 text-sm md:text-base">Kho lưu trữ Ánh Dương MMXXIV</h2>
        <h1 className="font-heading font-medium italic text-4xl md:text-9xl text-white tracking-tighter leading-none">
          Ấn phẩm Mùi hương
        </h1>
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-8">
          <button className="px-12 py-4 bg-white text-primary-deep font-label uppercase tracking-widest text-sm hover:bg-white/90 transition-all duration-500 rounded-full font-bold">
            Khám phá Velvet
          </button>
          <button className="px-12 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white font-label uppercase tracking-widest text-sm hover:bg-white/20 transition-all duration-500 rounded-full">
            Khám phá Di sản
          </button>
        </div>
      </motion.div>
    </div>
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-40">
      <span className="material-symbols-outlined animate-bounce">expand_more</span>
    </div>
  </section>
);

export default Hero;
