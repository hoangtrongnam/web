using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using WebApp.Models;
using WebApp.Services;

namespace WebApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductController : ControllerBase
    {

        private readonly ILogger<ProductController> _logger;
        private readonly IProductService _productService;

        public ProductController(ILogger<ProductController> logger, IProductService productService)
        {
            _logger = logger;
            _productService = productService;
        }

        [HttpPost]
        [Route("get_product")]
        public async Task<IActionResult> GetProduct(ProductModel request)
        {
            var rs = await _productService.GetProduct(request);
            return Ok(rs);
        }

        [HttpGet]
        [Route("insert_product")]
        public async Task<IActionResult> InsertProduct(ProductModel request)
        {
            try
            {
                var rs = await _productService.InsertProduct(request);
                return Ok(rs);
            }
            catch(Exception ex)
            {
                return StatusCode((int)HttpStatusCode.BadRequest, ex.Message);
            }
        }
    }
}
