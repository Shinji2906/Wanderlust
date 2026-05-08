import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import anime from "animejs";
import { Search, MapPin, Users } from "lucide-react";
import Layout from "@/components/Layout";
import heroHome from "@/assets/hero-home.jpg";
import tourBagan from "@/assets/tour-bagan.jpg";
import tourBali from "@/assets/tour-bali.jpg";
import tourAmalfi from "@/assets/tour-amalfi.jpg";
import blogSapa from "@/assets/blog-sapa.jpg";
import blogFood from "@/assets/blog-food.jpg";
import blogMorocco from "@/assets/blog-morocco.jpg";

const Index = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (heroRef.current) {
      anime({
        targets: heroRef.current.querySelectorAll('.animate-hero'),
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 1200,
        delay: anime.stagger(150),
        easing: 'easeOutExpo'
      });
    }
  }, []);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[80vh] min-h-[500px] overflow-hidden" ref={heroRef}>
        <img src={heroHome} alt="Rice terraces at dawn" className="absolute inset-0 w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-to-r from-teal-dark/90 via-primary/50 to-secondary/40" />
        <div className="editorial-section relative z-10 flex flex-col justify-center h-full max-w-2xl">
          <p className="animate-hero opacity-0 font-body text-xs uppercase tracking-[0.3em] text-primary-foreground/80 mb-4">Vượt Xa Thường Nhật</p>
          <h1 className="animate-hero opacity-0 font-display text-5xl md:text-7xl font-bold text-primary-foreground leading-[1.1] mb-6">
            Chinh Phục Những<br /><em className="font-normal">Chân Trời Mới</em>
          </h1>
          <p className="animate-hero opacity-0 font-body text-primary-foreground/80 text-lg leading-relaxed mb-8 max-w-lg">
            Những trải nghiệm du lịch được tuyển chọn cho những lữ khách tinh tế. Từ những thung lũng tĩnh lặng đến các kỳ quan kiến trúc, chúng tôi kể câu chuyện của thế giới qua lăng kính của bạn.
          </p>
          <div className="animate-hero opacity-0 flex flex-col sm:flex-row gap-3 bg-background/95 backdrop-blur-sm rounded-lg p-3 max-w-lg">
            <div className="flex items-center gap-2 px-3 py-2 flex-1">
              <MapPin size={16} className="text-muted-foreground" />
              <input type="text" placeholder="Điểm đến" className="bg-transparent font-body text-sm outline-none w-full text-foreground placeholder:text-muted-foreground" />
            </div>
            <div className="flex items-center gap-2 px-3 py-2 flex-1 border-t sm:border-t-0 sm:border-l border-border">
              <Users size={16} className="text-muted-foreground" />
              <input type="text" placeholder="Số người" className="bg-transparent font-body text-sm outline-none w-full text-foreground placeholder:text-muted-foreground" />
            </div>
            <Link to="/tours" className="btn-primary flex items-center gap-2 text-sm justify-center">
              <Search size={16} /> Khám phá
            </Link>
          </div>
        </div>
      </section>

      {/* Signature Collections */}
      <section className="editorial-section py-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold">
              Bộ Sưu Tập <em className="font-normal">Nổi Bật</em>
            </h2>
            <p className="font-body text-muted-foreground mt-2 max-w-lg">
              Những hành trình được chọn lọc kỹ lưỡng, định hình trải nghiệm du lịch đích thực. Nơi sự sang trọng hòa quyện cùng bản sắc tại mọi ngóc ngách trên thế giới.
            </p>
          </div>
          <Link to="/tours" className="font-body text-sm text-primary font-medium mt-4 md:mt-0 hover:underline">
            Xem tất cả chuyến đi →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link to="/tours/bagan-kingdom" className="group relative rounded-xl overflow-hidden aspect-[3/4]">
            <img src={tourBagan} alt="Bagan temples" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" width={800} height={1000} />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-primary-foreground">
              <span className="category-badge mb-3">Đắm Chìm Văn Hóa</span>
              <h3 className="font-display text-2xl font-bold mt-2">Vương Quốc Bagan Huyền Bí</h3>
              <p className="font-body text-sm opacity-80 mt-1">7 Ngày · từ $3,100</p>
            </div>
          </Link>

          <div className="grid grid-rows-2 gap-6">
            <Link to="/tours/bali-sanctuary" className="group relative rounded-xl overflow-hidden">
              <img src={tourBali} alt="Bali retreat" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" width={800} height={600} />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/70 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-primary-foreground">
                <span className="font-body text-xs uppercase tracking-wider opacity-80">Mới</span>
                <h3 className="font-display text-lg font-bold">Khu Nghỉ Dưỡng Tôn Nghiêm Bali</h3>
                <p className="font-body text-xs opacity-80">Tìm sự bình yên giữa lòng rừng rậm Ubud</p>
              </div>
            </Link>
            <Link to="/tours/amalfi-shores" className="group relative rounded-xl overflow-hidden">
              <img src={tourAmalfi} alt="Amalfi Coast" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" width={800} height={600} />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/70 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-primary-foreground">
                <h3 className="font-display text-lg font-bold">Lãng Khách Bờ Biển Amalfi</h3>
                <p className="font-body text-xs opacity-80">Khám phá những con đường ẩn giấu ở Nam Ý</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Journal Preview */}
      <section className="editorial-section py-20 border-t border-border">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="font-display text-3xl font-bold">Nhật Ký <em className="font-normal">Hành Trình</em></h2>
            <p className="font-body text-xs uppercase tracking-[0.2em] text-muted-foreground mt-1">Những Câu Chuyện Bất Ngờ</p>
          </div>
          <Link to="/blogs" className="font-body text-sm text-primary font-medium hover:underline">Tất cả bài viết →</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { img: blogSapa, title: "Ruộng Bậc Thang Ngọc Bích Sapa", cat: "Điểm Đến", time: "8 phút", id: "emerald-terraces-sapa" },
            { img: blogFood, title: "Cội Nguồn Hương Vị Địa Trung Hải", cat: "Ẩm Thực & Văn Hóa", time: "6 phút", id: "mediterranean-flavor" },
            { img: blogMorocco, title: "Những Con Hẻm Ẩn Giấu Ở Chefchaouen", cat: "Điểm Đến", time: "5 phút", id: "chefchaouen-dreams" },
          ].map((post) => (
            <Link to={`/blogs/${post.id}`} key={post.id} className="group">
              <div className="rounded-lg overflow-hidden aspect-[4/3] mb-4">
                <img src={post.img} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" width={800} height={600} />
              </div>
              <span className="font-body text-xs uppercase tracking-widest text-muted-foreground">{post.cat} · {post.time}</span>
              <h3 className="font-display text-lg font-semibold mt-1 group-hover:text-primary transition-colors">{post.title}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Testimonial */}
      <section className="editorial-section py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-display text-3xl font-bold">Tiếng Nói<br /><em className="font-normal">Lữ Khách</em></h2>
          </div>
          <div className="bg-teal-dark rounded-xl p-8 text-primary-foreground">
            <p className="font-body text-4xl text-primary-foreground/30 leading-none mb-2">"</p>
            <p className="font-display text-lg italic leading-relaxed opacity-90">
              The Editorial Voyager đã thay đổi cách tôi nhìn nhận thế giới. Đó không chỉ là một chuyến đi, đó là một câu chuyện được kể lại cẩn thận, tôn trọng văn hóa và sự tĩnh lặng của những nơi chúng tôi đi qua. Quá hoàn hảo.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center font-body text-sm font-bold">SR</div>
              <div>
                <p className="font-body text-sm font-medium">Elena Rodriguez</p>
                <p className="font-body text-xs opacity-70">Giám Đốc Sáng Tạo, NYC</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-gradient-to-r from-primary to-teal-dark text-primary-foreground py-20 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/40 rounded-full blur-3xl"></div>
        <div className="editorial-section text-center max-w-2xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">Câu chuyện tiếp theo</h2>
          <p className="font-display text-2xl md:text-3xl italic text-gold mb-6">bắt đầu từ một bước chân.</p>
          <p className="font-body opacity-80 mb-8">
            Đăng ký nhận bản tin để nhận thông tin sớm nhất về các chuyến đi độc đáo, cẩm nang điểm đến bí mật, và những câu chuyện du lịch lôi cuốn.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input type="email" placeholder="Địa chỉ email của bạn" className="flex-1 px-4 py-3 rounded-md bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 font-body text-sm outline-none focus:border-primary-foreground/40" />
            <button className="bg-primary-foreground text-teal-dark px-6 py-3 rounded-md font-body font-medium text-sm hover:opacity-90 transition-opacity">
              Đăng ký
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
