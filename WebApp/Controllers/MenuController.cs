using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApp.Models;
using WebApp.Services;

namespace WebApp.Controllers
{
    [ApiController]
    [Route("api/menu")]
    public class MenuController : ControllerBase
    {
        private readonly ILogger<ProductController> _logger;
        private readonly IMenuService _menuService;

        public MenuController(ILogger<ProductController> logger, IMenuService menuService)
        {
            _logger = logger;
            _menuService = menuService;
        }

        [HttpPost]
        [Route("get_menu")]
        public async Task<IActionResult> GetMenu(MenuModel param)
        {
            var rs = await _menuService.GetMenu(param);
            return Ok(rs);
        }
    }
}
