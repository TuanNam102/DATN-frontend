import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import MegaMenu from "./MegaMenu";

const navLinks = [
  { name: "Home", path: "/", megaMenuType: "home" },
  { name: "Shops", path: "/products", megaMenuType: "shop" },
  { name: "Products", path: "/products", megaMenuType: "products" },
  { name: "Blog", path: "/blogs/news" },
  { name: "Pages", path: "/pages/about" },
];

interface NavbarProps {
  toggleCart: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleCart }) => {
  const [isSticky, setIsSticky] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Sticky header logic
      setIsSticky(currentScrollY > 100);

      // Show/Hide header on scroll logic
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

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } ${
        isSticky ? "bg-white shadow-md py-2" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-3 items-center">
          {/* Left: Navigation Menu */}
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                <Link 
                  to={link.path}
                  className="text-[13px] uppercase tracking-[0.15em] font-body font-medium text-primary-deep hover:text-primary transition-colors py-6"
                >
                  {link.name}
                </Link>
                {link.megaMenuType && <MegaMenu type={link.megaMenuType as "home" | "shop" | "products"} />}
              </div>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="text-primary-deep p-2"
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
                src="https://borcen-store-newdemo.myshopify.com/cdn/shop/files/logo.png?v=1756868887" 
                alt="Borcen Logo" 
                className={`transition-all duration-500 ${isSticky ? "h-10" : "h-14"}`}
              />
            </Link>
          </div>

          {/* Right: Utilities */}
          <div className="flex items-center justify-end gap-4 md:gap-6">
            <button className="text-primary-deep hover:text-primary transition-colors hidden md:block">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <Link to="/login" className="text-primary-deep hover:text-primary transition-colors hidden md:block">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </Link>
            <Link to="/wishlist" className="text-primary-deep hover:text-primary transition-colors relative">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span className="absolute -top-1.5 -right-1.5 bg-primary text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">0</span>
            </Link>
            <button onClick={toggleCart} className="text-primary-deep hover:text-primary transition-colors relative group">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="absolute -top-1.5 -right-1.5 bg-primary text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">0</span>
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
              className="fixed top-0 left-0 bottom-0 w-[320px] bg-white z-[120] lg:hidden p-8 flex flex-col shadow-2xl"
            >
              <div className="flex items-center justify-between mb-12">
                <img 
                  src="https://borcen-store-newdemo.myshopify.com/cdn/shop/files/logo.png?v=1756868887" 
                  alt="Logo" 
                  className="h-10" 
                />
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-primary-deep"
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
                    className="text-xl font-headline italic text-primary-deep hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto pt-8 border-t border-gray-100 space-y-4">
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 text-sm font-body tracking-widest uppercase text-primary-deep/60">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Login
                </Link>
                <div className="text-[10px] text-primary-deep/40 uppercase tracking-[0.2em]">
                  &copy; 2026 Borcen Store. All rights reserved.
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
