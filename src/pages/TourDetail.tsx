import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Users, Mountain, MapPin, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import Layout from "@/components/Layout";
import CommentSection from "@/components/CommentSection";
import { initialTours } from "@/data/tours";
import heroHome from "@/assets/hero-home.jpg";

const TourDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [tour, setTour] = useState<any>(initialTours.find((t) => t.id === id));
  const [loading, setLoading] = useState(!tour);
  const [guests, setGuests] = useState(2);
  const [tier, setTier] = useState("Standard");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingLoading, setBookingLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

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

  const handleBooking = async () => {
    if (!user) {
      toast.error("Vui lòng đăng nhập để đặt tour");
      navigate("/login");
      return;
    }
    if (!bookingDate) {
      toast.error("Vui lòng chọn ngày khởi hành");
      return;
    }
    
    setBookingLoading(true);
    try {
      const response = await fetch(`http://localhost:5092/api/Bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userIntID: user.userIntId,
          tourID: Number(id),
          bookingDate: new Date(bookingDate).toISOString(),
          numberOfPeople: guests,
          totalPrice: total
        }),
      });

      if (response.ok) {
        setShowModal(true);
      } else {
        toast.error("Đặt tour thất bại. Vui lòng thử lại sau.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Có lỗi xảy ra khi kết nối máy chủ.");
    } finally {
      setBookingLoading(false);
    }
  };

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
        <div className="editorial-section py-4 grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { icon: Calendar, label: "Thời lượng", value: tour.duration },
            { icon: Users, label: "Quy mô", value: tour.groupSize },
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

            {/* Comments */}
            {id && !isNaN(Number(id)) && (
              <CommentSection apiEndpoint="Tours" itemId={Number(id)} />
            )}
          </div>

          {/* Booking Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-card border border-border rounded-xl p-6 sticky top-20">
              <p className="font-body text-xs uppercase tracking-wider text-muted-foreground">Giá từ</p>
              <p className="font-display text-3xl font-bold mt-1">${tour.price.toLocaleString()} <span className="font-body text-sm font-normal text-muted-foreground">mỗi người</span></p>

              <div className="space-y-4 mt-6">
                <div>
                  <label className="label-editorial">Chọn ngày</label>
                  <input type="date" className="input-editorial" value={bookingDate} onChange={(e) => setBookingDate(e.target.value)} />
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

              <button onClick={handleBooking} disabled={bookingLoading} className="btn-primary w-full mt-4 text-center disabled:opacity-50">
                {bookingLoading ? "Đang xử lý..." : "Hoàn tất đặt chỗ"}
              </button>
              <p className="font-body text-[10px] text-center text-muted-foreground mt-3">
                Bằng cách đặt chỗ, bạn đồng ý với Điều khoản Du lịch và Chính sách Hủy của chúng tôi.
              </p>
            </div>
          </aside>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="bg-background rounded-2xl p-8 max-w-sm w-full shadow-2xl text-center transform animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={32} />
            </div>
            <h3 className="font-display text-2xl font-bold mb-2">Đặt Tour Thành Công!</h3>
            <p className="font-body text-muted-foreground mb-8">
              Cảm ơn bạn đã lựa chọn Wanderlust. Chúng tôi sẽ sớm liên hệ để xác nhận thông tin.
            </p>
            <div className="space-y-3">
              <button onClick={() => navigate("/")} className="btn-primary w-full py-3">
                Về Trang Chủ
              </button>
              <button onClick={() => setShowModal(false)} className="btn-outline w-full py-3">
                Xem Thêm Tour Khác
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default TourDetail;
