namespace WanderlustAPI.Controllers;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WanderlustAPI.Data;
using WanderlustAPI.Models.Domain;

[Route("api/[controller]")]
[ApiController]
public class ToursController(WanderlustDbContext dbContext) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var tours = await dbContext.Tours.Include(t => t.Category).ToListAsync();
        return Ok(tours);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var tour = await dbContext.Tours.Include(t => t.Category).FirstOrDefaultAsync(t => t.TourID == id);
        if (tour == null) return NotFound();
        return Ok(tour);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] Tour tour)
    {
        tour.CreatedAt = DateTime.UtcNow;
        await dbContext.Tours.AddAsync(tour);
        await dbContext.SaveChangesAsync();
        return CreatedAtAction(nameof(GetAll), new { id = tour.TourID }, tour);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var tour = await dbContext.Tours.FindAsync(id);
        if (tour == null) return NotFound();
        dbContext.Tours.Remove(tour);
        await dbContext.SaveChangesAsync();
        return NoContent();
    }

    [HttpGet("{id}/comments")]
    public async Task<IActionResult> GetComments(int id)
    {
        var comments = await dbContext.TourComments
            .Include(c => c.User)
            .Where(c => c.TourID == id)
            .OrderByDescending(c => c.CommentDate)
            .Select(c => new
            {
                c.CommentID,
                c.TourID,
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
        var comment = new TourComment
        {
            TourID = id,
            UserIntID = request.UserIntID,
            CommentText = request.CommentText,
            CommentDate = DateTime.UtcNow
        };
        await dbContext.TourComments.AddAsync(comment);
        await dbContext.SaveChangesAsync();

        var user = await dbContext.Users.FindAsync(request.UserIntID);

        return Ok(new
        {
            comment.CommentID,
            comment.TourID,
            comment.UserIntID,
            comment.CommentText,
            comment.CommentDate,
            AuthorName = user?.FullName
        });
    }
}
