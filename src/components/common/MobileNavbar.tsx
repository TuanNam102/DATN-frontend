import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const MobileNavbar = () => (
  <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#111]/95 backdrop-blur-lg border-t border-white/10">
    <div className="h-[64px] grid grid-cols-4 text-white/70 text-[10px] uppercase tracking-[0.2em]">
      <Link to="/" className="flex flex-col items-center justify-center hover:text-white transition-colors">
        <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        Trang chủ
      </Link>
      <Link to="/products" className="flex flex-col items-center justify-center hover:text-white transition-colors">
        <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        Cửa hàng
      </Link>
      <button className="flex flex-col items-center justify-center hover:text-white transition-colors">
        <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        Tìm kiếm
      </button>
      <button className="flex flex-col items-center justify-center hover:text-white transition-colors">
        <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
        Yêu thích
      </button>
    </div>
  </nav>
);

export default MobileNavbar;
