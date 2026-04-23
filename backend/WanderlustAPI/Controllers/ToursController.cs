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

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] Tour tour)
    {
        tour.CreatedAt = DateTime.UtcNow;
        await dbContext.Tours.AddAsync(tour);
        await dbContext.SaveChangesAsync();
        return CreatedAtAction(nameof(GetAll), new { id = tour.TourID }, tour);
    }
}
