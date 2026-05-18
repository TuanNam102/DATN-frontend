import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <main className="bg-white min-h-screen pt-[120px] pb-24 font-body">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Breadcrumb */}
        <nav className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.2em] text-primary-deep/40 mb-12">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="text-[8px]">/</span>
          <span className="text-primary-deep">Khôi phục mật khẩu</span>
        </nav>

        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="font-heading font-medium text-5xl md:text-6xl  text-primary-deep mb-4">Khôi phục mật khẩu</h1>
            <p className="text-primary-deep/60 text-sm">We will send you an email to reset your password.</p>
          </motion.div>

          <form className="space-y-6">
            <div className="space-y-2">
              <input
                type="email"
                placeholder="Email"
                className="w-full h-12 px-6 border border-gray-100 bg-[#F9F9F9] focus:border-primary focus:bg-white outline-none transition-all text-sm"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full h-12 bg-primary-deep text-white text-xs uppercase tracking-[0.2em] font-bold hover:bg-primary transition-all duration-500 shadow-lg"
            >
              Submit
            </button>

            <div className="text-center pt-6 border-t border-gray-100">
              <Link
                to="/login"
                className="inline-block text-xs uppercase tracking-[0.2em] font-bold border-b border-primary pb-1 hover:text-primary transition-all"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default ForgotPassword;
