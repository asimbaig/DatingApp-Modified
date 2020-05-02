using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.API.Data;
using DatingApp.API.DTOs;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace DatingApp.API.Controllers
{
    [AllowAnonymous]
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        //private readonly IAuthRepository _repo;
        private readonly IConfiguration _config;
        private readonly IMapper _mapper;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        public AuthController(IConfiguration config, IMapper mapper,
                            UserManager<User> userManager, SignInManager<User> signInManager)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _config = config;
            //_repo = repo;
            _mapper = mapper;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDto userForLoginDto)
        {
            var user = await _userManager.FindByNameAsync(userForLoginDto.Username);

            var result = await _signInManager
                .CheckPasswordSignInAsync(user, userForLoginDto.Password, false);

            if (result.Succeeded)
            {
                var appUser = await _userManager.Users.Include(p => p.Photos)
                    .FirstOrDefaultAsync(u => u.NormalizedUserName == userForLoginDto.Username.ToUpper());

                var userToReturn = _mapper.Map<UserForListDto>(appUser);

                return Ok(new
                {
                    token = GenerateJwtToken(appUser).Result,
                    user = userToReturn
                });
            }

            return Unauthorized();
        }

        private async Task<string> GenerateJwtToken(User user)
        {
            // var claims = new List<Claim>
            // {
            //     new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            //     new Claim(ClaimTypes.Name, user.UserName)
            // };

            // var roles = await _userManager.GetRolesAsync(user);

            // foreach (var role in roles)
            // {
            //     claims.Add(new Claim(ClaimTypes.Role, role));
            // }
            var claims = new List<Claim>{
		                        new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
		                        new Claim(ClaimTypes.Name, user.UserName)
	                        };
	        var roles = await _userManager.GetRolesAsync(user);
	
	        foreach(var role in roles)
            {
		        claims.Add(new Claim(ClaimTypes.Role, role));
	        }

            var key = new SymmetricSecurityKey(Encoding.UTF8
                .GetBytes(_config.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };
            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterDto userForRegisterDto)
        {
            var userToCreate = _mapper.Map<User>(userForRegisterDto);

            var result = await _userManager.CreateAsync(userToCreate, userForRegisterDto.Password);

            var userToReturn = _mapper.Map<UserForDetailedDto>(userToCreate);

            if (result.Succeeded)
            {
                return CreatedAtRoute("GetUser", 
                    new { controller = "Users", id = userToCreate.Id }, userToReturn);
            }

            return BadRequest(result.Errors);
        }

    // [HttpPost("register")]
    // public async Task<IActionResult> Register(UserForRegisterDto userForRegisterDto)
    // {
    //     if (!ModelState.IsValid)
    //         return BadRequest(ModelState);


    //     userForRegisterDto.Username = userForRegisterDto.Username.ToLower();

    //     if (await _repo.UserExists(userForRegisterDto.Username))
    //         return BadRequest("Username already exists.");

    //     // var userToCreate = new User
    //     // {
    //     //     Username = userForRegisterDto.Username
    //     // };
    //     var userToCreate = _mapper.Map<User>(userForRegisterDto);

    //     var createdUser = await _repo.Register(userToCreate, userForRegisterDto.Password);

    //     // return StatusCode(201);
    //     var userToReturn = _mapper.Map<UserForDetailedDto>(createdUser);

    //     return CreatedAtRoute("GetUser", new { controller = "Users", id = createdUser.Id }, userToReturn);
    // }


    // [HttpPost("login")]
    // public async Task<IActionResult> Login(UserForLoginDto userForLoginDto)
    // {

    //     var userFromRepo = await _repo.Login(userForLoginDto.Username.ToLower(), userForLoginDto.Password);

    //     if (userFromRepo == null)
    //         return Unauthorized();

    //     var claims = new[]
    //     {
    //             new Claim(ClaimTypes.NameIdentifier, userFromRepo.Id.ToString()),
    //             new Claim(ClaimTypes.Name, userFromRepo.UserName)
    //         };

    //     var key = new SymmetricSecurityKey(Encoding.UTF8
    //         .GetBytes(_config.GetSection("AppSettings:Token").Value));

    //     var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

    //     var tokenDescriptor = new SecurityTokenDescriptor
    //     {
    //         Subject = new ClaimsIdentity(claims),
    //         Expires = DateTime.Now.AddDays(1),
    //         SigningCredentials = creds
    //     };

    //     var tokenHandler = new JwtSecurityTokenHandler();

    //     var token = tokenHandler.CreateToken(tokenDescriptor);

    //     var user = _mapper.Map<UserForListDto>(userFromRepo);

    //     return Ok(new
    //     {
    //         token = tokenHandler.WriteToken(token),
    //         user
    //     });
    // }
    }
}