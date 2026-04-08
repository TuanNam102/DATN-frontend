import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const productImages = [
  "https://borcen-store-newdemo.myshopify.com/cdn/shop/files/3_55212c90-dbf9-4ee3-be79-7a0808f650bd.jpg?v=1756443787&width=1200",
  "https://borcen-store-newdemo.myshopify.com/cdn/shop/files/4_4b760fb8-e5fc-4aac-b9e4-18354dd3b53a.jpg?v=1756443787&width=1200",
  "https://borcen-store-newdemo.myshopify.com/cdn/shop/files/5_d882c545-74d5-4a73-b260-68b7e0e84f25.jpg?v=1756443787&width=1200",
  "https://borcen-store-newdemo.myshopify.com/cdn/shop/files/1_40362167-2157-4b86-a399-3a09a3a2e8d7.jpg?v=1756443787&width=1200",
  "https://borcen-store-newdemo.myshopify.com/cdn/shop/files/2_45527d41-6d9e-407b-a8db-b221afa5853e.jpg?v=1756443787&width=1200",
];

const relatedProducts = [
  { id: "rovek-soryn", name: "Rovek Soryn", price: "$80.00", oldPrice: "$90.00", image: "https://borcen-store-newdemo.myshopify.com/cdn/shop/files/9_58fb5bf9-0c39-4f37-85a2-b72322ff49c1.jpg?v=1756444168&width=400" },
  { id: "cylor-elvor", name: "Cylor Elvor", price: "$60.00", oldPrice: "$70.00", image: "https://borcen-store-newdemo.myshopify.com/cdn/shop/files/3_800b5879-d465-43e7-a78f-e03a3a17fb36.jpg?v=1756444125&width=400" },
  { id: "firae-talor", name: "Firae Talor", price: "$60.00", oldPrice: "$70.00", image: "https://borcen-store-newdemo.myshopify.com/cdn/shop/files/16_bc354bf6-b5bb-48c1-9571-4be23828b3ce.jpg?v=1756444330&width=400" },
  { id: "noir-garden", name: "Noir Garden", price: "$75.00", oldPrice: "$90.00", image: "https://borcen-store-newdemo.myshopify.com/cdn/shop/files/11_00dfbe01-cc01-4963-9093-0ec96cb06691.jpg?v=1756444225&width=400" },
];

const ProductDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("Description");
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(productImages[0]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <main className="bg-white font-body selection:bg-primary selection:text-white">
      {/* Breadcrumb Section */}
      <section className="bg-[#F5F5F5] py-4">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <nav className="flex items-center gap-2 text-xs text-primary-deep/60">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <svg className="w-2 h-2" fill="currentColor" viewBox="0 0 320 512">
              <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
            </svg>
            <span className="text-primary-deep font-medium uppercase tracking-widest">Kivra Solen</span>
          </nav>
        </div>
      </section>

      {/* Main Product Section */}
      <section className="bg-[#F5F5F5] pb-12">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-12 gap-12 lg:gap-20 items-start">
            
            {/* Left: Gallery (7 columns) */}
            <div className="md:col-span-7 sticky top-24">
              <div className="space-y-4">
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="aspect-square bg-white overflow-hidden shadow-sm"
                >
                  <img src={mainImage} alt="Kivra Solen" className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
                </motion.div>
                <div className="grid grid-cols-5 gap-3">
                  {productImages.map((img, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setMainImage(img)}
                      className={`aspect-square bg-white border transition-all ${
                        mainImage === img ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Product Info (5 columns) */}
            <div className="md:col-span-5 sticky top-24">
              <div className="flex flex-col">
                <h1 className="font-headline text-4xl lg:text-5xl text-primary-deep italic mb-4">Kivra Solen</h1>
                
                {/* Review Badge */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex text-primary">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-[11px] text-primary-deep/40 uppercase tracking-widest">No reviews</span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-3xl font-body text-primary font-bold">$70.00</span>
                  <span className="text-xl text-primary-deep/30 line-through">$80.00</span>
                  <span className="bg-primary text-white text-[10px] px-2 py-1 rounded-sm font-bold">SAVE 12%</span>
                </div>

                <p className="text-primary-deep/70 leading-relaxed mb-10 text-sm">
                  Cheer on your favorite red and white team in eye-popping style with these red & white striped game bib overalls! 
                  Each pair is made of 100 percent cotton for a comfortable, breathable fit regardless of the weather and includes 
                  easily adjustable shoulder straps for fans with long torsos.
                </p>

                {/* Buy Section */}
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex items-center border border-primary-deep/10 bg-white h-12 px-4">
                      <button 
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-8 h-full flex items-center justify-center text-primary-deep/60 hover:text-primary transition-colors"
                      >
                        <svg className="w-3" fill="none" stroke="currentColor" viewBox="0 0 10 2">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M.5 1h9" />
                        </svg>
                      </button>
                      <input 
                        type="number" 
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                        className="w-12 text-center text-sm font-bold bg-transparent outline-none"
                      />
                      <button 
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-8 h-full flex items-center justify-center text-primary-deep/60 hover:text-primary transition-colors"
                      >
                        <svg className="w-3" fill="none" stroke="currentColor" viewBox="0 0 10 10">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1v8M1 5h8" />
                        </svg>
                      </button>
                    </div>
                    <button className="flex-1 bg-white text-primary-deep border border-primary-deep font-bold text-xs uppercase tracking-widest h-12 hover:bg-primary hover:text-white hover:border-primary transition-all duration-500">
                      Add to Cart
                    </button>
                  </div>
                  <button className="w-full bg-primary text-white font-bold text-xs uppercase tracking-[0.2em] h-12 hover:bg-primary-dark transition-all duration-500 shadow-lg">
                    Buy It Now
                  </button>
                </div>

                {/* Shipping Icons */}
                <div className="grid grid-cols-1 gap-6 pt-10 mt-10 border-t border-primary-deep/5">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0">
                      <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 150 150">
                        <path d="M139.75,121.3c-0.34,0.71-0.59,1.47-1.03,2.12c-1.35,2.01-3.38,2.45-5.65,2.39c-2.37-0.07-2.38-0.02-3.18,2.15c-2.08,5.6-7.7,9.43-13.52,9.21c-6.27-0.24-11.59-4.31-13.27-10.25c-0.23-0.82-0.51-1.15-1.42-1.15c-15.69,0.03-31.38,0.02-47.07,0.02c-0.33,0-0.66,0.03-1.07,0.05c-0.88,3.68-2.77,6.67-5.89,8.82c-2.43,1.68-5.15,2.53-8.08,2.48c-5.74-0.08-11.85-3.57-13.83-11.35c-1.82,0-3.67-0.01-5.51,0c-3.49,0.03-5.82-2.37-5.81-5.88c0.02-18.77,0.02-37.54,0-56.3c0-0.6-0.23-1.24-0.5-1.78C3.66,41.56,15.9,17.2,38.33,13.31c18.37-3.19,36.21,9.64,38.92,27.97c0.11,0.75,0.22,1.49,0.36,2.39c0.45,0.03,0.94,0.08,1.42,0.08c5.69,0.01,11.39,0.11,17.08-0.03c3.93-0.1,6.34,2.51,6.27,6.21c-0.16,7.63-0.05,15.27-0.05,22.9c0,0.49,0,0.99,0,1.63c0.59,0,1.04,0,1.49,0c6.03-0.03,12.06,0.04,18.09-0.11c3.55-0.09,5.98,1.28,7.38,4.55c2.1,4.91,4.24,9.8,6.37,14.7c0.49,1.12,1.05,2.21,1.5,3.34c0.89,2.21,1.72,4.44,2.58,6.66C139.75,109.49,139.75,115.4,139.75,121.3z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-widest text-primary-deep mb-1">Fast Delivery</h4>
                      <p className="text-[11px] text-primary-deep/60 leading-relaxed">Estimate delivery times: 12-26 days (International), 3-6 days (United States).</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-widest text-primary-deep mb-1">Easy Returns</h4>
                      <p className="text-[11px] text-primary-deep/60 leading-relaxed">Return within 45 days of purchase. Duties & taxes are non-refundable.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="py-20 border-t border-primary-deep/5">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="flex justify-center gap-12 mb-16 border-b border-primary-deep/10">
            {["Description", "Shipping & return", "Customer reviews"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-xs uppercase tracking-[0.2em] transition-all relative font-bold ${
                  activeTab === tab ? "text-primary" : "text-primary-deep/40 hover:text-primary"
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div layoutId="product-tab" className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary" />
                )}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="min-h-[300px]"
            >
              {activeTab === "Description" && (
                <div className="space-y-20">
                  <div className="max-w-4xl mx-auto text-center">
                    <p className="text-lg italic font-headline text-primary-deep leading-relaxed mb-12">
                      Temporibus unde ut exercitationem sit nostrum consectetur est. Voluptatem fugit nisi et minima vel. 
                      Adipisci iure ut corrupti hic consectetur. Atque mollitia modi suscipit ut necessitatibus. 
                      Et ab cupiditate et voluptatibus excepturi atque sint veniam.
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-20 items-center">
                    <div className="space-y-8">
                      <h3 className="font-headline text-4xl italic text-primary-deep">Outstanding Features</h3>
                      <p className="text-primary-deep/70 leading-relaxed">
                        Blanditiis dolorem voluptatem consequuntur explicabo accusamus fugiat maxime. 
                        Eum vel fugit voluptatibus ex dolorum dolorem cupiditate. Et sed minus repudiandae. 
                        Cum aliquid aut voluptatem possimus ipsa.
                      </p>
                      <ul className="space-y-4">
                        {[
                          "Longum tempus warantum: Product warantum pro 2 annis.",
                          "Impact resistentiam: Designa productum ut impacta ab collisione sustineant.",
                          "Princeps vetustatem: Using qualitas materiae princeps.",
                          "Notitia securitatis: Prospicere salutem users' notitia et personalis notitia",
                          "Dedicavit ministros: Provide professionales et dedicatos ministros officia"
                        ].map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-sm text-primary-deep/70">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0"></span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-3xl overflow-hidden shadow-2xl">
                      <img src="https://cdn.shopify.com/s/files/1/0717/8492/3326/files/des1-1.jpg?v=1756451000" alt="Features" className="w-full h-auto" />
                    </div>
                  </div>

                  <div className="pt-20">
                    <h3 className="font-headline text-4xl italic text-primary-deep text-center mb-12">Product Supreme Quality</h3>
                    <div className="grid md:grid-cols-3 gap-12">
                      {[
                        { title: "Infomation Product", desc: "IFlexibile consilium: Design res ad usus multos et spatia apta, flexibilitatem et commodum usoribus afferens.", img: "https://cdn.shopify.com/s/files/1/0717/8492/3326/files/des1.jpg?v=1756451000" },
                        { title: "Fabricae Material", desc: "SAlta durabilitas: alta qualitas materiae et processus fabricandi provectae utens productum habet longam restem et capacitatem bonam sustinens.", img: "https://cdn.shopify.com/s/files/1/0717/8492/3326/files/des2.jpg?v=1756451000" },
                        { title: "Instructiones", desc: "Facilis utendum est: User-amica interface et experientia consilium, simplex et facile ad intelligendum, adiuvans utentes utentes facto facili et commode.", img: "https://cdn.shopify.com/s/files/1/0717/8492/3326/files/des3.jpg?v=1756451000" }
                      ].map((item, idx) => (
                        <div key={idx} className="text-center group">
                          <div className="aspect-square rounded-3xl overflow-hidden mb-8 shadow-lg">
                            <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                          </div>
                          <h4 className="font-bold text-sm uppercase tracking-widest text-primary-deep mb-4">{item.title}</h4>
                          <p className="text-xs text-primary-deep/60 leading-relaxed">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {activeTab === "Shipping & return" && (
                <div className="max-w-3xl mx-auto space-y-6 text-primary-deep/70 leading-relaxed">
                  <p>For all orders exceeding a value of 100USD shipping is offered for free.</p>
                  <p>Returns will be accepted for up to 10 days of Customer’s receipt or tracking number on unworn items. You, as a Customer, are obliged to inform us via email before you return the item.</p>
                  <p>Otherwise, standard shipping charges apply. Check out our delivery <a href="#" className="text-primary border-b border-primary">Terms & Conditions</a> for more details.</p>
                </div>
              )}
              {activeTab === "Customer reviews" && (
                <div className="max-w-4xl mx-auto text-center py-12">
                  <div className="flex justify-center text-primary mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                  <h3 className="text-2xl font-headline italic text-primary-deep mb-2">Customer Reviews</h3>
                  <p className="text-primary-deep/60 mb-8">Be the first to write a review</p>
                  <button className="px-10 py-4 bg-primary text-white text-xs uppercase tracking-widest font-bold rounded-full hover:bg-primary-dark transition-all shadow-lg">
                    Write a review
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Related Products Section */}
      <section className="py-24 bg-[#FCFCFC]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <h2 className="font-headline text-4xl italic text-primary-deep mb-16 text-center">You Might Also Like</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map((product, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -10 }}
                className="group cursor-pointer"
              >
                <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-white mb-6 relative shadow-sm border border-gray-100">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                    <Link 
                      to={`/product/${product.id}`}
                      className="px-8 py-3 bg-white text-primary-deep text-[10px] uppercase tracking-[0.2em] font-bold rounded-full transform scale-90 group-hover:scale-100 transition-all shadow-lg"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
                <div className="text-center">
                  <h4 className="font-headline text-2xl text-primary-deep italic mb-2">{product.name}</h4>
                  <div className="flex items-center justify-center gap-3">
                    <span className="text-sm font-body text-primary-deep font-bold">{product.price}</span>
                    <span className="text-xs text-primary-deep/40 line-through">{product.oldPrice}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProductDetail;
