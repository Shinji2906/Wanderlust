namespace WanderlustAPI.Models.Domain;

public class BlogComment
{
    public int CommentID { get; set; }
    public int BlogID { get; set; }
    public int UserIntID { get; set; }
    public required string CommentText { get; set; }
    public DateTime CommentDate { get; set; } = DateTime.UtcNow;

    // Navigation properties
    public Blog? Blog { get; set; }
    public User? User { get; set; }
}
