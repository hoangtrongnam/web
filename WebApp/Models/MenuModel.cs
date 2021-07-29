using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Models
{
    public class MenuModel
    {
        [JsonProperty("id")]
        public string Id { get; set; }
        [JsonProperty("parentid")]
        public string ParentId { get; set; }
        [JsonProperty("name")]
        public string Name { get; set; }
        [JsonProperty("url")]
        public string Url { get; set; }
        [JsonProperty("menus")]
        public List<MenuModel> Menus { get; set; } = new List<MenuModel>();

        [JsonProperty("actionids")]
        public List<string> ActionIds { get; internal set; }

        //[JsonProperty("actions")]
        //public List<ActionModel> Actions { get; internal set; }

        //[JsonProperty("permit")]
        //public List<PermitModel> Permits { get; internal set; }
        //[JsonProperty("icon")]
        //public string Icon { get; internal set; }
    }
}
