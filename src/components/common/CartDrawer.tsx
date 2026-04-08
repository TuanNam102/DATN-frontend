import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const recommendedProducts = [
  {
    id: "rovek-soryn",
    name: "Rovek Soryn",
    price: "$80.00",
    oldPrice: "$90.00",
    image: "https://borcen-store-newdemo.myshopify.com/cdn/shop/files/9_58fb5bf9-0c39-4f37-85a2-b72322ff49c1.jpg?v=1756444168&width=100",
  },
  {
    id: "cylor-elvor",
    name: "Cylor Elvor",
    price: "$60.00",
    oldPrice: "$70.00",
    image: "https://borcen-store-newdemo.myshopify.com/cdn/shop/files/3_800b5879-d465-43e7-a78f-e03a3a17fb36.jpg?v=1756444125&width=100",
  },
  {
    id: "firae-talor",
    name: "Firae Talor",
    price: "$60.00",
    oldPrice: "$70.00",
    image: "https://borcen-store-newdemo.myshopify.com/cdn/shop/files/16_bc354bf6-b5bb-48c1-9571-4be23828b3ce.jpg?v=1756444330&width=100",
  },
];

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-[110] backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-[400px] bg-white z-[120] p-6 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <h2 className="text-xl font-headline italic text-primary-deep">Shopping Cart</h2>
              <button onClick={onClose} className="text-primary-deep hover:text-primary transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Free Shipping Progress */}
            <div className="py-4 border-b border-gray-100 text-center text-sm text-primary-deep/70">
              <p>Congrats! You are eligible for FREE Shipping</p>
              {/* You can add a progress bar here if needed */}
            </div>

            {/* Cart Items (Empty State for now) */}
            <div className="flex-1 flex flex-col items-center justify-center text-center py-10">
              <svg className="w-20 h-20 text-primary-deep/20 mb-4" fill="currentColor" viewBox="0 0 32 32">
                <path d="M31.71,15.29c-4.09-4.08-4-4.07-4.28-4.19l-7-3.19a1,1,0,1,0-.82,1.82l5,2.27L16,15.9,7.42,12l5-2.27a1,1,0,0,0-.82-1.82c-4.87,2.21-7.13,3.25-7,3.19-.24.12-.13.05-4.28,4.19a1,1,0,0,0,.3,1.62l11,5a1,1,0,0,0,1.12-.2L15,19.41v10L6,25.36V22a1,1,0,0,0-2,0c0,4.42,0,4.2.18,4.54a.6.6,0,0,0,.3.29c.1.07,0,.05.13.09C16.59,32.36,15.69,32,16,32s-.5.32,11.41-5.09A1,1,0,0,0,28,26V18.46l3.41-1.55A1,1,0,0,0,31.71,15.29ZM11.78,19.8l-9-4.11L5.22,13.2l9.05,4.11ZM26,25.36l-9,4.09v-10C19.46,21.87,19.45,22,20,22c.33,0,.07.07,6-2.63ZM20.22,19.8l-2.49-2.49,9.05-4.11,2.49,2.49Z"/><path d="M15,8.91a3.61,3.61,0,0,1,2-3.16,2,2,0,0,0,1-2.12,2,2,0,1,0-3.86,1,1,1,0,0,1-.6,1.27,1,1,0,0,1-1.28-.61,4,4,0,1,1,5.7,2.17A1.67,1.67,0,0,0,17,8.91,1,1,0,1,1,15,8.91Z"/><path d="M16,13a1,1,0,1,1,1-1A1,1,0,0,1,16,13Z"/>
              </svg>
              <h3 className="text-2xl font-headline italic text-primary-deep mb-2">Your cart is empty</h3>
              <p className="text-sm text-primary-deep/60 mb-6">You may check out all the available products and buy some in the shop.</p>
              <Link to="/collections/all" onClick={onClose} className="px-8 py-3 bg-primary text-white text-xs uppercase tracking-widest font-bold rounded-full hover:bg-primary-dark transition-all">
                Continue shopping
              </Link>
            </div>

            {/* Recommended Products */}
            <div className="pt-6 border-t border-gray-100">
              <h5 className="text-sm font-bold uppercase tracking-widest text-primary-deep mb-4">You may also like</h5>
              <div className="space-y-4">
                {recommendedProducts.map((product) => (
                  <div key={product.id} className="flex gap-4 items-center">
                    <Link to={`/product/${product.id}`} onClick={onClose} className="w-20 h-20 shrink-0 rounded-lg overflow-hidden">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    </Link>
                    <div className="flex-1">
                      <Link to={`/product/${product.id}`} onClick={onClose} className="text-base font-headline italic text-primary-deep hover:text-primary transition-colors">
                        {product.name}
                      </Link>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm font-body text-primary-deep font-bold">{product.price}</span>
                        {product.oldPrice && <span className="text-xs text-primary-deep/40 line-through">{product.oldPrice}</span>}
                      </div>
                      <button className="text-xs uppercase tracking-widest text-primary-deep/60 hover:text-primary transition-colors mt-2">
                        + Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
