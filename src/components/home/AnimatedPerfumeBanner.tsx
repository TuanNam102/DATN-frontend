import React, { useEffect, useState } from 'react';
import './AnimatedPerfumeBanner.css';
import { Link } from 'react-router-dom';

const slides = [
  {
    id: 1,
    title: 'Hương Thơm Đẳng Cấp',
    description: 'Khám phá bộ sưu tập nước hoa cao cấp độc quyền của chúng tôi. Được chế tác từ những nguyên liệu tốt nhất để mang đến hương thơm quyến rũ, lưu hương lâu dài, thể hiện trọn vẹn sự sang trọng thuần túy.',
    image: '../images/banner-perfumes/perfume_black.png',
    background: 'radial-gradient(50% 50% at 50% 50%, #C7F6D0 0%, #7CB686 92.19%)',
  },
  {
    id: 2,
    title: 'Sự Quyến Rũ Tinh Tế',
    description: 'Đánh thức mọi giác quan với những nốt hương hoa tinh khiết và sâu lắng. Bộ sưu tập mang lại sự tự tin tuyệt đối, tạo nên dấu ấn khó phai trong từng khoảnh khắc.',
    image: '../images/banner-perfumes/perfume_blue.png',
    background: 'radial-gradient(50% 50% at 50% 50%, #D1E4F6 0%, #5F9CCF 100%)',
  },
  {
    id: 3,
    title: 'Phong Cách Thời Thượng',
    description: 'Khẳng định phong cách riêng biệt của bạn qua từng giọt hương quý giá. Thiết kế thời thượng, mùi hương độc bản giúp bạn tỏa sáng ở bất cứ nơi đâu.',
    image: '../images/banner-perfumes/perfume_red.png',
    background: 'radial-gradient(50% 50% at 50% 50%, #FFB7B2 0%, #ED746E 100%)',
  }
];

const AnimatedPerfumeBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="animated-perfume-banner">
      <div
        className="banner-slider-wrapper"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="banner-slide"
            style={{ background: slide.background }}
          >
            <div className="banner-container">
              <div className="slider-content-wrap">
                <div className="slider-content">
                  <h2 className="heading-style-2">{slide.title}</h2>
                  <p className="description-text">{slide.description}</p>
                  <div className="mt-8 flex gap-4">
                    <Link to="/products" className="px-8 md:px-12 h-12 md:h-14 rounded-full bg-black text-white text-xs md:text-sm tracking-[0.2em] uppercase font-bold hover:bg-black/80 transition-all flex items-center justify-center">
                      Mua ngay
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="slider-images">
              <img
                className="slider-image"
                src={slide.image}
                alt="perfume"
              />
            </div>
          </div>
        ))}
      </div>

      <button className="slider-control prev" onClick={prevSlide} aria-label="Previous slide">&#10094;</button>
      <button className="slider-control next" onClick={nextSlide} aria-label="Next slide">&#10095;</button>

      <div className="slider-dots">
        {slides.map((_, idx) => (
          <button
            key={idx}
            className={`dot ${idx === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default AnimatedPerfumeBanner;
