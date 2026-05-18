import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import MobileNavbar from "./components/common/MobileNavbar";
import CartDrawer from "./components/common/CartDrawer";
import BackToTop from "./components/common/BackToTop";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Products from "./pages/Products";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Wishlist from "./pages/Wishlist";
import Blog from "./pages/Blog";
import About from "./pages/About";
import Contact from "./pages/Contact";
import GenderProducts from "./pages/GenderProducts";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import AdminDashboard from "./admin/AdminDashboard";

const PublicLayout = ({ toggleCart, isCartOpen }: { toggleCart: () => void, isCartOpen: boolean }) => (
  <div className="monochrome-gradient font-body selection:bg-black selection:text-white overflow-x-hidden min-h-screen">
    <Navbar toggleCart={toggleCart} />
    <Outlet />
    <Footer />
    <MobileNavbar />
    <CartDrawer isOpen={isCartOpen} onClose={toggleCart} />
    <BackToTop />
  </div>
);

const App = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout toggleCart={toggleCart} isCartOpen={isCartOpen} />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/blogs/news" element={<Blog />} />
          <Route path="/pages/about" element={<About />} />
          <Route path="/pages/contact" element={<Contact />} />
          <Route path="/collections/:gender" element={<GenderProducts />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        
        {/* Admin Route */}
        <Route path="/admin/*" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
