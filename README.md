# Số May Mắn Phong Thủy

Ứng dụng web tìm số may mắn theo phong thủy, ngũ hành và thiên can địa chi. Giúp bạn khám phá vận may của mình một cách khoa học và chính xác.

## 🎯 Tính năng

### INPUT
- ✅ Form nhập: Họ tên, ngày sinh, giới tính, tuổi
- ✅ Tùy chọn: Hướng nhà, nghề nghiệp

### LOGIC TÍNH TOÁN
- ✅ Chuyển đổi tên thành số theo âm học
- ✅ Tính ngũ hành theo năm sinh
- ✅ Kết hợp thiên can địa chi
- ✅ Áp dụng công thức số học phong thủy truyền thống

### OUTPUT
- ✅ 5-7 con số may mắn chính
- ✅ Ngày trong tuần thuận lợi
- ✅ Khung giờ tốt nhất
- ✅ Màu sắc hỗ trợ vận may
- ✅ Lời khuyên phong thủy ngắn gọn

### THIẾT KẾ
- ✅ Giao diện đơn giản, dễ sử dụng
- ✅ Màu sắc phù hợp phong thủy
- ✅ Responsive trên mobile
- ✅ Dark/Light mode
- ✅ Chia sẻ kết quả social media

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI Framework
- **Next.js 14** - Full-stack framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Hook Form** - Form handling
- **Lucide React** - Icons

### Backend
- **Node.js** - Runtime
- **Express** - API framework
- **MongoDB** - Database
- **Mongoose** - ODM

### Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Vite** - Build tool

## 🚀 Cài đặt

### Yêu cầu
- Node.js 18+ 
- npm hoặc yarn

### Bước 1: Clone repository
```bash
git clone https://github.com/your-username/lucky-number-ai.git
cd lucky-number-ai
```

### Bước 2: Cài đặt dependencies
```bash
npm install
# hoặc
yarn install
```

### Bước 3: Tạo file environment
```bash
cp .env.example .env.local
```

Cập nhật các biến môi trường trong `.env.local`:
```env
MONGODB_URI=mongodb://localhost:27017/lucky-number
JWT_SECRET=your-secret-key
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### Bước 4: Chạy development server
```bash
npm run dev
# hoặc
yarn dev
```

Truy cập [http://localhost:3000](http://localhost:3000) để xem ứng dụng.

## 📁 Cấu trúc Project

```
lucky-number-ai/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── header.tsx         # Header component
│   ├── footer.tsx         # Footer component
│   ├── lucky-number-form.tsx    # Form component
│   ├── lucky-number-result.tsx  # Result component
│   └── theme-provider.tsx       # Theme provider
├── lib/                   # Database & utilities
│   └── mongodb.ts         # MongoDB connection
├── types/                 # TypeScript types
│   └── index.ts           # Type definitions
├── utils/                 # Utility functions
│   └── feng-shui-calculator.ts  # Feng Shui logic
├── public/                # Static assets
└── package.json           # Dependencies
```

## 🔧 Scripts

```bash
# Development
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Type check
npm run type-check
```

## 🎨 Tính năng UI/UX

### Responsive Design
- Mobile-first approach
- Breakpoints: sm, md, lg, xl
- Flexible grid system

### Dark/Light Mode
- System preference detection
- Manual toggle
- Smooth transitions

### Animations
- Framer Motion animations
- Loading states
- Hover effects
- Page transitions

### Accessibility
- ARIA labels
- Keyboard navigation
- Screen reader support
- High contrast mode

## 🔮 Thuật toán Phong Thủy

### 1. Tính số từ tên
- Chuyển đổi tên thành số theo bảng âm học
- Cộng dồn và rút gọn về số đơn

### 2. Ngũ hành theo năm sinh
- Kim: 0, 1
- Thủy: 2, 3  
- Mộc: 4, 5
- Hỏa: 6, 7
- Thổ: 8, 9

### 3. Thiên can địa chi
- Tính theo năm sinh âm lịch
- Kết hợp can-chi để tạo số may mắn

### 4. Số may mắn
- Kết hợp số tên + năm sinh + ngũ hành
- Loại bỏ trùng lặp
- Giới hạn 5-7 số

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Railway
```bash
npm install -g @railway/cli
railway login
railway up
```

### Docker
```bash
docker build -t lucky-number-ai .
docker run -p 3000:3000 lucky-number-ai
```

## 🤝 Contributing

1. Fork the project
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Contact

- Email: contact@luckynumber.com
- Website: https://luckynumber.com
- GitHub: https://github.com/your-username/lucky-number-ai

## 🙏 Acknowledgments

- Phong thủy truyền thống Việt Nam
- Ngũ hành và thiên can địa chi
- Cộng đồng React/Next.js
- Tailwind CSS team

---

Made with ❤️ in Vietnam 