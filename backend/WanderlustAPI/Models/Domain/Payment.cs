namespace WanderlustAPI.Models.Domain;

public class Payment
{
    public int PaymentID { get; set; }
    public int BookingID { get; set; }
    public string? PaymentMethod { get; set; }
    public decimal? Amount { get; set; }
    public DateTime PaymentDate { get; set; } = DateTime.UtcNow;
    public string? TransactionID { get; set; }

    // Navigation properties
    public Booking? Booking { get; set; }
}
