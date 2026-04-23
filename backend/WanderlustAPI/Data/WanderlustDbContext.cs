namespace WanderlustAPI.Data;

using Microsoft.EntityFrameworkCore;
using WanderlustAPI.Models.Domain;

public class WanderlustDbContext(DbContextOptions<WanderlustDbContext> options) : DbContext(options)
{
    public DbSet<User> Users => Set<User>();
    public DbSet<Category> Categories => Set<Category>();
    public DbSet<Tour> Tours => Set<Tour>();
    public DbSet<Booking> Bookings => Set<Booking>();
    public DbSet<Payment> Payments => Set<Payment>();
    public DbSet<Blog> Blogs => Set<Blog>();
    public DbSet<BlogComment> BlogComments => Set<BlogComment>();
    public DbSet<BlogLike> BlogLikes => Set<BlogLike>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // User Configuration
        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserIntID);
            entity.Property(e => e.UserID)
                  .HasComputedColumnSql("('U' + RIGHT('0000' + CAST(UserIntID AS VARCHAR(4)), 4))", stored: true);
            entity.Property(e => e.FullName).IsRequired().HasMaxLength(100);
            entity.Property(e => e.Email).IsRequired().HasMaxLength(100);
            entity.HasIndex(e => e.Email).IsUnique();
            entity.Property(e => e.Role).HasDefaultValue("User").HasMaxLength(20);
            entity.Property(e => e.CreatedAt).HasDefaultValueSql("SYSDATETIME()");
        });

        // Category Configuration
        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasKey(e => e.CategoryID);
            entity.Property(e => e.CategoryName).IsRequired().HasMaxLength(100);
        });

        // Tour Configuration
        modelBuilder.Entity<Tour>(entity =>
        {
            entity.HasKey(e => e.TourID);
            entity.Property(e => e.TourName).IsRequired().HasMaxLength(250);
            entity.Property(e => e.Price).HasColumnType("decimal(18,2)");
            entity.ToTable(t => t.HasCheckConstraint("CK_Tours_Price", "Price > 0"));
            entity.Property(e => e.Duration).HasMaxLength(50);
            entity.ToTable(t => t.HasCheckConstraint("CK_Tours_AvailableSlots", "AvailableSlots >= 0"));
            entity.Property(e => e.ImageUrl).HasMaxLength(500);
            entity.Property(e => e.CreatedAt).HasDefaultValueSql("SYSDATETIME()");

            entity.HasOne(d => d.Category)
                  .WithMany(p => p.Tours)
                  .HasForeignKey(d => d.CategoryID);
        });

        // Booking Configuration
        modelBuilder.Entity<Booking>(entity =>
        {
            entity.HasKey(e => e.BookingID);
            entity.Property(e => e.BookingDate).HasDefaultValueSql("SYSDATETIME()");
            entity.ToTable(t => t.HasCheckConstraint("CK_Bookings_NumberOfPeople", "NumberOfPeople > 0"));
            entity.Property(e => e.TotalPrice).HasColumnType("decimal(18,2)");
            entity.Property(e => e.Status).HasDefaultValue("Chờ xác nhận").HasMaxLength(50);

            entity.HasOne(d => d.User)
                  .WithMany(p => p.Bookings)
                  .HasForeignKey(d => d.UserIntID)
                  .OnDelete(DeleteBehavior.ClientSetNull);

            entity.HasOne(d => d.Tour)
                  .WithMany(p => p.Bookings)
                  .HasForeignKey(d => d.TourID)
                  .OnDelete(DeleteBehavior.ClientSetNull);
        });

        // Payment Configuration
        modelBuilder.Entity<Payment>(entity =>
        {
            entity.HasKey(e => e.PaymentID);
            entity.Property(e => e.PaymentMethod).HasMaxLength(50);
            entity.Property(e => e.Amount).HasColumnType("decimal(18,2)");
            entity.ToTable(t => t.HasCheckConstraint("CK_Payments_Amount", "Amount >= 0"));
            entity.Property(e => e.PaymentDate).HasDefaultValueSql("SYSDATETIME()");
            entity.Property(e => e.TransactionID).HasMaxLength(100);

            entity.HasOne(d => d.Booking)
                  .WithMany(p => p.Payments)
                  .HasForeignKey(d => d.BookingID);
        });

        // Blog Configuration
        modelBuilder.Entity<Blog>(entity =>
        {
            entity.HasKey(e => e.BlogID);
            entity.Property(e => e.Title).IsRequired().HasMaxLength(250);
            entity.Property(e => e.Rate).HasColumnType("decimal(2,1)");
            entity.ToTable(t => t.HasCheckConstraint("CK_Blogs_Rate", "Rate BETWEEN 0 AND 5"));
            entity.Property(e => e.Status).HasDefaultValue("Chờ duyệt").HasMaxLength(50);
            entity.Property(e => e.CreatedAt).HasDefaultValueSql("SYSDATETIME()");

            entity.HasOne(d => d.User)
                  .WithMany(p => p.Blogs)
                  .HasForeignKey(d => d.UserIntID)
                  .OnDelete(DeleteBehavior.ClientSetNull);

            entity.HasOne(d => d.Tour)
                  .WithMany(p => p.Blogs)
                  .HasForeignKey(d => d.TourID)
                  .OnDelete(DeleteBehavior.ClientSetNull);
        });

        // BlogComment Configuration
        modelBuilder.Entity<BlogComment>(entity =>
        {
            entity.HasKey(e => e.CommentID);
            entity.Property(e => e.CommentDate).HasDefaultValueSql("SYSDATETIME()");

            entity.HasOne(d => d.Blog)
                  .WithMany(p => p.BlogComments)
                  .HasForeignKey(d => d.BlogID);

            entity.HasOne(d => d.User)
                  .WithMany(p => p.BlogComments)
                  .HasForeignKey(d => d.UserIntID)
                  .OnDelete(DeleteBehavior.ClientSetNull);
        });

        // BlogLike Configuration
        modelBuilder.Entity<BlogLike>(entity =>
        {
            entity.HasKey(e => new { e.BlogID, e.UserIntID });
            entity.Property(e => e.LikeDate).HasDefaultValueSql("SYSDATETIME()");

            entity.HasOne(d => d.Blog)
                  .WithMany(p => p.BlogLikes)
                  .HasForeignKey(d => d.BlogID);

            entity.HasOne(d => d.User)
                  .WithMany(p => p.BlogLikes)
                  .HasForeignKey(d => d.UserIntID)
                  .OnDelete(DeleteBehavior.ClientSetNull);
        });
    }
}
