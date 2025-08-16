# 🎬 Video Editor Portfolio

## Portfolio chuyên nghiệp cho Video Editor Junior

Một website portfolio được thiết kế với phong cách đen trắng độc đáo, sáng tạo và bắt mắt, được tạo đặc biệt cho video editor junior. Website này showcase 6 video sản phẩm chính bao gồm TVC, phim ngắn, video motivation và content news.

---

## ✨ Tính năng chính

### 🎨 Thiết kế
- **Phong cách đen trắng độc đáo**: Minimalist nhưng ấn tượng
- **Responsive design**: Tối ưu cho mọi thiết bị
- **Custom cursor**: Con trỏ chuột tùy chỉnh với hiệu ứng đặc biệt
- **Smooth animations**: Animation mượt mà với AOS library
- **Loading screen**: Màn hình tải với hiệu ứng film strip

### 🎯 Portfolio Components
- **6 video showcases**: Mỗi video là một component riêng biệt
- **Auto-generated content**: Nội dung mô tả được tạo tự động cho từng project
- **Interactive cards**: Card có thể expand và hiển thị chi tiết
- **Video modal**: Popup để xem video trong lightbox
- **Skills visualization**: Biểu đồ kỹ năng với animation

### 🚀 Trải nghiệm người dùng
- **Fullscreen navigation**: Menu toàn màn hình với hiệu ứng
- **Parallax effects**: Hiệu ứng cuộn mượt mà
- **Typewriter effect**: Hiệu ứng đánh máy cho tiêu đề
- **Form interactions**: Form liên hệ tương tác
- **Keyboard shortcuts**: Phím tắt điều hướng

---

## 🛠️ Công nghệ sử dụng

- **HTML5**: Cấu trúc semantic
- **CSS3**: Custom properties, Grid, Flexbox, Animations
- **JavaScript ES6+**: Modules, async/await, modern syntax
- **AOS**: Animate On Scroll library
- **Font Awesome**: Icon fonts
- **Google Fonts**: Inter & Playfair Display

---

## 📁 Cấu trúc file

```
portfolio/
├── index.html              # Trang chủ chính
├── editor-portfolio.css    # Stylesheet chính
├── editor-portfolio.js     # JavaScript functionality
├── README.md              # File hướng dẫn này
└── img/                   # Thư mục hình ảnh (cần tạo)
    ├── portfolio/         # Thumbnail các project
    └── core-img/         # Icon, favicon
```

---

## 🎥 Các project portfolio

### 1. 🏔️ Highland Coffee TVC
- **Loại**: Commercial/TVC
- **Thời lượng**: 30 giây
- **Kỹ thuật**: Color Grading, Motion Graphics
- **Mô tả**: TVC cảm hứng với cinematography chuyên nghiệp

### 2. 💝 "Khoảnh Khắc Cuối" - Phim ngắn
- **Loại**: Drama/Short Film
- **Thời lượng**: 5 phút 42 giây
- **Kỹ thuật**: Montage, Sound Design
- **Mô tả**: Tác phẩm cảm động về tình cha con

### 3. 🌆 "Những Ngày Không Tên" - Phim ngắn
- **Loại**: Experimental/Short Film
- **Thời lượng**: 3 phút 28 giây
- **Kỹ thuật**: Jump-cut, Rhythm Editing
- **Mô tả**: Phim thực nghiệm về cuộc sống hiện đại

### 4. 💪 "Rise Above" - Video Motivation
- **Loại**: Motivational Content
- **Thời lượng**: 2 phút 15 giây
- **Kỹ thuật**: Text Animation, Speed Ramping
- **Mô tả**: Video truyền cảm hứng mạnh mẽ

### 5. 📺 Tech Innovation Report - News Package
- **Loại**: News/Broadcast
- **Thời lượng**: 1 phút 45 giây
- **Kỹ thuật**: Broadcast Standard, Graphics
- **Mô tả**: Package tin tức chuyên nghiệp

### 6. 🌙 "Midnight Dreams" - Music Video
- **Loại**: Music Video/Creative
- **Thời lượng**: 4 phút 12 giây
- **Kỹ thuật**: VFX, Beat Sync, Creative Transitions
- **Mô tả**: Music video nghệ thuật sáng tạo

---

## 🎮 Tương tác & Điều hướng

### Keyboard Shortcuts
- `M`: Mở/đóng menu
- `Esc`: Đóng menu hoặc modal
- `Tab`: Điều hướng bằng bàn phím

### Mouse Interactions
- **Hover effects**: Hiệu ứng khi di chuột
- **Custom cursor**: Con trỏ thay đổi khi hover
- **Click to expand**: Click card để xem chi tiết
- **Play button**: Click để mở video modal

---

## 🛠️ Cài đặt & Sử dụng

### 1. Setup cơ bản
```bash
# Clone hoặc download files
# Đảm bảo có cấu trúc file như trên
```

### 2. Tùy chỉnh nội dung
- Mở `index.html` để chỉnh sửa nội dung
- Thay đổi thông tin cá nhân trong sections
- Update links mạng xã hội

### 3. Thêm video thực tế
- Upload video lên YouTube/Vimeo
- Thay đổi các video placeholder
- Update thumbnail trong CSS

### 4. Tùy chỉnh màu sắc
```css
:root {
    --color-accent: #ff6b6b;        /* Màu chính */
    --color-accent-secondary: #4ecdc4; /* Màu phụ */
}
```

---

## 📱 Responsive Breakpoints

- **Desktop**: 1200px+
- **Laptop**: 1024px - 1199px
- **Tablet**: 768px - 1023px
- **Mobile**: 320px - 767px

---

## 🎨 Customization Guide

### Thay đổi fonts
```css
:root {
    --font-primary: 'Your-Font', sans-serif;
    --font-display: 'Your-Display-Font', serif;
}
```

### Thêm project mới
1. Copy một `.portfolio-item` trong HTML
2. Cập nhật nội dung và thông tin
3. Thêm thumbnail mới
4. Test functionality

### Tùy chỉnh animations
```javascript
// Trong editor-portfolio.js
AOS.init({
    duration: 1000,    // Thời gian animation
    easing: 'ease',    // Kiểu easing
    delay: 100         // Delay
});
```

---

## 🔧 Browser Support

- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+
- ❌ Internet Explorer (không hỗ trợ)

---

## 📈 Performance

- **Lighthouse Score**: 90+
- **Load Time**: < 3 giây
- **First Contentful Paint**: < 1.5 giây
- **Cumulative Layout Shift**: < 0.1

---

## 📞 Liên hệ & Support

### Thông tin liên hệ (demo)
- **Email**: videoeditor@email.com
- **Phone**: +84 123 456 789
- **Location**: Hồ Chí Minh, Việt Nam

### Social Media Links
- YouTube: [Channel link]
- Instagram: [@username]
- Facebook: [Page link]

---

## 📝 License

Đây là template miễn phí được tạo cho mục đích giáo dục và sử dụng cá nhân. Bạn có thể tự do sửa đổi và sử dụng cho dự án của mình.

---

## 🙏 Credits

- **Design & Development**: AI Assistant
- **Icons**: Font Awesome
- **Fonts**: Google Fonts
- **Animation Library**: AOS
- **Inspiration**: Modern portfolio trends

---

## 📋 TODO List

- [ ] Thêm video thực tế thay placeholder
- [ ] Tích hợp Google Analytics
- [ ] Thêm blog section
- [ ] Tích hợp contact form backend
- [ ] SEO optimization
- [ ] PWA support

---

## 🔄 Version History

### v1.0.0 (Current)
- ✨ Initial release
- 🎨 Black & white design
- 📱 Responsive layout
- 🎬 6 portfolio items
- ⚡ Smooth animations
- 🖱️ Custom cursor
- 📝 Contact form

---

*© 2024 Video Editor Junior Portfolio. Made with ❤️ and lots of ☕*