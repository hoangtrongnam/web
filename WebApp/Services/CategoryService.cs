using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using WebApp.Services.Query;

namespace WebApp.Services
{
    public interface ICategoryService
    {
    }
    public class CategoryService : ICategoryService
    {
        protected string ConnectName = "DefaultConnection";
        private readonly IConfiguration _config;
        private readonly ICommandText _commandText;
        private readonly string _connStr;

        public CategoryService(IConfiguration configuration, ICommandText commandText)
        {
            _config = configuration;
            _commandText = commandText;
            _connStr = configuration.GetConnectionString(ConnectName);
        }
        public async Task<object> InsertCategory()
        {
            using(SqlConnection conn = new SqlConnection(_connStr))
            {
                conn.Open();
                try
                {
                    var id = Guid.NewGuid().ToString();
                    using(SqlCommand command = new SqlCommand(_commandText.InsertCategory, conn))
                    {
                        command.CommandType = System.Data.CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@id", id);
                        command.Parameters.AddWithValue("@name", "mai mut");
                        command.Parameters.AddWithValue("@parent_id", "cái gì đây");
                        var response = command.ExecuteNonQuery();
                        return response;
                    }
                }
                catch(Exception ex)
                {
                    throw new Exception($"lỗi {ex}");
                }
            }
        }
    }
}
