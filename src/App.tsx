import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import MobileNavbar from "./components/common/MobileNavbar";
import CartDrawer from "./components/common/CartDrawer";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Products from "./pages/Products";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Wishlist from "./pages/Wishlist";
import Blog from "./pages/Blog";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./admin/AdminDashboard";

const AppContent = () => {
  const location = useLocation();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const isAdminRoute = location.pathname.startsWith("/admin");

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div className="monochrome-gradient font-body selection:bg-black selection:text-white overflow-x-hidden min-h-screen">
      {!isAdminRoute && <Navbar toggleCart={toggleCart} />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/blogs/news" element={<Blog />} />
        <Route path="/pages/about" element={<About />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/*" element={<AdminDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <MobileNavbar />}
      {!isAdminRoute && <CartDrawer isOpen={isCartOpen} onClose={toggleCart} />}
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
