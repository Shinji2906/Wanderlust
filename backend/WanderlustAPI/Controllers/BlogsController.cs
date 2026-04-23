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

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] Blog blog)
    {
        blog.CreatedAt = DateTime.UtcNow;
        await dbContext.Blogs.AddAsync(blog);
        await dbContext.SaveChangesAsync();
        return CreatedAtAction(nameof(GetAll), new { id = blog.BlogID }, blog);
    }
}
