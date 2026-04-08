import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";

const initialWishlistItems = [
  {
    id: "kivra-solen",
    name: "Kivra Solen",
    price: "$70.00",
    oldPrice: "$80.00",
    stock: "In Stock",
    image: "https://images.unsplash.com/photo-1585232351009-aa87416fca90?auto=format&fit=crop&q=80&w=200",
  },
  {
    id: "sea-memory",
    name: "Sea Memory",
    price: "$65.00",
    oldPrice: null,
    stock: "In Stock",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=200",
  },
];

const Wishlist = () => {
  const [items, setItems] = useState(initialWishlistItems);

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <main className="bg-white min-h-screen pt-[120px] pb-24 font-body">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Breadcrumb */}
        <nav className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.2em] text-primary-deep/40 mb-12">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="text-[8px]">/</span>
          <span className="text-primary-deep">Wishlist</span>
        </nav>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="font-headline text-5xl md:text-6xl italic text-primary-deep mb-4">My Wishlist</h1>
          <p className="text-primary-deep/60 text-sm">Keep track of your favorite items here.</p>
        </motion.div>

        {items.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 text-[11px] uppercase tracking-[0.2em] text-primary-deep/40">
                  <th className="pb-6 font-bold">Product</th>
                  <th className="pb-6 font-bold hidden md:table-cell">Price</th>
                  <th className="pb-6 font-bold hidden md:table-cell">Stock Status</th>
                  <th className="pb-6 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <motion.tr 
                    key={item.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="border-b border-gray-100 group"
                  >
                    <td className="py-8">
                      <div className="flex items-center gap-6">
                        <Link to={`/product/${item.id}`} className="w-20 h-24 shrink-0 rounded-lg overflow-hidden bg-[#F9F9F9]">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        </Link>
                        <div>
                          <Link to={`/product/${item.id}`} className="font-headline text-xl italic text-primary-deep hover:text-primary transition-colors block mb-1">
                            {item.name}
                          </Link>
                          <div className="md:hidden space-y-1">
                            <p className="text-sm font-bold text-primary">{item.price}</p>
                            <p className="text-[10px] uppercase tracking-widest text-green-500">{item.stock}</p>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-8 hidden md:table-cell">
                      <div className="flex items-center gap-3">
                        <span className="text-base font-bold text-primary">{item.price}</span>
                        {item.oldPrice && <span className="text-sm text-primary-deep/30 line-through">{item.oldPrice}</span>}
                      </div>
                    </td>
                    <td className="py-8 hidden md:table-cell">
                      <span className="text-[11px] uppercase tracking-widest text-green-500 font-bold">{item.stock}</span>
                    </td>
                    <td className="py-8 text-right">
                      <div className="flex flex-col md:flex-row items-end md:items-center justify-end gap-4">
                        <button className="px-6 py-3 bg-primary-deep text-white text-[10px] uppercase tracking-widest font-bold hover:bg-primary transition-all duration-500 shadow-md whitespace-nowrap">
                          Add to Cart
                        </button>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="p-2 text-primary-deep/30 hover:text-red-500 transition-colors"
                          title="Remove from wishlist"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-24">
            <div className="w-20 h-20 bg-[#F9F9F9] rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-primary-deep/10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-headline italic text-primary-deep mb-4">Your wishlist is empty</h3>
            <p className="text-primary-deep/60 mb-10 text-sm">You haven't added any products to your wishlist yet.</p>
            <Link to="/products" className="inline-block px-10 py-4 bg-primary text-white text-xs uppercase tracking-widest font-bold rounded-full hover:bg-primary-dark transition-all shadow-lg">
              Return to shop
            </Link>
          </div>
        )}
      </div>
    </main>
  );
};

export default Wishlist;
