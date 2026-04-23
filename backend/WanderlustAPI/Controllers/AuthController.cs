using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;
using WanderlustAPI.Data;
using WanderlustAPI.Models.Domain;

namespace WanderlustAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController(WanderlustDbContext dbContext) : ControllerBase
{
    public class LoginDto
    {
        public required string Email { get; set; }
        public required string Password { get; set; }
    }

    public class RegisterDto
    {
        public required string FullName { get; set; }
        public required string Email { get; set; }
        public required string Password { get; set; }
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto request)
    {
        var hashBytes = SHA256.HashData(Encoding.UTF8.GetBytes(request.Password));

        var user = await dbContext.Users.FirstOrDefaultAsync(u => u.Email == request.Email);

        if (user == null || !user.PasswordHash.SequenceEqual(hashBytes))
        {
            return Ok(new { success = false, message = "Email hoặc mật khẩu không đúng." });
        }

        return Ok(new
        {
            success = true,
            message = "Đăng nhập thành công!",
            user = new
            {
                UserIntId = user.UserIntID,
                UserId = user.UserID,
                user.FullName,
                user.Email,
                user.Role
            }
        });
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDto request)
    {
        if (await dbContext.Users.AnyAsync(u => u.Email == request.Email))
        {
            return Ok(new { success = false, message = "Email này đã được sử dụng." });
        }

        var hashBytes = SHA256.HashData(Encoding.UTF8.GetBytes(request.Password));

        var newUser = new User
        {
            FullName = request.FullName,
            Email = request.Email,
            PasswordHash = hashBytes,
            Role = "User",
            CreatedAt = DateTime.UtcNow
        };

        await dbContext.Users.AddAsync(newUser);
        await dbContext.SaveChangesAsync();

        return Ok(new { success = true, message = "Đăng ký thành công!" });
    }
}
