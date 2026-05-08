import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-teal-dark text-primary-foreground">
    <div className="editorial-section py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <h3 className="font-display text-lg font-bold mb-3">The Editorial Voyager</h3>
          <p className="font-body text-sm opacity-80 leading-relaxed">
            Kiến tạo những trải nghiệm du lịch đẳng cấp qua lăng kính của những câu chuyện chân thực từ năm 2024.
          </p>
        </div>
        <div>
          <h4 className="font-body text-xs font-semibold uppercase tracking-widest mb-4 opacity-70">Điều Hướng</h4>
          <div className="space-y-2">
            <Link to="/" className="block font-body text-sm opacity-80 hover:opacity-100 transition-opacity">Trang Chủ</Link>
            <Link to="/tours" className="block font-body text-sm opacity-80 hover:opacity-100 transition-opacity">Chuyến Đi</Link>
            <Link to="/blogs" className="block font-body text-sm opacity-80 hover:opacity-100 transition-opacity">Nhật Ký</Link>
          </div>
        </div>
        <div>
          <h4 className="font-body text-xs font-semibold uppercase tracking-widest mb-4 opacity-70">Pháp Lý</h4>
          <div className="space-y-2">
            <span className="block font-body text-sm opacity-80">Chính Sách Bảo Mật</span>
            <span className="block font-body text-sm opacity-80">Điều Khoản Dịch Vụ</span>
            <span className="block font-body text-sm opacity-80">Liên Hệ</span>
          </div>
        </div>
        <div>
          <h4 className="font-body text-xs font-semibold uppercase tracking-widest mb-4 opacity-70">Mạng Xã Hội</h4>
          <div className="space-y-2">
            <span className="block font-body text-sm opacity-80">Instagram</span>
            <span className="block font-body text-sm opacity-80">Twitter</span>
            <span className="block font-body text-sm opacity-80">YouTube</span>
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/20 mt-12 pt-6">
        <p className="font-body text-xs opacity-60">© 2024 The Editorial Voyager. Bản quyền thuộc về chúng tôi.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
