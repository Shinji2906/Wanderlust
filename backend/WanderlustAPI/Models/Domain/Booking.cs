namespace WanderlustAPI.Models.Domain;

public class Booking
{
    public int BookingID { get; set; }
    public int UserIntID { get; set; }
    public int TourID { get; set; }
    public DateTime BookingDate { get; set; } = DateTime.UtcNow;
    public int NumberOfPeople { get; set; }
    public decimal? TotalPrice { get; set; }
    public string? Status { get; set; } = "Chờ xác nhận";

    // Navigation properties
    public User? User { get; set; }
    public Tour? Tour { get; set; }
    public ICollection<Payment> Payments { get; set; } = new List<Payment>();
}
