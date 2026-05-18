import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { getMyOrders } from "../services/orderService";
import type { Order, User } from "../types";
import { formatPrice } from "../utils/format";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("info");
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (!userData || !token) {
      navigate("/login");
      return;
    }
    setUser(JSON.parse(userData));
  }, [navigate]);

  useEffect(() => {
    if (activeTab === "orders") {
      fetchOrders();
    }
  }, [activeTab]);

  const fetchOrders = async () => {
    try {
      setLoadingOrders(true);
      const data = await getMyOrders();
      setOrders(data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoadingOrders(false);
    }
  };

  const tabs = [
    { id: "info", label: "Thông tin tài khoản" },
    { id: "orders", label: "Đơn hàng của bạn" },
    { id: "password", label: "Đổi mật khẩu" },
    { id: "address", label: "Sổ địa chỉ (1)" },
  ];

  if (!user) return null;

  return (
    <main className="min-h-screen bg-white pt-32 pb-20">
      <div className="max-w-[1320px] mx-auto px-6 md:px-12">
        <div className="mb-10 border-b border-black/10 pb-6">
          <h1 className="text-4xl md:text-5xl  font-heading font-medium mb-2">Xin chào, {user.name}!</h1>
          <p className="text-sm tracking-[0.1em] text-black/60 uppercase">Quản lý tài khoản cá nhân</p>
        </div>

        <div className="grid lg:grid-cols-[280px_1fr] gap-10 lg:gap-16">
          {/* Sidebar */}
          <aside>
            <nav className="flex flex-col gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`text-left px-5 py-4 rounded-xl transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-black text-white shadow-lg"
                      : "hover:bg-black/5 text-black/70 hover:text-black"
                  }`}
                >
                  <span className="text-[13px] font-medium">{tab.label}</span>
                </button>
              ))}
              <button
                onClick={() => {
                  localStorage.removeItem("user");
                  localStorage.removeItem("token");
                  navigate("/login");
                }}
                className="text-left px-5 py-4 rounded-xl text-red-500 hover:bg-red-50 transition-colors mt-4"
              >
                <span className="text-[13px] font-medium">Đăng xuất</span>
              </button>
            </nav>
          </aside>

          {/* Main Content */}
          <div className="min-h-[500px]">
            <AnimatePresence mode="wait">
              {/* TAB: THÔNG TIN TÀI KHOẢN */}
              {activeTab === "info" && (
                <motion.div
                  key="info"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl p-8 border border-black/10 shadow-sm"
                >
                  <h2 className="text-2xl  font-heading font-medium mb-6 border-b border-black/5 pb-4">Thông tin cá nhân</h2>
                  <div className="space-y-6 max-w-xl">
                    <div>
                      <label className="block text-xs font-medium text-black/60 mb-2">Họ và tên</label>
                      <input
                        type="text"
                        defaultValue={user.name}
                        disabled
                        className="w-full h-12 bg-[#f9f9f9] border border-black/10 rounded-lg px-4 outline-none text-base text-black cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-black/60 mb-2">Email</label>
                      <input
                        type="email"
                        defaultValue={user.email}
                        disabled
                        className="w-full h-12 bg-[#f9f9f9] border border-black/10 rounded-lg px-4 outline-none text-base text-black cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-black/60 mb-2">Điện thoại</label>
                      <input
                        type="text"
                        placeholder="Chưa cập nhật"
                        disabled
                        className="w-full h-12 bg-[#f9f9f9] border border-black/10 rounded-lg px-4 outline-none text-base text-black cursor-not-allowed"
                      />
                    </div>
                    <div className="pt-4">
                      <p className="text-xs text-black/40 ">* Vui lòng liên hệ Admin để cập nhật thông tin.</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB: LỊCH SỬ ĐƠN HÀNG */}
              {activeTab === "orders" && (
                <motion.div
                  key="orders"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-2xl  font-heading font-medium mb-6">Đơn hàng của bạn</h2>
                  {loadingOrders ? (
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="h-24 bg-white/50 border border-black/10 rounded-xl animate-pulse" />
                      ))}
                    </div>
                  ) : orders.length === 0 ? (
                    <div className="bg-white rounded-2xl p-12 text-center border border-black/10 shadow-sm">
                      <p className="text-black/50 text-sm mb-4">Bạn chưa có đơn hàng nào.</p>
                      <Link
                        to="/products"
                        className="inline-flex items-center justify-center px-8 h-12 bg-black text-white rounded-full text-sm font-medium hover:bg-black/80 transition-colors"
                      >
                        Mua sắm ngay
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div key={order._id} className="bg-white rounded-xl border border-black/10 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm hover:shadow-md transition-shadow">
                          <div>
                            <p className="text-xs text-black/50 mb-1">Đơn hàng <span className="text-black font-medium">#{order._id.substring(0, 8)}</span></p>
                            <p className="text-sm font-medium">{new Date(order.createdAt).toLocaleDateString("vi-VN")}</p>
                          </div>
                          <div className="flex gap-4 items-center">
                            <span className={`px-3 py-1 rounded-full text-[11px] font-medium border ${order.isPaid ? 'bg-green-50 text-green-600 border-green-200' : 'bg-orange-50 text-orange-600 border-orange-200'}`}>
                              {order.isPaid ? "Đã thanh toán" : "Chưa thanh toán"}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-[11px] font-medium border ${order.isDelivered ? 'bg-blue-50 text-blue-600 border-blue-200' : 'bg-gray-50 text-gray-600 border-gray-200'}`}>
                              {order.isDelivered ? "Đã giao" : "Chưa giao"}
                            </span>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-black/50 mb-1">Tổng cộng</p>
                            <p className="text-lg text-primary font-bold">{formatPrice(order.totalPrice)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {/* TAB: ĐỔI MẬT KHẨU */}
              {activeTab === "password" && (
                <motion.div
                  key="password"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl p-8 border border-black/10 shadow-sm"
                >
                  <h2 className="text-2xl  font-heading font-medium mb-6 border-b border-black/5 pb-4">Đổi mật khẩu</h2>
                  <form className="space-y-6 max-w-xl" onSubmit={(e) => e.preventDefault()}>
                    <div>
                      <label className="block text-xs font-medium text-black/60 mb-2">Mật khẩu hiện tại</label>
                      <input
                        type="password"
                        className="w-full h-12 bg-white border border-black/20 rounded-lg px-4 outline-none text-base focus:border-black transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-black/60 mb-2">Mật khẩu mới</label>
                      <input
                        type="password"
                        className="w-full h-12 bg-white border border-black/20 rounded-lg px-4 outline-none text-base focus:border-black transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-black/60 mb-2">Xác nhận mật khẩu mới</label>
                      <input
                        type="password"
                        className="w-full h-12 bg-white border border-black/20 rounded-lg px-4 outline-none text-base focus:border-black transition-colors"
                      />
                    </div>
                    <button className="px-8 h-12 bg-black text-white rounded-lg text-sm font-medium hover:bg-black/80 transition-colors">
                      Cập nhật mật khẩu
                    </button>
                    <p className="text-xs text-black/40  pt-2">* Chức năng này đang được phát triển.</p>
                  </form>
                </motion.div>
              )}

              {/* TAB: SỔ ĐỊA CHỈ */}
              {activeTab === "address" && (
                <motion.div
                  key="address"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl p-8 border border-black/10 shadow-sm"
                >
                  <div className="flex items-center justify-between border-b border-black/5 pb-4 mb-6">
                    <h2 className="text-2xl  font-heading font-medium">Sổ địa chỉ</h2>
                    <button className="text-sm font-medium underline underline-offset-4 hover:text-black/60 transition-colors">
                      Thêm địa chỉ mới
                    </button>
                  </div>
                  <div className="border border-black/10 rounded-xl p-6 bg-[#fcfcfc] relative">
                    <span className="absolute top-4 right-4 bg-black text-white text-[10px] font-medium px-2.5 py-1 rounded-md">Mặc định</span>
                    <h3 className="font-medium mb-1">{user.name}</h3>
                    <p className="text-sm text-black/60 mb-1">0987654321</p>
                    <p className="text-sm text-black/60">Tầng 6, Tòa nhà Ladeco, 266 Đội Cấn, Liễu Giai, Ba Đình, Hà Nội</p>
                    <div className="flex gap-4 mt-4">
                      <button className="text-xs font-medium text-black/50 hover:text-black">Chỉnh sửa</button>
                      <button className="text-xs font-medium text-red-500 hover:text-red-700">Xóa</button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
