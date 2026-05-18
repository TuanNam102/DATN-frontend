import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <main className="bg-white min-h-screen pt-[120px] pb-24 font-body">
      {/* Breadcrumb */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <nav className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.2em] text-primary-deep/40 mb-12">
          <Link to="/" className="hover:text-primary transition-colors">Trang chủ</Link>
          <span className="text-[8px]">/</span>
          <span className="text-primary-deep">Về chúng tôi</span>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 mb-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-heading font-medium text-5xl md:text-7xl  text-primary-deep mb-8 leading-tight">
              Crafting Essence, <br /> Defining Luxury.
            </h1>
            <p className="text-primary-deep/60 text-lg leading-relaxed mb-8 max-w-xl">
              Từ năm 2010, Aventis đã tận tâm với nghệ thuật chế tác nước hoa tinh xảo. 
              Hành trình của chúng tôi bắt đầu với một sứ mệnh đơn giản: tạo ra những mùi hương kể chuyện, 
              gợi nhớ kỷ niệm và khẳng định bản sắc.
            </p>
            <div className="flex gap-12">
              <div>
                <h4 className="font-heading font-medium text-4xl  text-primary-deep mb-1">15+</h4>
                <p className="text-[10px] uppercase tracking-widest text-primary-deep/40 font-bold">Years of Excellence</p>
              </div>
              <div>
                <h4 className="font-heading font-medium text-4xl  text-primary-deep mb-1">50k+</h4>
                <p className="text-[10px] uppercase tracking-widest text-primary-deep/40 font-bold">Happy Customers</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl"
          >
            <img 
              src="https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=1200" 
              alt="Về Aventis" 
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Our Values */}
      <section className="bg-[#F9F9F9] py-24">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 text-center mb-16">
          <h2 className="font-heading font-medium text-4xl md:text-5xl  text-primary-deep mb-4">Our Core Values</h2>
          <p className="text-primary-deep/60 text-sm tracking-widest uppercase">The pillars of our craftsmanship</p>
        </div>
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid md:grid-cols-3 gap-12">
          {[
            {
              title: "Quality First",
              desc: "We source only the finest natural ingredients from around the globe to ensure unparalleled purity and depth in every bottle.",
              icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z"
            },
            {
              title: "Sustainability",
              desc: "Our commitment to the planet is as strong as our passion for scent. We use eco-friendly packaging and ethical sourcing practices.",
              icon: "M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
            },
            {
              title: "Artistic Innovation",
              desc: "We blend traditional techniques with modern creativity to push the boundaries of olfactory experiences.",
              icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            }
          ].map((value, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="bg-white p-12 rounded-[32px] shadow-sm border border-gray-100 text-center hover:shadow-xl transition-all duration-500"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8 text-primary">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={value.icon} />
                </svg>
              </div>
              <h3 className="font-heading font-medium text-2xl  text-primary-deep mb-4">{value.title}</h3>
              <p className="text-primary-deep/60 leading-relaxed text-sm">{value.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Our Process */}
      <section className="py-24 max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="rounded-[40px] overflow-hidden"
          >
            <img 
              src="https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=1200" 
              alt="Our Process" 
              className="w-full h-full object-cover"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-12"
          >
            <h2 className="font-heading font-medium text-4xl md:text-5xl  text-primary-deep">Our Meticulous Process</h2>
            <div className="space-y-8">
              {[
                { step: "01", title: "Sourcing", desc: "Selecting rare botanicals from Grasse to the Himalayas." },
                { step: "02", title: "Extraction", desc: "Using gentle distillation to preserve the soul of the plant." },
                { step: "03", title: "Blending", desc: "Master perfumers aging each blend for optimal complexity." },
                { step: "04", title: "Packaging", desc: "Hand-finished bottles encased in sustainable materials." }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-6 items-start">
                  <span className="text-primary font-bold text-lg tracking-widest">{item.step}</span>
                  <div>
                    <h4 className="text-primary-deep font-bold text-sm uppercase tracking-widest mb-1">{item.title}</h4>
                    <p className="text-primary-deep/60 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Newsletter / CTA */}
      <section className="py-24 bg-primary-deep text-white text-center rounded-[40px] mx-6 md:mx-12 overflow-hidden relative">
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=1920" alt="CTA BG" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 px-6">
          <h2 className="font-heading font-medium text-4xl md:text-6xl  mb-8">Tham gia Thế giới của Aventis</h2>
          <p className="text-white/60 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
            Cập nhật những bộ sưu tập mới nhất, sự kiện độc quyền và nghệ thuật mùi hương sang trọng.
          </p>
          <Link 
            to="/register"
            className="inline-block px-12 py-4 bg-primary text-white text-xs uppercase tracking-[0.2em] font-bold rounded-full hover:bg-white hover:text-primary-deep transition-all shadow-2xl"
          >
            Create an Account
          </Link>
        </div>
      </section>
    </main>
  );
};

export default About;
