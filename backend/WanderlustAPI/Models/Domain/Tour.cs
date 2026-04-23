namespace WanderlustAPI.Models.Domain;

public class Tour
{
    public int TourID { get; set; }
    public required string TourName { get; set; }
    public int CategoryID { get; set; }
    public string? Description { get; set; }
    public decimal Price { get; set; }
    public string? Duration { get; set; }
    public DateTime? DepartureDate { get; set; }
    public int? AvailableSlots { get; set; }
    public string? ImageUrl { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Navigation properties
    public Category? Category { get; set; }
    public ICollection<Booking> Bookings { get; set; } = new List<Booking>();
    public ICollection<Blog> Blogs { get; set; } = new List<Blog>();
}
