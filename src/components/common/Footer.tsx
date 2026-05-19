import React from "react";
import { Link } from "react-router-dom";

const footerLinks = [
  {
    title: "Về Aventis",
    links: [
      { name: "Câu chuyện của chúng tôi", path: "/pages/about" },
      { name: "Ghé thăm cửa hàng", path: "/pages/contact" },
      { name: "Liên hệ", path: "/pages/contact" },
      { name: "Tài khoản", path: "/login" },
    ],
  },
  {
    title: "Liên kết nhanh",
    links: [
      { name: "Trang chủ", path: "/" },
      { name: "Cửa hàng", path: "/collections/all" },
      { name: "Sản phẩm", path: "/products" },
      { name: "Thương hiệu", path: "/products" },
    ],
  },
  {
    title: "Thông tin",
    links: [
      { name: "Chính sách bảo mật", path: "/pages/privacy-policy" },
      { name: "Chính sách hoàn tiền", path: "/pages/refund-policy" },
      { name: "Chính sách vận chuyển", path: "/pages/shipping-policy" },
      { name: "Điều khoản dịch vụ", path: "/pages/terms-of-service" },
    ],
  },
];

const instagramImages = [
  "https://borcen-store-newdemo.myshopify.com/cdn/shop/files/instagram1.jpg?v=1756450982",
  "https://borcen-store-newdemo.myshopify.com/cdn/shop/files/instagram2.jpg?v=1756450982",
  "https://borcen-store-newdemo.myshopify.com/cdn/shop/files/instagram3.jpg?v=1756450982",
  "https://borcen-store-newdemo.myshopify.com/cdn/shop/files/instagram4.jpg?v=1756450982",
  "https://borcen-store-newdemo.myshopify.com/cdn/shop/files/instagram5.jpg?v=1756450982",
  "https://borcen-store-newdemo.myshopify.com/cdn/shop/files/instagram6.jpg?v=1756450982",
];

const Footer = () => {
  return (
    <footer className="bg-[#111111] border-t border-white/10">
      {/* Instagram Feed */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[10px] uppercase tracking-[0.2em] font-medium text-white/60">Instagram</h2>
          <a href="#" className="text-[10px] uppercase tracking-[0.15em] text-white/40 hover:text-[#F37021] transition-colors">@AventisStore</a>
        </div>
        <div className="grid grid-cols-6 gap-1.5">
          {instagramImages.map((img, idx) => (
            <div key={idx} className="h-[100px] rounded overflow-hidden group cursor-pointer">
              <img 
                src={img} 
                alt={`Instagram ${idx}`} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-70 group-hover:opacity-100" 
              />
            </div>
          ))}
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="border-t border-white/5">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-7 grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-3">
            <Link to="/">
              <span className="font-heading font-medium text-white text-base tracking-[0.15em]">AVENTIS</span>
            </Link>
            <p className="text-[11px] text-white/35 leading-relaxed max-w-[200px]">
              Trải nghiệm tinh hoa sang trọng với bộ sưu tập nước hoa cao cấp.
            </p>
            <div className="flex gap-2">
              {['facebook', 'twitter', 'instagram', 'pinterest'].map((social) => (
                <a key={social} href="#" className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center hover:border-[#F37021] hover:text-[#F37021] transition-all text-white/35">
                  <i className={`fab fa-${social} text-[10px]`}></i>
                </a>
              ))}
            </div>
          </div>

          {footerLinks.map((column) => (
            <div key={column.title}>
              <h3 className="text-[10px] uppercase tracking-[0.2em] font-medium text-white/60 mb-3">{column.title}</h3>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className="text-[11px] text-white/35 hover:text-[#F37021] transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/5">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-4 flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="text-[10px] text-white/25 tracking-wide">
            &copy; 2026 Aventis Store. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link to="/privacy" className="text-[10px] text-white/25 hover:text-white/50 transition-colors">Privacy</Link>
            <Link to="/terms" className="text-[10px] text-white/25 hover:text-white/50 transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
