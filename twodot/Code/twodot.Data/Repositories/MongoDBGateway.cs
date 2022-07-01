using twodot.Data.Interfaces;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Security.Authentication;
using System.Text;

namespace twodot.Data.Repositories
{
    public class MongoDBGateway : IGateway
    {
        private IConfiguration _configuration;
        public MongoDBGateway(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public IMongoDatabase GetMongoDB()
        {
            string url = _configuration.GetSection("Cosmos")["URL"];
            string userName = _configuration.GetSection("Cosmos")["UserName"];
            string password = _configuration.GetSection("Cosmos")["Password"];
            string database = _configuration.GetSection("Cosmos")["Database"];
            string urlPrefix = _configuration.GetSection("Cosmos")["urlPrefix"];
            MongoClient client = new MongoClient($"{urlPrefix}://{userName}:{password}@{url}/{database}?retryWrites=true&w=majority");
            return client.GetDatabase(database);

        }
    }
}
