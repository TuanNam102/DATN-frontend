import { Link } from "react-router-dom";

const footerLinks = [
  {
    title: "About Borcen",
    links: [
      { name: "Our Story", path: "/pages/about" },
      { name: "Visit Our Store", path: "/pages/contact" },
      { name: "Contact Us", path: "/pages/contact" },
      { name: "Account", path: "/login" },
    ],
  },
  {
    title: "Quick Links",
    links: [
      { name: "Home", path: "/" },
      { name: "Shops", path: "/collections/all" },
      { name: "Products", path: "/products" },
      { name: "Blog", path: "/blogs/news" },
    ],
  },
  {
    title: "Information",
    links: [
      { name: "Privacy Policy", path: "/pages/privacy-policy" },
      { name: "Refund Policy", path: "/pages/refund-policy" },
      { name: "Shipping Policy", path: "/pages/shipping-policy" },
      { name: "Terms of Service", path: "/pages/terms-of-service" },
    ],
  },
];

const instagramImages = [
  "https://borcen-store-newdemo.myshopify.com/cdn/shop/files/instagram1.jpg?v=1756450982",
  "https://borcen-store-newdemo.myshopify.com/cdn/shop/files/instagram2.jpg?v=1756450982",
  "https://borcen-store-newdemo.myshopify.com/cdn/shop/files/instagram3.jpg?v=1756450982",
  "https://borcen-store-newdemo.myshopify.com/cdn/shop/files/instagram4.jpg?v=1756450982",
  "https://borcen-store-newdemo.myshopify.com/cdn/shop/files/instagram5.jpg?v=1756450982",
  "https://borcen-store-newdemo.myshopify.com/cdn/shop/files/instagram6.jpg?v=1756450982",
];

const Footer = () => {
  return (
    <footer className="bg-white pt-20 border-t border-gray-100">
      {/* Instagram Feed */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 mb-20">
        <div className="flex items-center justify-between mb-10">
          <h2 className="font-headline text-3xl italic text-primary-deep">Instagram Feed</h2>
          <a href="#" className="text-xs uppercase tracking-widest border-b border-black pb-1 hover:text-primary transition-colors">Follow @BorcenStore</a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {instagramImages.map((img, idx) => (
            <div key={idx} className="aspect-square rounded-2xl overflow-hidden group cursor-pointer">
              <img 
                src={img} 
                alt={`Instagram ${idx}`} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
            </div>
          ))}
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid md:grid-cols-2 lg:grid-cols-4 gap-12 pb-20 border-b border-gray-100">
        <div className="space-y-8">
          <Link to="/">
            <img 
              src="https://borcen-store-newdemo.myshopify.com/cdn/shop/files/logo.png?v=1756868887" 
              alt="Logo" 
              className="h-12" 
            />
          </Link>
          <p className="text-sm text-primary-deep/60 leading-relaxed max-w-xs">
            Experience the essence of luxury with our curated collection of premium fragrances. 
            Crafted for those who appreciate timeless elegance.
          </p>
          <div className="flex gap-4">
            {['facebook', 'twitter', 'instagram', 'pinterest'].map((social) => (
              <a key={social} href="#" className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center hover:bg-primary hover:text-white transition-all text-primary-deep/60">
                <i className={`fab fa-${social}`}></i>
              </a>
            ))}
          </div>
        </div>

        {footerLinks.map((column) => (
          <div key={column.title}>
            <h3 className="text-[13px] uppercase tracking-[0.2em] font-bold text-primary-deep mb-8">{column.title}</h3>
            <ul className="space-y-4">
              {column.links.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-sm text-primary-deep/60 hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom Bar */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-[11px] text-primary-deep/40 uppercase tracking-widest text-center md:text-left">
          &copy; Copyright 2026 | <span className="text-primary-deep font-bold">Borcen</span> By EngoTheme. Powered by Shopify.
        </div>
        <img 
          src="https://borcen-store-newdemo.myshopify.com/cdn/shop/files/payment_footer.png?v=1756436919" 
          alt="Payment Methods" 
          className="h-6 object-contain"
        />
      </div>
    </footer>
  );
};

export default Footer;
