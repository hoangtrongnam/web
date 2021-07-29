using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using WebApp.Models;
using WebApp.Services.Query;

namespace WebApp.Services
{
    public interface IMenuService
    {
        Task<List<MenuModel>> GetMenu(MenuModel request);
    }
    public class MenuService : IMenuService
    {
        protected string ConnectName = "DefaultConnection";
        private readonly IConfiguration _config;
        private readonly ICommandText _commandText;
        private readonly string _connStr;

        public MenuService(IConfiguration configuration, ICommandText commandText)
        {
            _config = configuration;
            _commandText = commandText;
            _connStr = configuration.GetConnectionString(ConnectName);
        }
        public async Task<List<MenuModel>> GetMenu(MenuModel request)
        {
            var Menus = new List<MenuModel>();
            using (SqlConnection connection = new SqlConnection(_connStr))
            {
                try
                {
                    using (SqlCommand command = new SqlCommand(_commandText.GetMenu, connection))
                    {
                        command.CommandType = System.Data.CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@pID", 1);
                        connection.Open();
                        SqlDataReader reader = command.ExecuteReader(CommandBehavior.CloseConnection);
                        while (reader.Read())
                        {
                            var Menu = new MenuModel();
                            Menu.Id = reader.IsDBNull(0) ? string.Empty : reader?.GetString(0);
                            Menu.ParentId = reader.IsDBNull(1) ? string.Empty : reader.GetString(1); 
                            Menu.Name = reader.IsDBNull(2) ? string.Empty : reader.GetString(2);
                            Menu.Url = reader.IsDBNull(3) ? string.Empty : reader.GetString(3);
                            Menus.Add(Menu);
                        }
                        foreach (MenuModel item in Menus)
                        {
                            item.Menus = await GetMenuChild(item);
                        }
                        return Menus;
                    }
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }
        public async Task<List<MenuModel>> GetMenuChild(MenuModel request)
        {
            var Menus = new List<MenuModel>();
            using (SqlConnection connection = new SqlConnection(_connStr))
            {
                try
                {
                    using (SqlCommand command = new SqlCommand(_commandText.GetMenuChild, connection))
                    {
                        command.CommandType = System.Data.CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@pParentId", request.Id);
                        connection.Open();
                        SqlDataReader reader = command.ExecuteReader(CommandBehavior.CloseConnection);
                        while (reader.Read())
                        {
                            var Menu = new MenuModel();
                            Menu.Id = reader.IsDBNull(0) ? string.Empty : reader?.GetString(0);
                            Menu.ParentId = reader.IsDBNull(1) ? string.Empty : reader.GetString(1);
                            Menu.Name = reader.IsDBNull(2) ? string.Empty : reader.GetString(2);
                            Menu.Url = reader.IsDBNull(3) ? string.Empty : reader.GetString(3);
                            Menus.Add(Menu);
                        }
                        return Menus;
                    }
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }
    }
}
