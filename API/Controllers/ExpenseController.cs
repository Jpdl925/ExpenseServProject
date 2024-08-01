using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ExpenseController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ExpenseController(AppDbContext context){
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Expenses(){
            return Ok(await _context.Expenses.AsNoTracking().ToListAsync());
        }
    }
}