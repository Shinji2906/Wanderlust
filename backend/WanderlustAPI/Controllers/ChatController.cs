using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WanderlustAPI.Data;
using System.Linq;
using System.Threading.Tasks;

namespace WanderlustAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ChatController(WanderlustDbContext dbContext) : ControllerBase
{
    public class ChatRequest
    {
        public string Message { get; set; } = string.Empty;
    }

    [HttpPost]
    public async Task<IActionResult> Chat([FromBody] ChatRequest request)
    {
        var message = request.Message?.ToLower() ?? "";
        string reply = "";

        if (message.Contains("chào") || message.Contains("hello") || message.Contains("hi"))
        {
            reply = "Xin chào! Mình là trợ lý AI ảo của Wanderlust. Mình có thể lấy thông tin trực tiếp về các Tour du lịch và Blog thực tế từ hệ thống. Bạn đang quan tâm vấn đề nào?";
        }
        else if (message.Contains("tour"))
        {
            var tours = await dbContext.Tours.Take(3).ToListAsync();
            if (tours.Any())
            {
                var tourNames = string.Join(", ", tours.Select(t => t.TourName));
                reply = $"Tuyệt vời! Hiện tại trong hệ thống Wanderlust đang mở các Tour xịn xò như: {tourNames}. Bạn thấy ấn tượng với cái tên nào nhất?";
            }
            else
            {
                reply = "Xin lỗi, kho dữ liệu hiện chưa có bất kỳ chặng Tour nào được mở. Vui lòng quay lại tìm kiếm sau nhé!";
            }
        }
        else if (message.Contains("blog") || message.Contains("bài viết"))
        {
            var blogs = await dbContext.Blogs.OrderByDescending(b => b.CreatedAt).Take(3).ToListAsync();
            if (blogs.Any())
            {
                var blogNames = string.Join(", ", blogs.Select(b => $"'{b.Title}'"));
                reply = $"Có ngay! Những bài viết Blog gần đây nhất từ các tác giả bao gồm: {blogNames}. Đoán xem bạn sẽ muốn đọc thử bài nào?";
            }
            else
            {
                reply = "Dữ liệu báo rằng chưa có ai đăng bài viết Blog nào cả. Thật tiếc quá đi!";
            }
        }
        else if (message.Contains("biển") || message.Contains("đảo"))
        {
            var beachTours = await dbContext.Tours.Where(t => t.Description.Contains("biển") || t.TourName.Contains("biển") || t.TourName.Contains("Phú Quốc") || t.TourName.Contains("Nha Trang")).Take(2).ToListAsync();
            if (beachTours.Any()) 
            {
                reply = $"Mình tìm được vài tour đi biển cho bạn nè: {string.Join(", ", beachTours.Select(t => t.TourName))}";
            } else 
            {
                reply = "Theo kinh nghiệm chuyên gia Wanderlust: Gợi ý tuyệt vời sẽ là đi Phú Quốc hoặc Nha Trang vì mùa này biển rất êm và trong vắt nha!";
            }
        }
        else if (message.Contains("núi") || message.Contains("đà lạt") || message.Contains("sapa") || message.Contains("cao nguyên"))
        {
            reply = "Nếu bạn đam mê chinh phục độ cao: Gợi ý số 1 chắc chắn phải là Đà Lạt mộng mơ hoặc chốn bồng lai Sapa (thời tiết rét mướt rất thênh thang nhé).";
        }
        else
        {
            reply = "Thực tình câu hỏi của bạn rất thú vị, nhưng kho dữ liệu của mình chưa có câu trả lời. Bạn có thể hỏi rõ hơn về 'Tour' hoặc 'Blog' được không, hoặc thử hỏi về từ khóa 'Biển', 'Núi' xem sao?";
        }

        return Ok(new { reply });
    }
}
