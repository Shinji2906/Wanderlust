namespace WanderlustAPI.Models.Domain;

public class BlogLike
{
    public int BlogID { get; set; }
    public int UserIntID { get; set; }
    public DateTime LikeDate { get; set; } = DateTime.UtcNow;

    // Navigation properties
    public Blog? Blog { get; set; }
    public User? User { get; set; }
}
