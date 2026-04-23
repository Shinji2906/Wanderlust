namespace WanderlustAPI.Models.Domain;

public class Category
{
    public int CategoryID { get; set; }
    public required string CategoryName { get; set; }
    public string? Description { get; set; }
    public string? Slug { get; set; }

    // Navigation property
    public ICollection<Tour> Tours { get; set; } = new List<Tour>();
}
