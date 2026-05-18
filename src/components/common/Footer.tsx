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
    <footer className="bg-[#F37021] pt-12 border-t border-gray-100">
      {/* Instagram Feed */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-heading font-medium text-2xl italic text-white">Instagram Feed</h2>
          <a href="#" className="text-[10px] uppercase tracking-widest border-b border-white pb-1 hover:text-black transition-colors text-white">Follow @AventisStore</a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {instagramImages.map((img, idx) => (
            <div key={idx} className="aspect-square rounded-2xl overflow-hidden group cursor-pointer">
              <img 
                src={img} 
                alt={`Instagram ${idx}`} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
            </div>
          ))}
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-gray-100">
        <div className="space-y-6">
          <Link to="/">
            <span className="font-heading font-medium italic text-white text-3xl">AVENTIS</span>
          </Link>
          <p className="text-xs text-white/60 leading-relaxed max-w-xs">
            Trải nghiệm tinh hoa sang trọng với bộ sưu tập nước hoa cao cấp của chúng tôi. 
            Được tạo ra cho những ai trân trọng vẻ đẹp vượt thời gian.
          </p>
          <div className="flex gap-3">
            {['facebook', 'twitter', 'instagram', 'pinterest'].map((social) => (
              <a key={social} href="#" className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-black hover:text-white transition-all text-white/60">
                <i className={`fab fa-${social} text-xs`}></i>
              </a>
            ))}
          </div>
        </div>

        {footerLinks.map((column) => (
          <div key={column.title}>
            <h3 className="text-[11px] uppercase tracking-[0.2em] font-bold text-white mb-6">{column.title}</h3>
            <ul className="space-y-3">
              {column.links.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-xs text-white/60 hover:text-black transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Copyright */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[10px] text-white/40 uppercase tracking-[0.2em]">
          &copy; 2026 Aventis Store. All rights reserved.
        </p>
        <div className="flex gap-6">
          <Link to="/privacy" className="text-[10px] text-white/40 uppercase tracking-[0.2em] hover:text-white transition-colors">Privacy</Link>
          <Link to="/terms" className="text-[10px] text-white/40 uppercase tracking-[0.2em] hover:text-white transition-colors">Terms</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
