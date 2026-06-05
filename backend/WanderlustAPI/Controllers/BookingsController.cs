namespace WanderlustAPI.Controllers;

using Microsoft.AspNetCore.Mvc;
using WanderlustAPI.Data;
using WanderlustAPI.Models.Domain;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]
public class BookingsController(WanderlustDbContext dbContext) : ControllerBase
{
    public class CreateBookingDto
    {
        public int UserIntID { get; set; }
        public int TourID { get; set; }
        public DateTime BookingDate { get; set; }
        public int NumberOfPeople { get; set; }
        public decimal TotalPrice { get; set; }
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateBookingDto request)
    {
        var booking = new Booking
        {
            UserIntID = request.UserIntID,
            TourID = request.TourID,
            BookingDate = request.BookingDate,
            NumberOfPeople = request.NumberOfPeople,
            TotalPrice = request.TotalPrice,
            Status = "Chờ xác nhận"
        };

        await dbContext.Bookings.AddAsync(booking);
        await dbContext.SaveChangesAsync();

        return Ok(new { success = true, message = "Đặt tour thành công!", bookingId = booking.BookingID });
    }

    [HttpGet("user/{userId}")]
    public async Task<IActionResult> GetUserBookings(int userId)
    {
        var bookings = await dbContext.Bookings
            .Where(b => b.UserIntID == userId)
            .OrderByDescending(b => b.BookingDate)
            .Join(dbContext.Tours, 
                b => b.TourID, 
                t => t.TourID, 
                (b, t) => new 
                {
                    BookingID = b.BookingID,
                    TourName = t.TourName,
                    ImageUrl = t.ImageUrl,
                    BookingDate = b.BookingDate,
                    NumberOfPeople = b.NumberOfPeople,
                    TotalPrice = b.TotalPrice,
                    Status = b.Status
                })
            .ToListAsync();

        return Ok(bookings);
    }

    [HttpPut("{id}/pay")]
    public async Task<IActionResult> PayBooking(int id)
    {
        var booking = await dbContext.Bookings.FindAsync(id);
        
        if (booking == null)
        {
            return NotFound(new { message = "Không tìm thấy đơn đặt tour." });
        }

        booking.Status = "Thành công";
        await dbContext.SaveChangesAsync();

        return Ok(new { success = true, message = "Thanh toán thành công!", bookingId = booking.BookingID });
    }
}
