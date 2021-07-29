using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApp.Services;

namespace WebApp.Controllers
{
    [ApiController]
    [Route("api/crawler")]
    public class CrawlerController : ControllerBase
    {

        private readonly ILogger<CrawlerController> _logger;
        private readonly ICrawlService _crawlerService;

        public CrawlerController(ILogger<CrawlerController> logger, ICrawlService crawlerService)
        {
            _logger = logger;
            _crawlerService = crawlerService;
        }

        [HttpGet]
        [Route("start_crawler")]
        public async Task<IActionResult> StartCrawler(string symbol, int start, int end)
        {
            try
            {
                var rs = await _crawlerService.StartCrawler(symbol, start, end);
                return Ok(rs);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}