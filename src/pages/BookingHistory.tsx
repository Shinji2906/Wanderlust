import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Calendar, Users, DollarSign, Clock, AlertCircle, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import Layout from "@/components/Layout";
import heroHome from "@/assets/hero-home.jpg";

interface Booking {
  bookingID: number;
  tourName: string;
  imageUrl: string;
  bookingDate: string;
  numberOfPeople: number;
  totalPrice: number;
  status: string;
}

const BookingHistory = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchBookings = async () => {
      try {
        const response = await fetch(`http://localhost:5092/api/Bookings/user/${user.userIntId}`);
        if (response.ok) {
          const data = await response.json();
          setBookings(data);
        }
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user, navigate]);

  const handlePayment = async (bookingId: number) => {
    try {
      const response = await fetch(`http://localhost:5092/api/Bookings/${bookingId}/pay`, {
        method: 'PUT'
      });
      
      if (response.ok) {
        toast.success("Thanh toán thành công!");
        // Update local state to reflect the change immediately
        setBookings(prevBookings => 
          prevBookings.map(booking => 
            booking.bookingID === bookingId 
              ? { ...booking, status: "Thành công" } 
              : booking
          )
        );
      } else {
        toast.error("Có lỗi xảy ra khi thanh toán. Vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Payment failed:", error);
      toast.error("Lỗi kết nối đến máy chủ.");
    }
  };

  return (
    <Layout>
      <div className="bg-secondary/30 pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Lịch Sử Đặt Tour</h1>
            <p className="font-body text-lg text-muted-foreground">Theo dõi và quản lý các chuyến đi của bạn</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-16">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-20 bg-card rounded-2xl border border-border">
            <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="font-display text-2xl font-bold mb-2">Bạn chưa đặt chuyến đi nào</h3>
            <p className="font-body text-muted-foreground mb-6">Hãy khám phá các tour du lịch hấp dẫn của chúng tôi.</p>
            <Link to="/tours" className="btn-primary inline-flex items-center">
              Khám phá Tours
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <div key={booking.bookingID} className="bg-card border border-border rounded-2xl overflow-hidden flex flex-col sm:flex-row transition-all hover:shadow-lg">
                <div className="sm:w-1/3 aspect-video sm:aspect-auto relative overflow-hidden">
                  <img
                    src={booking.imageUrl || heroHome}
                    alt={booking.tourName}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-background/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold font-body shadow-sm border border-border/50">
                      Mã đơn: #{booking.bookingID}
                    </span>
                  </div>
                </div>
                <div className="p-6 sm:w-2/3 flex flex-col justify-center">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-display text-xl font-bold leading-tight">{booking.tourName}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold font-body whitespace-nowrap ml-4 ${
                      booking.status === "Chờ xác nhận" ? "bg-amber-100 text-amber-800" :
                      booking.status === "Thành công" ? "bg-green-100 text-green-800" :
                      "bg-secondary text-foreground"
                    }`}>
                      {booking.status || "Đang xử lý"}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-muted-foreground font-body text-sm">
                      <Calendar size={16} className="text-primary" />
                      <span>{new Date(booking.bookingDate).toLocaleDateString("vi-VN")}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground font-body text-sm">
                      <Users size={16} className="text-primary" />
                      <span>{booking.numberOfPeople} người</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between border-t border-border pt-4 mt-auto">
                    <div className="flex items-center gap-2 font-display text-lg font-bold">
                      <DollarSign size={20} className="text-primary" />
                      <span>${booking.totalPrice.toLocaleString()}</span>
                    </div>
                    {booking.status === "Chờ xác nhận" && (
                      <button 
                        onClick={() => handlePayment(booking.bookingID)}
                        className="btn-primary text-sm py-2 px-4 flex items-center gap-2"
                      >
                        Thanh toán ngay
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BookingHistory;
