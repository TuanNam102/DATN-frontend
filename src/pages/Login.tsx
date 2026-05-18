import React from "react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/authService";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = await login({ email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.message || "Đăng nhập thất bại. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-white min-h-screen pt-[120px] pb-24 font-body">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Breadcrumb */}
        <nav className="flex items-center justify-center gap-2 text-xs font-medium text-primary-deep/40 mb-12">
          <Link to="/" className="hover:text-primary transition-colors">Trang chủ</Link>
          <span className="text-[10px]">/</span>
          <span className="text-primary-deep">Đăng nhập</span>
        </nav>

        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="font-heading font-medium text-5xl md:text-6xl  text-primary-deep mb-4">Đăng nhập</h1>
            <p className="text-primary-deep/60 text-sm">Vui lòng nhập email và mật khẩu:</p>
          </motion.div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 text-red-500 text-sm p-4 rounded-lg text-center">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 px-6 border border-gray-100 bg-[#F9F9F9] focus:border-primary focus:bg-white outline-none transition-all text-sm rounded-lg"
                required
              />
            </div>
            <div className="space-y-2">
              <input
                type="password"
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 px-6 border border-gray-100 bg-[#F9F9F9] focus:border-primary focus:bg-white outline-none transition-all text-sm rounded-lg"
                required
              />
              <div className="text-right">
                <Link 
                  to="/forgot-password" 
                  className="text-xs font-medium text-primary-deep/40 hover:text-primary transition-colors"
                >
                  Quên mật khẩu?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full h-12 bg-primary-deep text-white text-sm font-bold hover:bg-primary transition-all duration-500 shadow-lg rounded-lg flex items-center justify-center ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : "Đăng nhập"}
            </button>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Hoặc</span>
              </div>
            </div>

            <button
              type="button"
              className="w-full h-12 bg-white border border-gray-200 text-gray-700 text-sm font-bold hover:bg-gray-50 transition-all duration-300 rounded-lg flex items-center justify-center gap-2"
            >
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
              Đăng nhập bằng Google
            </button>

            <div className="text-center pt-6 border-t border-gray-100">
              <p className="text-primary-deep/60 text-sm mb-4">Chưa có tài khoản?</p>
              <Link
                to="/register"
                className="inline-block text-sm font-bold border-b border-primary pb-1 hover:text-primary transition-all"
              >
                Đăng ký ngay
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Login;
