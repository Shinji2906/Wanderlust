namespace WanderlustAPI.Controllers;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WanderlustAPI.Data;
using WanderlustAPI.Models.Domain;

[Route("api/[controller]")]
[ApiController]
public class BlogsController(WanderlustDbContext dbContext) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var blogs = await dbContext.Blogs.ToListAsync();
        return Ok(blogs);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var blog = await dbContext.Blogs.Include(b => b.User).FirstOrDefaultAsync(b => b.BlogID == id);
        if (blog == null) return NotFound();
        return Ok(blog);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] Blog blog)
    {
        blog.CreatedAt = DateTime.UtcNow;
        await dbContext.Blogs.AddAsync(blog);
        await dbContext.SaveChangesAsync();
        return CreatedAtAction(nameof(GetAll), new { id = blog.BlogID }, blog);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var blog = await dbContext.Blogs.FindAsync(id);
        if (blog == null) return NotFound();
        dbContext.Blogs.Remove(blog);
        await dbContext.SaveChangesAsync();
        return NoContent();
    }

    [HttpGet("{id}/comments")]
    public async Task<IActionResult> GetComments(int id)
    {
        var comments = await dbContext.BlogComments
            .Include(c => c.User)
            .Where(c => c.BlogID == id)
            .OrderByDescending(c => c.CommentDate)
            .Select(c => new
            {
                c.CommentID,
                c.BlogID,
                c.UserIntID,
                c.CommentText,
                c.CommentDate,
                AuthorName = c.User.FullName
            })
            .ToListAsync();
        return Ok(comments);
    }

    public class CreateCommentDto
    {
        public int UserIntID { get; set; }
        public required string CommentText { get; set; }
    }

    [HttpPost("{id}/comments")]
    public async Task<IActionResult> AddComment(int id, [FromBody] CreateCommentDto request)
    {
        var comment = new BlogComment
        {
            BlogID = id,
            UserIntID = request.UserIntID,
            CommentText = request.CommentText,
            CommentDate = DateTime.UtcNow
        };
        await dbContext.BlogComments.AddAsync(comment);
        await dbContext.SaveChangesAsync();

        var user = await dbContext.Users.FindAsync(request.UserIntID);

        return Ok(new
        {
            comment.CommentID,
            comment.BlogID,
            comment.UserIntID,
            comment.CommentText,
            comment.CommentDate,
            AuthorName = user?.FullName
        });
    }
}
