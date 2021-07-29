using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;
using WebApp.Models;
using WebApp.Services.Query;


namespace WebApp.Services
{
    public interface IProductService
    {
        Task<List<ProductModel>> GetProduct(ProductModel request);
        Task<object> InsertProduct(ProductModel request);
        Task<object> InsertTechnicalData(TechnicalData request);
        Task<object> InsertDetailTechnicalData(DetailTechnicalData request);
    }
    public class ProductService : IProductService
    {
        protected string ConnectName = "DefaultConnection";
        private readonly IConfiguration _config;
        private readonly ICommandText _commandText;
        private readonly string _connStr;

        public ProductService(IConfiguration configuration, ICommandText commandText)
        {
            _config = configuration;
            _commandText = commandText;
            _connStr = configuration.GetConnectionString(ConnectName);
        }
        public async Task<object> InsertProduct(ProductModel request)
        {
            using (SqlConnection conn = new SqlConnection(_connStr))
            {
                conn.Open();
                try
                {
                    using (SqlCommand command = new SqlCommand(_commandText.InsertProduct, conn))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@id", request.Id);
                        command.Parameters.AddWithValue("@name", request.Name);
                        command.Parameters.AddWithValue("@description", request.Description);
                        command.Parameters.AddWithValue("@category_id", request.Category == null ? "" : request.Category.Id);
                        command.Parameters.AddWithValue("@image", request.Image);
                        command.Parameters.AddWithValue("@created_date", DateTime.Now);
                        command.Parameters.AddWithValue("@code", request.Code);
                        command.Parameters.AddWithValue("@title", request.Title);
                        command.Parameters.AddWithValue("@price", request.Price);
                        var response = command.ExecuteNonQuery();
                        return response;
                    }
                }
                catch (Exception ex)
                {
                    throw new Exception($"lỗi {ex}");
                }
            }
        }
        public async Task<object> InsertTechnicalData(TechnicalData request)
        {
            using (SqlConnection conn = new SqlConnection(_connStr))
            {
                conn.Open();
                try
                {
                    var id = Guid.NewGuid().ToString();
                    using (SqlCommand command = new SqlCommand(_commandText.InsertTechnicalData, conn))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@id", request.Id);
                        command.Parameters.AddWithValue("@product_id", request.ItemId);
                        command.Parameters.AddWithValue("@name", request.DataName);
                        var response = command.ExecuteNonQuery();
                        return response;
                    }
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }
        public async Task<object> InsertDetailTechnicalData(DetailTechnicalData request)
        {
            using (SqlConnection conn = new SqlConnection(_connStr))
            {
                conn.Open();
                try
                {
                    var id = Guid.NewGuid().ToString();
                    using (SqlCommand command = new SqlCommand(_commandText.InsertDetailTechnicalData, conn))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@id", request.Id);
                        command.Parameters.AddWithValue("@technical_data_id", request.TechnicalDetailId);
                        command.Parameters.AddWithValue("@description", request.DataDescriptionDetail);
                        var response = command.ExecuteNonQuery();
                        return response;
                    }
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }
        public async Task<List<ProductModel>> GetProduct(ProductModel request)
        {
            var Products = new List<ProductModel>();
            using (SqlConnection connection = new SqlConnection(_connStr))
            {
                try
                {
                    using (SqlCommand command = new SqlCommand(_commandText.GetProduct, connection))
                    {
                        command.CommandType = System.Data.CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@id", request.Id);
                        command.Parameters.AddWithValue("@name", request.Name);
                        command.Parameters.AddWithValue("@description", request.Description);
                        command.Parameters.AddWithValue("@category_id", request.Category == null ? "":request.Category.Id);
                        command.Parameters.AddWithValue("@price", request.Price);
                        command.Parameters.AddWithValue("@image", request.Image);
                        command.Parameters.AddWithValue("@created_date", request.CreatedDate);
                        command.Parameters.AddWithValue("@code", request.Code);
                        command.Parameters.AddWithValue("@title", request.Title);
                        connection.Open();
                        SqlDataReader reader = command.ExecuteReader(CommandBehavior.CloseConnection);
                        while (reader.Read())
                        {
                            var Product = new ProductModel();
                            Product.Id = reader.IsDBNull(0) ? string.Empty : reader.GetString(0);
                            Product.Name = reader.IsDBNull(1) ? string.Empty : reader.GetString(1);
                            Product.Description = reader.IsDBNull(2) ? string.Empty : reader.GetString(2);
                            Product.Category = new CategoryModel
                            {
                                Id = reader.IsDBNull(3) ? string.Empty : reader.GetString(3),
                                name = reader.IsDBNull(4) ? string.Empty : reader.GetString(4),
                                ParentId = reader.IsDBNull(6) ? string.Empty : reader.GetString(6)
                            };
                            Products.Add(Product);
                        }
                        return Products;
                    }
                }
                catch(Exception ex)
                {
                    throw ex;
                }
            }
        }
    }
}
