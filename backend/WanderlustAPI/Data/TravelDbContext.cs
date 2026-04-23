using Microsoft.EntityFrameworkCore;
using WanderlustAPI.Models.Domain;

namespace WanderlustAPI.Data
{
    public class TravelDbContext(DbContextOptions<TravelDbContext> options) : DbContext(options)
    {
        public DbSet<Post> Posts => Set<Post>();
    }
}
