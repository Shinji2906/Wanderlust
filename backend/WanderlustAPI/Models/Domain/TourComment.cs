namespace WanderlustAPI.Models.Domain;

public class TourComment
{
    public int CommentID { get; set; }
    public int TourID { get; set; }
    public int UserIntID { get; set; }
    public required string CommentText { get; set; }
    public DateTime CommentDate { get; set; } = DateTime.UtcNow;

    // Navigation properties
    public Tour? Tour { get; set; }
    public User? User { get; set; }
}
