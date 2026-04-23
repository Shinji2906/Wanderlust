namespace WanderlustAPI.Models.Domain;

public class Blog
{
    public int BlogID { get; set; }
    public required string Title { get; set; }
    public string? Content { get; set; }
    public int UserIntID { get; set; }
    public int? TourID { get; set; }
    public decimal? Rate { get; set; }
    public string? ImgURL { get; set; }
    public string? VideoURL { get; set; }
    public string? Status { get; set; } = "Chờ duyệt";
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Navigation properties
    public User? User { get; set; }
    public Tour? Tour { get; set; }
    public ICollection<BlogComment> BlogComments { get; set; } = new List<BlogComment>();
    public ICollection<BlogLike> BlogLikes { get; set; } = new List<BlogLike>();
}
