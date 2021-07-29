using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Services.Query
{
    public interface ICommandText
    {
        string InsertProduct { get; }
        string GetProduct { get; }
        string InsertCategory { get; }
        string InsertTechnicalData { get; }
        string InsertDetailTechnicalData { get; }
        string GetMenu { get; }
        string GetMenuChild { get; }
    }
    public class CommandText: ICommandText
    {
        public string InsertProduct => @"[dbo].[InsertProduct]";
        public string GetProduct => @"[dbo].[GetProductList]";
        public string InsertCategory => @"";

        public string InsertTechnicalData => @"[dbo].[insert_technical_data]";

        public string InsertDetailTechnicalData => @"[dbo].[insert_detail_technical_data]";
        public string GetMenu => @"[dbo].[GetMenu]";
        public string GetMenuChild => @"[dbo].[GetMenuChild]";
    }
}
