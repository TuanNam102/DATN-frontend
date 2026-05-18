import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import MegaMenu from "./MegaMenu";
import { logout } from "../../services/authService";

const navLinks = [
  { name: "Trang chủ", path: "/", megaMenuType: "home" },
  { name: "Thương hiệu", path: "/products", megaMenuType: "brands" },
  { name: "Nước hoa", path: "/products", megaMenuType: "perfumes" },
  { name: "Nước hoa chiết", path: "/products", megaMenuType: "decants" },
  { name: "Liên hệ", path: "/pages/contact" },
];

interface NavbarProps {
  toggleCart: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleCart }) => {
  const [isSticky, setIsSticky] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [cartCount, setCartCount] = useState(0);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const navigate = useNavigate();

  const updateCartCount = () => {
    const cartData = localStorage.getItem("cart");
    if (cartData) {
      const cart = JSON.parse(cartData);
      const count = cart.reduce((acc: number, item: any) => acc + item.quantity, 0);
      setCartCount(count);
    } else {
      setCartCount(0);
    }
  };

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
    updateCartCount();

    window.addEventListener("cartUpdated", updateCartCount);
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsSticky(currentScrollY > 100);
      if (currentScrollY > lastScrollY.current && currentScrollY > 200) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    localStorage.removeItem("user");
    setUser(null);
    setIsUserMenuOpen(false);
    navigate("/login");
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ease-in-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } ${
        isSticky 
          ? "bg-black/30 backdrop-blur-md border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)] py-5" 
          : "bg-gradient-to-b from-black/50 to-transparent py-10"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between lg:grid lg:grid-cols-[1fr_auto_1fr]">
          {/* Left: Navigation Menu */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-10">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                <Link 
                  to={link.path}
                  className="relative whitespace-nowrap text-[10px] uppercase tracking-[0.25em] font-body font-light text-white/90 hover:text-white transition-all duration-300 py-6 after:absolute after:bottom-4 after:left-0 after:w-0 after:h-[1px] after:bg-white after:transition-all after:duration-300 hover:after:w-full opacity-90 hover:opacity-100"
                >
                  {link.name}
                </Link>
                {link.megaMenuType && <MegaMenu type={link.megaMenuType as "home" | "brands" | "perfumes" | "decants"} />}
              </div>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="text-white p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Center: Logo */}
          <div className="flex justify-center">
            <Link to="/" className="block">
              <img 
                src="/logo_AVENTIS.png" 
                alt="Aventis Logo" 
                className={`transition-all duration-700 object-contain hover:scale-105 ${isSticky ? "h-12" : "h-16"}`}
              />
            </Link>
          </div>

          {/* Right: Utilities */}
          <div className="flex items-center justify-end gap-8 md:gap-14">
            <button className="text-white/90 hover:text-white transition-all duration-300 hover:scale-110 hidden md:block group">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            
            <div className="relative">
              {user ? (
                <button 
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="text-white/80 hover:text-white transition-all duration-300 hover:scale-105 flex items-center gap-3 text-[12px] tracking-[0.15em] font-extralight group"
                >
                  <span className="hidden md:block capitalize">{(user?.name || user?.username || 'User').split(' ')[0].toLowerCase()}</span>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </button>
              ) : (
                <Link to="/login" className="text-white/90 hover:text-white transition-all duration-300 hover:scale-110 hidden md:block group">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </Link>
              )}
              
              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-4 w-48 bg-white shadow-2xl py-3 rounded-xl border border-black/5"
                  >
                    <Link to="/profile" className="block px-5 py-2.5 text-[13px] font-body text-black/70 hover:text-black hover:bg-black/5 transition-colors">Trang cá nhân</Link>
                    {user?.isAdmin && (
                      <a href="http://localhost:5000/admin" className="block px-5 py-2.5 text-[13px] font-body text-black/70 hover:text-black hover:bg-black/5 transition-colors">Quản trị viên</a>
                    )}
                    <button 
                      onClick={handleLogout}
                      className="w-full text-left px-5 py-2.5 text-[13px] font-body text-red-500 hover:bg-red-50 transition-colors"
                    >
                      Đăng xuất
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/wishlist" className="text-white/90 hover:text-white transition-all duration-300 hover:scale-110 relative group">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span className="absolute -top-2 -right-2 bg-[#F37021] text-white text-[10px] font-medium w-5 h-5 rounded-full flex items-center justify-center border border-white/20 shadow-sm">0</span>
            </Link>
            <button onClick={toggleCart} className="text-white/90 hover:text-white transition-all duration-300 hover:scale-110 relative group">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#F37021] text-white text-[10px] font-medium w-5 h-5 rounded-full flex items-center justify-center border border-white/20 shadow-sm transition-transform">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/40 z-[110] backdrop-blur-sm lg:hidden"
            />
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[320px] bg-[#F37021] z-[120] lg:hidden p-8 flex flex-col shadow-2xl"
            >
              <div className="flex items-center justify-between mb-12">
                <img 
                  src="/logo_AVENTIS.png" 
                  alt="Aventis Logo" 
                  className="h-10" 
                />
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-white"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <nav className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <Link 
                    key={link.name} 
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-xl font-heading font-medium italic text-white hover:text-black transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto pt-8 border-t border-gray-100 space-y-4">
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 text-sm font-body tracking-widest uppercase text-white hover:text-black transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Đăng nhập
                </Link>
                <div className="text-[10px] text-white/40 uppercase tracking-[0.2em]">
                  &copy; 2026 Aventis Store. All rights reserved.
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
