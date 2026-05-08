import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Users, Mountain, MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { initialTours } from "@/data/tours";
import heroHome from "@/assets/hero-home.jpg";

const TourDetail = () => {
  const { id } = useParams();
  const [tour, setTour] = useState<any>(initialTours.find((t) => t.id === id));
  const [loading, setLoading] = useState(!tour);
  const [guests, setGuests] = useState(2);
  const [tier, setTier] = useState("Standard");

  useEffect(() => {
    if (!tour && id && !isNaN(Number(id))) {
      fetch(`http://localhost:5092/api/Tours/${id}`)
        .then(res => {
            if (!res.ok) throw new Error("Not found");
            return res.json();
        })
        .then(data => {
            const mappedTour = {
                id: data.tourID || data.tourId,
                title: data.tourName,
                description: data.description || "An amazing journey awaits.",
                content: data.description || "An amazing journey awaits.",
                image: data.imageUrl || data.imgUrl || heroHome,
                category: data.category?.categoryName || "Cultural",
                duration: data.duration || "5 Days",
                groupSize: data.availableSlots ? `Max ${data.availableSlots} People` : "Group Tour",
                level: "Easy",
                departure: data.departureDate ? new Date(data.departureDate).toLocaleDateString() : "TBD",
                price: data.price || 0,
                rating: 4.5,
                reviewCount: 12,
                itinerary: [{ title: "Arrival", description: "Welcome to the destination. Get ready for an amazing journey." }]
            };
            setTour(mappedTour);
            setLoading(false);
        })
        .catch(err => {
            console.error(err);
            setLoading(false);
        });
    } else {
        setLoading(false);
    }
  }, [id, tour]);

  if (loading) return <Layout><div className="editorial-section py-20 text-center">Đang tải...</div></Layout>;

  if (!tour) {
    return (
      <Layout>
        <div className="editorial-section py-20 text-center">
          <h1 className="font-display text-3xl font-bold">Không tìm thấy chuyến đi</h1>
          <Link to="/tours" className="btn-primary inline-block mt-4 text-sm">Quay lại danh sách</Link>
        </div>
      </Layout>
    );
  }

  const baseFare = tour.price * guests;
  const premiumUpgrade = tier === "Premium" ? 350 : 0;
  const total = baseFare + premiumUpgrade;

  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[350px] overflow-hidden">
        <img src={tour.image} alt={tour.title} className="absolute inset-0 w-full h-full object-cover" width={1200} height={800} />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/30 to-transparent" />
        <div className="editorial-section relative z-10 flex flex-col justify-end h-full pb-8">
          <span className="category-badge mb-3">{tour.category}</span>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground">{tour.title}</h1>
        </div>
      </section>

      {/* Meta bar */}
      <div className="bg-card border-b border-border">
        <div className="editorial-section py-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Calendar, label: "Thời lượng", value: tour.duration },
            { icon: Users, label: "Quy mô", value: tour.groupSize },
            { icon: Mountain, label: "Cấp độ", value: tour.level },
            { icon: MapPin, label: "Khởi hành", value: tour.departure },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <item.icon size={16} className="text-muted-foreground" />
              <div>
                <p className="font-body text-[10px] uppercase tracking-wider text-muted-foreground">{item.label}</p>
                <p className="font-body text-sm font-medium">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="editorial-section py-12">
        <Link to="/tours" className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft size={16} /> Quay lại danh sách
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Content */}
          <div className="lg:col-span-2 space-y-10">
            <div>
              <h2 className="font-display text-2xl font-bold mb-4">Trải Nghiệm Đích Thực</h2>
              <div className="font-body text-lg leading-relaxed text-foreground/90 space-y-4">
                {tour.content.split("\n\n").map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>

            {/* Itinerary */}
            <div>
              <h2 className="font-display text-2xl font-bold mb-6">Hành Trình Chi Tiết</h2>
              <div className="space-y-8">
                {tour.itinerary.map((step, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="font-display text-4xl font-bold text-border leading-none">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="border-l border-border pl-4">
                      <h4 className="font-body text-sm font-bold uppercase tracking-wider">{step.title}</h4>
                      <p className="font-body text-sm text-muted-foreground mt-1 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-card border border-border rounded-xl p-6 sticky top-20">
              <p className="font-body text-xs uppercase tracking-wider text-muted-foreground">Giá từ</p>
              <p className="font-display text-3xl font-bold mt-1">${tour.price.toLocaleString()} <span className="font-body text-sm font-normal text-muted-foreground">mỗi người</span></p>

              <div className="space-y-4 mt-6">
                <div>
                  <label className="label-editorial">Chọn ngày</label>
                  <input type="date" className="input-editorial" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="label-editorial">Số người</label>
                    <select className="input-editorial" value={guests} onChange={(e) => setGuests(Number(e.target.value))}>
                      {[1, 2, 3, 4, 5, 6].map((n) => <option key={n} value={n}>{n} Khách</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="label-editorial">Hạng</label>
                    <select className="input-editorial" value={tier} onChange={(e) => setTier(e.target.value)}>
                      <option>Tiêu chuẩn</option>
                      <option>Cao cấp</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="border-t border-border mt-6 pt-4 space-y-2">
                <div className="flex justify-between font-body text-sm">
                  <span>Giá cơ bản (x{guests})</span>
                  <span>${baseFare.toLocaleString()}</span>
                </div>
                {premiumUpgrade > 0 && (
                  <div className="flex justify-between font-body text-sm">
                    <span>Nâng hạng cao cấp</span>
                    <span>${premiumUpgrade}</span>
                  </div>
                )}
                <div className="flex justify-between font-body text-lg font-bold border-t border-border pt-2">
                  <span>Tổng cộng</span>
                  <span className="text-primary">${total.toLocaleString()}</span>
                </div>
              </div>

              <button className="btn-primary w-full mt-4 text-center">Hoàn tất đặt chỗ</button>
              <p className="font-body text-[10px] text-center text-muted-foreground mt-3">
                Bằng cách đặt chỗ, bạn đồng ý với Điều khoản Du lịch và Chính sách Hủy của chúng tôi.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  );
};

export default TourDetail;
