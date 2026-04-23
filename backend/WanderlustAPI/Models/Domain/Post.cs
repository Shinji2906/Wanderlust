namespace WanderlustAPI.Models.Domain
{
    public class Post
    {
        public Guid Id { get; set; }
        public required string Title { get; set; } // 'required' bắt buộc nhập từ C# 12
        public string? Content { get; set; }
        public string? Location { get; set; }
        public string? ImageUrl { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
