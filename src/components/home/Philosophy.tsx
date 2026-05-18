import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const Philosophy = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <motion.section 
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center"
    >
      <div className="space-y-12">
        <span className="font-label text-white/70 uppercase tracking-[0.3em] text-xs">Triết lý của chúng tôi</span>
        <h3 className="font-heading font-medium text-5xl md:text-7xl text-white leading-tight">
          Chế tác Ký ức <br /> <span className="italic font-light">Không chỉ là Mùi hương</span>
        </h3>
        <p className="font-body text-white/80 leading-loose text-lg">
          Tại Aventis, chúng tôi tin rằng nước hoa là bộ y phục vô hình tối thượng. Nó kể một câu chuyện trước khi bạn cất lời, để lại một bóng ma vương vấn trong căn phòng. Mỗi tinh chất là một hiện vật ánh dương, được nắm giữ trong hổ phách.
        </p>
        <div className="grid grid-cols-2 gap-8 pt-8">
          <div className="p-6 glass-luxury rounded-xl">
            <h5 className="font-heading font-medium text-xl text-white mb-2 italic">Bền vững</h5>
            <p className="text-sm text-white/70">Thực vật có nguồn gốc đạo đức từ các khu vườn tư nhân của chúng tôi.</p>
          </div>
          <div className="p-6 glass-luxury rounded-xl">
            <h5 className="font-heading font-medium text-xl text-white mb-2 italic">Nghệ thuật thủ công</h5>
            <p className="text-sm text-white/70">Được hoàn thiện thủ công bởi các bậc thầy làm thủy tinh tại Murano.</p>
          </div>
        </div>
        <button className="flex items-center gap-4 font-label uppercase tracking-widest text-xs text-white border border-white/40 px-10 py-5 rounded-full hover:bg-white hover:text-primary-deep transition-all">
          Tìm hiểu về Di sản <span className="material-symbols-outlined text-sm">north_east</span>
        </button>
      </div>
      <div className="relative">
        <div className="aspect-[4/5] overflow-hidden rounded-2xl glass-luxury p-2">
          <img alt="Ảnh biên tập" className="w-full h-full object-cover rounded-xl" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAU3tAf-7NSyH8p8AYyFGYzgkQndMD9dMwIX5t0CyKpo4iSEOx6ppDpMf1QH7-0r2ajpn2Rwb9_OIA4MCKvUAcX3WUo8gK7_voW0FJi0oy2yFELbWuu4Co68nd4LaHcYyoq2LBfVowZMBQmbAlXpl6cNLmR3E0GjhTYYxXtWN2OuZ_KIr9Fg3doNRiW118UJTaVl082ZE7UM45K3_ottNK9khfgD4Q-iaoAYQ16SceG9Oju5iHQOPKJy0-DfZdqJ7LJ27TVqiMi-T8" />
        </div>
      </div>
    </motion.section>
  );
};

export default Philosophy;
