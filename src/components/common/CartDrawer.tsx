import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { getProducts } from "../../services/productService";
import { formatPrice } from "../../utils/format";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [recommendedProducts, setRecommendedProducts] = useState<any[]>([]);

  const loadCart = () => {
    const cartData = localStorage.getItem("cart");
    if (cartData) {
      setCartItems(JSON.parse(cartData));
    } else {
      setCartItems([]);
    }
  };

  useEffect(() => {
    loadCart();
    window.addEventListener("cartUpdated", loadCart);
    return () => window.removeEventListener("cartUpdated", loadCart);
  }, []);

  const removeFromCart = (productId: string, size: string) => {
    const newCart = cartItems.filter(item => !(item.product._id === productId && item.size === size));
    localStorage.setItem("cart", JSON.stringify(newCart));
    loadCart();
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const updateQuantity = (productId: string, size: string, delta: number) => {
    const newCart = cartItems.map(item => {
      if (item.product._id === productId && item.size === size) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    });
    localStorage.setItem("cart", JSON.stringify(newCart));
    loadCart();
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const total = cartItems.reduce((acc, item) => acc + (item.product.salePrice || item.product.price) * item.quantity, 0);

  useEffect(() => {
    const fetchRecommended = async () => {
      try {
        const res = await getProducts({ limit: 3 });
        setRecommendedProducts(res.data);
      } catch (error) {
        console.error("Error fetching recommended products:", error);
      }
    };
    if (isOpen) fetchRecommended();
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-[110] backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-[400px] bg-white z-[120] p-6 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <h2 className="text-xl font-heading font-medium italic text-primary-deep">Giỏ hàng</h2>
              <button onClick={onClose} className="text-primary-deep hover:text-primary transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Free Shipping Progress */}
            <div className="py-4 border-b border-gray-100 text-center text-sm text-primary-deep/70">
              <p>Chúc mừng! Đơn hàng của bạn được miễn phí giao hàng</p>
              {/* You can add a progress bar here if needed */}
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto py-4 custom-scrollbar">
              {cartItems.length > 0 ? (
                <div className="space-y-6">
                  {cartItems.map((item, idx) => (
                    <div key={`${item.product._id}-${item.size}-${idx}`} className="flex gap-4">
                      <div className="w-24 h-24 bg-gray-50 rounded-lg overflow-hidden shrink-0 border border-gray-100">
                        <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-1">
                          <Link to={`/product/${item.product._id}`} onClick={onClose} className="text-sm font-bold text-primary-deep hover:text-primary transition-colors line-clamp-2">
                            {item.product.name}
                          </Link>
                          <button 
                            onClick={() => removeFromCart(item.product._id, item.size)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-2">Size: {item.size}</p>
                        <div className="mt-auto flex items-center justify-between">
                          <div className="flex items-center border border-gray-100 rounded-md h-8 px-2 gap-3">
                            <button onClick={() => updateQuantity(item.product._id, item.size, -1)} className="text-gray-400 hover:text-primary">-</button>
                            <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.product._id, item.size, 1)} className="text-gray-400 hover:text-primary">+</button>
                          </div>
                          <span className="text-sm font-bold text-primary">
                            {formatPrice((item.product.salePrice || item.product.price) * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center py-10">
                  <svg className="w-20 h-20 text-primary-deep/20 mb-4" fill="currentColor" viewBox="0 0 32 32">
                    <path d="M31.71,15.29c-4.09-4.08-4-4.07-4.28-4.19l-7-3.19a1,1,0,1,0-.82,1.82l5,2.27L16,15.9,7.42,12l5-2.27a1,1,0,0,0-.82-1.82c-4.87,2.21-7.13,3.25-7,3.19-.24.12-.13.05-4.28,4.19a1,1,0,0,0,.3,1.62l11,5a1,1,0,0,0,1.12-.2L15,19.41v10L6,25.36V22a1,1,0,0,0-2,0c0,4.42,0,4.2.18,4.54a.6.6,0,0,0,.3.29c.1.07,0,.05.13.09C16.59,32.36,15.69,32,16,32s-.5.32,11.41-5.09A1,1,0,0,0,28,26V18.46l3.41-1.55A1,1,0,0,0,31.71,15.29ZM11.78,19.8l-9-4.11L5.22,13.2l9.05,4.11ZM26,25.36l-9,4.09v-10C19.46,21.87,19.45,22,20,22c.33,0,.07.07,6-2.63ZM20.22,19.8l-2.49-2.49,9.05-4.11,2.49,2.49Z"/><path d="M15,8.91a3.61,3.61,0,0,1,2-3.16,2,2,0,0,0,1-2.12,2,2,0,1,0-3.86,1,1,1,0,0,1-.6,1.27,1,1,0,0,1-1.28-.61,4,4,0,1,1,5.7,2.17A1.67,1.67,0,0,0,17,8.91,1,1,0,1,1,15,8.91Z"/><path d="M16,13a1,1,0,1,1,1-1A1,1,0,0,1,16,13Z"/>
                  </svg>
                  <h3 className="text-2xl font-heading font-medium italic text-primary-deep mb-2">Giỏ hàng của bạn đang trống</h3>
                  <p className="text-sm text-primary-deep/60 mb-6">Hãy khám phá thêm các bộ sưu tập hương thơm của chúng tôi và mua sắm nhé.</p>
                  <Link to="/products" onClick={onClose} className="px-8 py-3 bg-primary text-white text-xs uppercase tracking-widest font-bold rounded-full hover:bg-primary-dark transition-all">
                    Continue shopping
                  </Link>
                </div>
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="pt-6 border-t border-gray-100 space-y-4">
                <div className="flex items-center justify-between text-lg font-bold text-primary-deep uppercase tracking-widest">
                  <span>Tạm tính</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <p className="text-[10px] text-gray-400 text-center uppercase tracking-widest">Shipping, taxes, and discounts calculated at checkout.</p>
                <Link 
                  to="/checkout" 
                  onClick={onClose}
                  className="block w-full py-4 bg-primary text-white text-center text-xs uppercase tracking-[0.2em] font-bold rounded-lg hover:bg-primary-dark transition-all shadow-lg shadow-primary/20"
                >
                  Proceed to Checkout
                </Link>
              </div>
            )}

            {/* Recommended Products */}
            <div className="pt-6 border-t border-gray-100">
              <h5 className="text-sm font-bold uppercase tracking-widest text-primary-deep mb-4">You may also like</h5>
              <div className="space-y-4">
                {recommendedProducts.map((product) => (
                  <div key={product._id} className="flex gap-4 items-center">
                    <Link to={`/product/${product._id}`} onClick={onClose} className="w-20 h-20 shrink-0 rounded-lg overflow-hidden border border-gray-100">
                      <img src={product.images[0] || "https://via.placeholder.com/100"} alt={product.name} className="w-full h-full object-cover" />
                    </Link>
                    <div className="flex-1">
                      <Link to={`/product/${product._id}`} onClick={onClose} className="text-base font-heading font-medium italic text-primary-deep hover:text-primary transition-colors line-clamp-1">
                        {product.name}
                      </Link>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm font-body text-primary font-bold">{formatPrice(product.salePrice || product.price)}</span>
                      </div>
                      <button className="text-[10px] uppercase tracking-widest text-primary-deep/60 hover:text-primary transition-colors mt-2 font-bold">
                        + Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
