using HtmlAgilityPack;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using WebApp.Models;
using WebApp.Services.Query;

namespace WebApp.Services
{
    public interface ICrawlService
    {
        Task<string> StartCrawler(string symbol, int start, int end);
    }

    public class CrawlService : ICrawlService
    {
        protected string ConnectName = "DefaultConnection";
        private readonly IConfiguration _config;
        private readonly ICommandText _commandText;
        private readonly string _connStr;
        private readonly IProductService _productService;

        public CrawlService(IConfiguration configuration, ICommandText commandText, IProductService productService)
        {
            _config = configuration;
            _commandText = commandText;
            _connStr = configuration.GetConnectionString(ConnectName);
            _productService = productService;
        }
        public async Task<string> StartCrawler(string symbol, int start, int end)
        {

            // tạo list add list car
            //int flag = 0;
            //var Products = new List<ProductModel>();
            //var TechnicalDetails = new List<TechnicalData>();
            //var DataDescriptions = new List<DetailTechnicalData>();
            //var TechnicalDetailId = "";
            //var ItemId = Guid.NewGuid().ToString();
            //for (int j = start; j < end; j++)
            //{
            //    try
            //    {
            //        var url = "https://www.ifm.com/au/en/product/"+ symbol + j.ToString();
            //        Console.WriteLine(url);
            //        var httpClient = new HttpClient();
            //        var html = await httpClient.GetStringAsync(url);

            //        var htmlDocument = new HtmlDocument();
            //        var ImageUrl = "";
            //        var DataName = "";
            //        var DataDescription = "";
            //        htmlDocument.LoadHtml(html);

            //        var ProductName = htmlDocument.DocumentNode.Descendants("div")
            //           .Where(node => node.GetAttributeValue("class", "").Equals("item-header")).FirstOrDefault().Descendants("h1").FirstOrDefault().InnerText;

            //        var ListImageUrl = htmlDocument.DocumentNode.Descendants("div")
            //           .Where(node => node.GetAttributeValue("class", "").Equals("carousel-inner")).ToList();
            //        foreach (var picture in ListImageUrl)
            //        {
            //            ImageUrl = picture.Descendants("source").FirstOrDefault().ChildAttributes("srcset").FirstOrDefault().Value;
            //        }
            //        var divs = htmlDocument.DocumentNode.Descendants("table")
            //            .Where(node => node.GetAttributeValue("class", "").Equals("pd-table")).ToList();

            //        foreach (var div in divs)
            //        {
            //            var Title = div.Descendants("caption").FirstOrDefault().InnerText;
            //            var Description = div.Descendants("tbody").FirstOrDefault().InnerText;
            //            var tbody = div.Descendants("tbody").FirstOrDefault().Descendants("tr").ToArray();
            //            for (int i = 0; i < tbody.Count(); i++)
            //            {
            //                if (tbody[i].InnerText.Contains("Electrical data"))
            //                {
            //                    flag = 1;
            //                    TechnicalDetailId = Guid.NewGuid().ToString();
            //                    DataName = tbody[i].InnerText;
            //                    TechnicalDetails.Add(new TechnicalData { Id = TechnicalDetailId, ItemId = ItemId, DataName = DataName, DetailTechnicalDatas = DataDescriptions });
            //                }
            //                else if (tbody[i].InnerText.Contains("Inputs"))
            //                {
            //                    flag = 2;
            //                    TechnicalDetailId = Guid.NewGuid().ToString();
            //                    DataName = tbody[i].InnerText;
            //                    TechnicalDetails.Add(new TechnicalData { Id = TechnicalDetailId, ItemId = ItemId, DataName = DataName, DetailTechnicalDatas = DataDescriptions });
            //                }
            //                else if (tbody[i].InnerText.Contains("Inputs / outputs"))
            //                {
            //                    flag = 3;
            //                    TechnicalDetailId = Guid.NewGuid().ToString();
            //                    DataName = tbody[i].InnerText;
            //                    TechnicalDetails.Add(new TechnicalData { Id = TechnicalDetailId, ItemId = ItemId, DataName = DataName, DetailTechnicalDatas = DataDescriptions });
            //                }
            //                else if (tbody[i].InnerText.Contains("Outputs"))
            //                {
            //                    flag = 4;
            //                    TechnicalDetailId = Guid.NewGuid().ToString();
            //                    DataName = tbody[i].InnerText;
            //                    TechnicalDetails.Add(new TechnicalData { Id = TechnicalDetailId, ItemId = ItemId, DataName = DataName, DetailTechnicalDatas = DataDescriptions });
            //                }
            //                else if (tbody[i].InnerHtml.Contains("th"))
            //                {
            //                    flag = 0;
            //                }
            //                else if (flag == 1)
            //                {
            //                    DataDescription = tbody[i].InnerText;
            //                    DataDescriptions.Add(new DetailTechnicalData { Id = Guid.NewGuid().ToString(), TechnicalDetailId = TechnicalDetailId, flag = flag, DataDescriptionDetail = DataDescription });
            //                }
            //                else if (flag == 2)
            //                {
            //                    DataDescription = tbody[i].InnerText;
            //                    DataDescriptions.Add(new DetailTechnicalData { Id = Guid.NewGuid().ToString(), TechnicalDetailId = TechnicalDetailId, flag = flag, DataDescriptionDetail = DataDescription });
            //                }
            //                else if (flag == 3)
            //                {
            //                    DataDescription = tbody[i].InnerText;
            //                    DataDescriptions.Add(new DetailTechnicalData { Id = Guid.NewGuid().ToString(), TechnicalDetailId = TechnicalDetailId, flag = flag, DataDescriptionDetail = DataDescription });
            //                }
            //                else if (flag == 4)
            //                {
            //                    DataDescription = tbody[i].InnerText;
            //                    DataDescriptions.Add(new DetailTechnicalData { Id = Guid.NewGuid().ToString(), TechnicalDetailId = TechnicalDetailId, flag = flag, DataDescriptionDetail = DataDescription });
            //                }
            //            }
            //            Products.Add(new ProductModel { Id = ItemId, Name = ProductName, Price = "1000", Description = Description.Replace("  ", "").Replace("\n", "").Replace(",", ""), Image = ImageUrl, TechnicalDatas = TechnicalDetails });
            //        }
            //    }
            //    catch (Exception ex)
            //    {
            //        throw ex;
            //    }
            //}
            //foreach (ProductModel product in Products)
            //{
            //    await _productService.InsertProduct(product);
            //    foreach (TechnicalData technicalDetail in product.TechnicalDatas)
            //    {
            //        await _productService.InsertTechnicalData(technicalDetail);
            //        foreach (DetailTechnicalData detailTechnicalData in technicalDetail.DetailTechnicalDatas)
            //        {
            //            await _productService.InsertDetailTechnicalData(detailTechnicalData);
            //        }
            //    }
            //}
            return "crawler xong";
        }
    }
}

