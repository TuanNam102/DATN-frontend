import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const blogPosts = [
  {
    id: 1,
    title: "The Art of Layering Fragrances",
    excerpt: "Learn how to combine different scents to create your own unique signature fragrance profile.",
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800",
    date: "April 05, 2026",
    category: "Tips & Tricks"
  },
  {
    id: 2,
    title: "Sustainable Packaging in Luxury",
    excerpt: "How Borcen is leading the way in eco-friendly luxury packaging without compromising on elegance.",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800",
    date: "March 28, 2026",
    category: "Sustainability"
  },
  {
    id: 3,
    title: "The History of Sandalwood",
    excerpt: "Tracing the origins of one of the most beloved notes in perfumery from ancient times to today.",
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800",
    date: "March 15, 2026",
    category: "Ingredients"
  },
  {
    id: 4,
    title: "Spring Scents You Need Now",
    excerpt: "Fresh, floral, and vibrant fragrances to welcome the new season with a renewed spirit.",
    image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=800",
    date: "March 02, 2026",
    category: "Lifestyle"
  }
];

const Blog = () => {
  return (
    <main className="bg-white min-h-screen pt-[120px] pb-24 font-body">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Breadcrumb */}
        <nav className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.2em] text-primary-deep/40 mb-12">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="text-[8px]">/</span>
          <span className="text-primary-deep">News</span>
        </nav>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="font-heading font-medium text-5xl md:text-7xl  text-primary-deep mb-4">Tạp chí</h1>
          <p className="text-primary-deep/60 text-sm max-w-lg mx-auto leading-relaxed">
            Discover the stories behind our scents, expert tips on perfumery, and our commitment to sustainable luxury.
          </p>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-20">
          {blogPosts.map((post, idx) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="aspect-[16/10] overflow-hidden rounded-[32px] mb-8 relative">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                />
                <div className="absolute top-6 left-6">
                  <span className="bg-white/90 backdrop-blur-sm text-primary-deep text-[10px] uppercase tracking-widest font-bold px-4 py-2 rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="text-[11px] uppercase tracking-[0.2em] text-primary-deep/40 font-bold">
                  {post.date}
                </div>
                <h2 className="font-heading font-medium text-3xl md:text-4xl  text-primary-deep group-hover:text-primary transition-colors leading-tight">
                  <Link to={`/blogs/news/${post.id}`}>{post.title}</Link>
                </h2>
                <p className="text-primary-deep/60 leading-relaxed text-sm max-w-xl">
                  {post.excerpt}
                </p>
                <div className="pt-4">
                  <Link 
                    to={`/blogs/news/${post.id}`}
                    className="text-[11px] uppercase tracking-[0.2em] font-bold border-b border-primary pb-1 hover:text-primary transition-all inline-block"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-24 flex justify-center items-center gap-4">
          <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-primary-deep/40 hover:border-primary hover:text-primary transition-all">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="text-[11px] font-bold uppercase tracking-widest text-primary-deep">Page 1 of 1</span>
          <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-primary-deep/40 hover:border-primary hover:text-primary transition-all">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </main>
  );
};

export default Blog;
