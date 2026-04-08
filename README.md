# 🌸 Aventis - Website Bán Nước Hoa

Aventis là website thương mại điện tử chuyên bán nước hoa, được xây dựng với Next.js, Node.js/Express và MongoDB.

---

## 🚀 Tech Stack

| Phần | Công nghệ |
|------|-----------|
| Frontend | Next.js (React) |
| Backend | Node.js + Express |
| Database | MongoDB |
| Version Control | Git + GitHub |

---

## 📁 Cấu trúc thư mục

```
DATN/
├── frontend/       # Next.js
└── backend/        # Node.js + Express + MongoDB
```

---

## ⚙️ Cài đặt và chạy

### Yêu cầu
- Node.js >= 18
- MongoDB
- npm hoặc yarn

### 1. Clone repo
```bash
git clone https://github.com/TuanNam102/DATN.git
cd DATN
```

### 2. Cài đặt Backend
```bash
cd backend
npm install
```

Tạo file `.env` trong thư mục backend:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/aventis
JWT_SECRET=your_secret_key
```

Chạy backend:
```bash
npm run dev
```

### 3. Cài đặt Frontend
```bash
cd frontend
npm install
```

Tạo file `.env.local` trong thư mục frontend:
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Chạy frontend:
```bash
npm run dev
```

### 4. Truy cập
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

---

## ✨ Tính năng

- 🛍️ Xem danh sách và chi tiết sản phẩm nước hoa
- 🔍 Tìm kiếm và lọc sản phẩm
- 🛒 Giỏ hàng và đặt hàng
- 👤 Đăng ký / Đăng nhập tài khoản
- 📦 Quản lý đơn hàng
- 🔐 Trang quản trị admin

---

## 🤝 Quy trình làm việc nhóm

```bash
# Tạo branch riêng
git checkout -b ten-ban

# Sau khi code xong
git add .
git commit -m "mo ta thay doi"
git push origin ten-ban
```

Tạo **Pull Request** trên GitHub để nhóm trưởng review và merge vào `main`.

---

## 👥 Thành viên nhóm

| Tên | GitHub |
|-----|--------|
| Tuấn Nam | [@TuanNam102](https://github.com/TuanNam102) |

---

## 📄 License

MIT License
