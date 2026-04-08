import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center flex-col gap-6 text-center px-4">
      <h1 className="text-8xl font-headline italic text-white/50">404</h1>
      <h2 className="text-3xl font-headline text-white">Không tìm thấy trang</h2>
      <p className="text-white/70 max-w-md">
        Trang bạn đang tìm kiếm có thể đã bị xóa, chuyển đi, hoặc không tồn tại.
      </p>
      <Link 
        to="/" 
        className="px-8 py-3 bg-white text-primary-deep font-label uppercase tracking-widest text-sm hover:bg-white/90 transition-all rounded-full font-bold mt-4"
      >
        Trở về Trang chủ
      </Link>
    </div>
  );
};

export default NotFound;
