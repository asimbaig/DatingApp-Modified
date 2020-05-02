// using System.Collections.Generic;
// using System.Linq;
// using DatingApp.API.Models;
// using Microsoft.AspNetCore.Identity;
// using Newtonsoft.Json;
// namespace DatingApp.API.Data
// {
//     public class Seed
//     {
//         private readonly UserManager<User> _userManager;
//         private readonly RoleManager<Role> _roleManager;

//         public Seed(UserManager<User> userManager, RoleManager<Role> roleManager)
//         {
//             _userManager = userManager;
//             _roleManager = roleManager;
//         }

//         public void SeedUsers()
//         {
//             if (!_userManager.Users.Any())
//             {
//                 var userData = System.IO.File.ReadAllText("Data/UserSeedData.json");
//                 var users = JsonConvert.DeserializeObject<List<User>>(userData);

//                 var roles = new List<Role>
//                 {
//                     new Role{Name = "Member"},
//                     new Role{Name = "Admin"},
//                     new Role{Name = "Moderator"},
//                     new Role{Name = "VIP"},
//                 };

//                 foreach (var role in roles)
//                 {
//                     _roleManager.CreateAsync(role).Wait();
//                 }

//                 foreach (var user in users)
//                 {
//                     _userManager.CreateAsync(user, "password").Wait();
//                     _userManager.AddToRoleAsync(user, "Member").Wait();
//                 }

//                 var adminUser = new User
//                 {
//                     UserName = "Admin"
//                 };

//                 IdentityResult result = _userManager.CreateAsync(adminUser, "password").Result;

//                 if (result.Succeeded)
//                 {
//                     var admin = _userManager.FindByNameAsync("Admin").Result;
//                     _userManager.AddToRolesAsync(admin, new[] {"Admin", "Moderator"}).Wait();
//                 }
//             }
//         }
//     }
// }
/***********************************************************************************************/

using System.Collections.Generic;
using System.Linq;
using System.Text;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;

namespace DatingApp.API.Data
{
    public static class Seed
    {
		public static void SeedUsers(UserManager<User> userManager, RoleManager<Role> roleManager)
        {
		    if(!userManager.Users.Any())
            {
			    var userData = System.IO.File.ReadAllText("Data/UserSeedData.json");
			    var users = JsonConvert.DeserializeObject<List<User>>(userData);
		
				var roles = new List<Role>{
								new Role{Name = "Member"},
								new Role{Name = "Admin"},
								new Role{Name = "Moderator"},
								new Role{Name = "VIP"}
							};

				foreach(var role in roles)
				{
					roleManager.CreateAsync(role).Wait();
				}

				foreach (var user in users)
                {
                    user.Photos.SingleOrDefault().IsApproved = true;
                    userManager.CreateAsync(user, "password").Wait();
                    userManager.AddToRoleAsync(user, "Member").Wait();
                }
				// foreach(var user in users)
                // {
				// 	userManager.CreateAsync(user,"password").Wait();
				// 	userManager.AddToRoleAsync(user,"Member");					    				
				// }

				//Create Admin	user
				var adminUser = new User{
									UserName = "Admin"
								};
				
				var result = userManager.CreateAsync(adminUser,"password").Result;
				
				if(result.Succeeded)
				{
					var admin = userManager.FindByNameAsync("Admin").Result;
					userManager.AddToRolesAsync(admin, new[] {"Admin", "Moderator"});
				}
				// context.SaveChanges();		
	     	}
	 	}
		// public static void SeedUsers(UserManager<User> userManager)
        // {
		//     if(!userManager.Users.Any())
        //     {
		// 	    var userData = System.IO.File.ReadAllText("Data/UserSeedData.json");
		// 	    var users = JsonConvert.DeserializeObject<List<User>>(userData);
		// 		foreach(var user in users)
        //         {
		// 			userManager.CreateAsync(user,"password").Wait();					    				
		// 		}
		// 		// context.SaveChanges();		
	    //  	}
	 	// }
        // public static void SeedUsers(DataContext context)
        // {
		//     if(!context.Users.Any())
        //     {
		// 	    var userData = System.IO.File.ReadAllText("Data/UserSeedData.json");
		// 	    var users = JsonConvert.DeserializeObject<List<User>>(userData);
		// 	    foreach(var user in users)
        //         {
		// 		    // byte[] passwordHash,passwordSalt;
		// 		    // CreatePasswordHash("password",out passwordHash,out passwordSalt);
				    
		// 		    // user.PasswordHash = passwordHash;
		// 		    // user.PasswordSalt = passwordSalt;

    	// 			user.UserName = user.UserName.ToLower();

	    // 			context.Users.Add(user);				
		// 	    }
		// 	    context.SaveChanges();		
		//     }
	    // }
        private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using(var hmac = new System.Security.Cryptography.HMACSHA512()){
		        passwordSalt = hmac.Key;
		        passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
            }
        }
    }
}