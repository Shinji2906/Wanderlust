namespace WanderlustAPI.Models.Domain;

public class User
{
    public int UserIntID { get; set; }
    public string UserID { get; private set; } = null!; // Computed column
    public required string FullName { get; set; }
    public required string Email { get; set; }
    public required byte[] PasswordHash { get; set; }
    public string Role { get; set; } = "User";
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Navigation properties
    public ICollection<Booking> Bookings { get; set; } = new List<Booking>();
    public ICollection<Blog> Blogs { get; set; } = new List<Blog>();
    public ICollection<BlogComment> BlogComments { get; set; } = new List<BlogComment>();
    public ICollection<BlogLike> BlogLikes { get; set; } = new List<BlogLike>();
}
