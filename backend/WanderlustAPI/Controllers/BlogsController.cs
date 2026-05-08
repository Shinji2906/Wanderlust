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
}
