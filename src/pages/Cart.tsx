import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Cart = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const updateQuantity = (id: string, delta: number) => {
    const updatedItems = cartItems.map((item) =>
      item._id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    );
    setCartItems(updatedItems);
    localStorage.setItem("cart", JSON.stringify(updatedItems));
  };

  const removeItem = (id: string) => {
    const updatedItems = cartItems.filter((item) => item._id !== id);
    setCartItems(updatedItems);
    localStorage.setItem("cart", JSON.stringify(updatedItems));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <main className="bg-[#fcfcfc] min-h-screen pt-[140px] pb-24 font-body text-[#333]">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[13px] text-gray-500 mb-8">
          <Link to="/" className="hover:text-primary transition-colors">Trang chủ</Link>
          <span className="text-[10px] opacity-50">&gt;</span>
          <span className="text-primary font-medium">Giỏ hàng</span>
        </nav>

        <div className="bg-white rounded-sm border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h1 className="text-lg font-bold uppercase flex items-center gap-2">
              Giỏ hàng <span className="text-gray-400 normal-case font-normal">({cartItems.length} sản phẩm)</span>
            </h1>
          </div>

          {cartItems.length > 0 ? (
            <div className="p-6">
              <div className="flex flex-col lg:flex-row gap-12">
                {/* Cart Items List */}
                <div className="flex-1 space-y-8">
                  {cartItems.map((item) => (
                    <div key={item._id} className="flex gap-6 items-start pb-8 border-b border-gray-50 last:border-0 last:pb-0">
                      <div className="w-32 h-32 rounded border border-gray-100 p-2 shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col md:flex-row justify-between gap-4">
                          <div className="space-y-1">
                            <h3 className="font-medium text-[15px] leading-relaxed">
                              {item.name} - {item.variant} / {item.price.toLocaleString()}₫
                            </h3>
                            <p className="text-sm text-gray-500">Chiết 10ml</p>
                          </div>
                          
                          <div className="flex flex-col items-center gap-2">
                            <div className="flex items-center border border-gray-200 rounded">
                              <button 
                                onClick={() => updateQuantity(item._id, -1)}
                                className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 transition-colors border-r border-gray-200"
                              >
                                -
                              </button>
                              <span className="w-10 text-center text-sm">{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(item._id, 1)}
                                className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 transition-colors border-l border-gray-200"
                              >
                                +
                              </button>
                            </div>
                            <button 
                              onClick={() => removeItem(item._id)}
                              className="text-xs text-gray-400 hover:text-red-500 transition-colors"
                            >
                              Xóa
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Summary Section */}
                <div className="w-full lg:w-[350px] space-y-6">
                  <div className="space-y-4 pb-6 border-b border-gray-100">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600 font-bold">Tạm tính:</span>
                      <span className="font-bold">{subtotal.toLocaleString()}₫</span>
                    </div>
                    <div className="flex justify-between items-end pt-4">
                      <span className="text-gray-600 text-sm">Thành tiền:</span>
                      <span className="text-2xl font-bold text-primary-deep leading-none">
                        {subtotal.toLocaleString()}₫
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4">
                    <button className="w-full h-12 bg-primary-deep text-white text-xs uppercase tracking-widest font-bold hover:bg-opacity-90 transition-all">
                      Mua ngay
                    </button>
                    <Link 
                      to="/products"
                      className="w-full h-12 border border-gray-200 flex items-center justify-center text-xs uppercase tracking-widest font-bold hover:bg-gray-50 transition-all"
                    >
                      Tiếp tục mua hàng
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="py-20 text-center space-y-6">
              <p className="text-gray-400 ">Giỏ hàng của bạn đang trống.</p>
              <Link to="/products" className="inline-block px-10 py-3 bg-primary-deep text-white text-xs uppercase tracking-widest font-bold">
                Quay lại cửa hàng
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Cart;
