import { Link } from "react-router-dom";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ProductCard = ({ product }: { product: any }) => (
  <div className="flex-none w-full md:w-[calc(25%-18px)] snap-start group">
    <div className="glass-luxury rounded-2xl overflow-hidden relative transition-all duration-500 hover:-translate-y-2">
      {product.tag && (
        <div className="absolute top-4 left-4 bg-primary text-white text-[10px] uppercase tracking-widest px-3 py-1 rounded-full z-10 shadow-lg">
          {product.tag}
        </div>
      )}
      <div className="aspect-[3/4] relative overflow-hidden">
        <img 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
          src={product.image} 
        />
        <div className="absolute inset-0 bg-primary-deep/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
          <Link 
            to={`/product/${product.id || 'kivra-solen'}`}
            className="px-8 py-3 bg-white text-primary-deep font-bold text-xs uppercase tracking-widest rounded-full scale-90 group-hover:scale-100 transition-transform"
          >
            Xem chi tiết
          </Link>
        </div>
      </div>
      <div className="p-8 text-center">
        <h4 className="font-headline text-2xl text-white italic">
          <Link to={`/product/${product.id || 'kivra-solen'}`} className="hover:opacity-80 transition-opacity">
            {product.name}
          </Link>
        </h4>
        <p className="text-white/60 font-body text-xs mt-2 uppercase tracking-widest">
          {product.oldPrice && <span className="line-through mr-2 opacity-50">{product.oldPrice}</span>}
          {product.price}
        </p>
      </div>
    </div>
  </div>
);

export default ProductCard;
