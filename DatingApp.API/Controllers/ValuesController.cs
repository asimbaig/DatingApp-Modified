using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DatingApp.API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace DatingApp.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class ValuesController : ControllerBase
    {
        public DataContext _context { get; }
        public ValuesController(DataContext context)
        {
            _context = context;

        }

        [AllowAnonymous]
        [HttpGet]
        // GET api/values
        public async Task<IActionResult> GetValues()
        {
            return Ok(await _context.Values.ToListAsync());
        }

        [HttpGet("{id}")]
        // GET api/values/5
        public async Task<IActionResult> Get(int id)
        {
            return Ok(await _context.Values.Where(x=>x.Id==id).FirstOrDefaultAsync());
        }

        [HttpPost]
        // POST api/values
        public void Post([FromBody]string value)
        {
        }

        [HttpPut("{id}")]
        // PUT api/values/5
        public void Put(int id, [FromBody]string value)
        {
        }

        [HttpDelete("{id}")]
        // DELETE api/values/5
        public void Delete(int id)
        {
        }
    }
}