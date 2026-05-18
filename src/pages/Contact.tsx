import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <main className="bg-white min-h-screen pt-[120px] pb-24 font-body">
      {/* Breadcrumb */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <nav className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.2em] text-primary-deep/40 mb-12">
          <Link to="/" className="hover:text-primary transition-colors">Trang chủ</Link>
          <span className="text-[8px]">/</span>
          <span className="text-primary-deep">Liên hệ</span>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 mb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-heading font-medium text-5xl md:text-7xl  text-primary-deep mb-6">Liên hệ với Aventis</h1>
          <p className="text-primary-deep/60 text-lg max-w-2xl mx-auto leading-relaxed">
            Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn. Hãy để lại lời nhắn hoặc ghé thăm cửa hàng của chúng tôi.
          </p>
        </motion.div>
      </section>

      {/* Contact Info & Form */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-20">
        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-12"
        >
          <div>
            <h2 className="font-heading font-medium text-3xl  text-primary-deep mb-8">Thông tin liên lạc</h2>
            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-sm uppercase tracking-widest text-primary-deep mb-2">Địa chỉ</h3>
                  <p className="text-primary-deep/60 leading-relaxed">123 Đường Lê Lợi, Quận 1, TP. Hồ Chí Minh, Việt Nam</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-sm uppercase tracking-widest text-primary-deep mb-2">Điện thoại</h3>
                  <p className="text-primary-deep/60 leading-relaxed">(+84) 123 456 789</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-sm uppercase tracking-widest text-primary-deep mb-2">Email</h3>
                  <p className="text-primary-deep/60 leading-relaxed">contact@aventis.com</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-sm uppercase tracking-widest text-primary-deep mb-2">Giờ làm việc</h3>
                  <p className="text-primary-deep/60 leading-relaxed">Thứ 2 - Thứ 7: 09:00 - 21:00<br />Chủ Nhật: 10:00 - 18:00</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-[#F9F9F9] p-8 md:p-12 rounded-[40px]"
        >
          <h2 className="font-heading font-medium text-3xl  text-primary-deep mb-8">Gửi tin nhắn</h2>
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-primary-deep/40">Họ và tên</label>
                <input
                  type="text"
                  placeholder="Nhập họ và tên"
                  className="w-full h-12 bg-white border border-gray-100 px-6 outline-none focus:border-primary transition-colors text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-primary-deep/40">Email</label>
                <input
                  type="email"
                  placeholder="example@gmail.com"
                  className="w-full h-12 bg-white border border-gray-100 px-6 outline-none focus:border-primary transition-colors text-sm"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-primary-deep/40">Chủ đề</label>
              <input
                type="text"
                placeholder="Vấn đề bạn quan tâm"
                className="w-full h-12 bg-white border border-gray-100 px-6 outline-none focus:border-primary transition-colors text-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-primary-deep/40">Tin nhắn</label>
              <textarea
                placeholder="Hãy viết tin nhắn của bạn tại đây..."
                rows={5}
                className="w-full bg-white border border-gray-100 p-6 outline-none focus:border-primary transition-colors text-sm resize-none"
              ></textarea>
            </div>
            <button className="w-full h-14 bg-primary-deep text-white font-bold text-xs uppercase tracking-[0.2em] hover:bg-primary transition-all duration-500 rounded-full shadow-lg shadow-primary-deep/20">
              Gửi tin nhắn
            </button>
          </form>
        </motion.div>
      </section>

      {/* Map Section */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 mt-24">
        <div className="w-full h-[500px] rounded-[40px] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.460232428343!2d106.7003006110825!3d10.772579259152226!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f40a66d03f5%3A0xa9749f127c81d36c!2zMTIzIEzDqiBM4bujaSwgQuG6v24gVGjDoG5oLCBRdeG6rW4gMSwgSOG7kyBDaMOtIE1pbmgsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1712900000000!5m2!1svi!2s" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </main>
  );
};

export default Contact;
