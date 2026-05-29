namespace WanderlustAPI.Controllers;

using Microsoft.AspNetCore.Mvc;
using WanderlustAPI.Data;
using WanderlustAPI.Models.Domain;
using System.Threading.Tasks;

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
}
