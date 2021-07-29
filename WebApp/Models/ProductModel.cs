using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Models
{
    public class ProductModel
    {
        [JsonProperty("id")]
        public string Id { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("description")]
        public string Description { get; set; }

        [JsonProperty("category")]
        public CategoryModel Category { get; set; }

        [JsonProperty("price")]
        public string Price { get; set; }

        [JsonProperty("image")]
        public string Image { get; set; }

        [JsonProperty("created_date")]
        public DateTime CreatedDate { get; set; }

        [JsonProperty("code")]
        public string Code { get; set; }

        [JsonProperty("title")]
        public string Title { get; set; }

    }
    public class TechnicalData
    {
        public string Id { get; set; }
        public string ItemId { get; set; }
        public string DataName { get; set; }
        public List<DetailTechnicalData> DetailTechnicalDatas { get; set; }
    }
    public class DetailTechnicalData
    {
        public string Id { get; set; }
        public string TechnicalDetailId { get; set; }
        public int flag { get; set; }
        public string DataDescriptionDetail { get; set; }
    }
}
