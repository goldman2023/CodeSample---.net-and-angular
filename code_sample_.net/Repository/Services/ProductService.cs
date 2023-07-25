using Dreamer.Client.Repository.Interface;
using Dreamer.Shared.DTOs;
using Dreamer.Shared.Models;
using System.Net.Http.Json;

namespace Dreamer.Client.Repository.Services
{
    public class ProductService : IProduct
    {
        private readonly HttpClient _httpClient;

        public ProductService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }
        public async Task<HttpResponseMessage> Delete(ProductView model)
        {
            var result = await _httpClient.PostAsJsonAsync<ProductView>("api/Product/Delete", model);
            return result;
        }

        public async Task<HttpResponseMessage> DeleteMapping(ProductPictureMapping master)
        {
            var result = await _httpClient.PostAsJsonAsync<ProductPictureMapping>("api/Product/DeleteMapping", master);
            return result;
        }

        public async Task<IList<Product>> Discountlowtohigh()
        {
            var views = await _httpClient.GetFromJsonAsync<List<Product>>("api/Product/Discountlowtohigh");
            return views;
        }

        public async Task<IList<ProductView>> GetAll()
        {
            var views = await _httpClient.GetFromJsonAsync<List<ProductView>>("api/Product/GetAll");
            return views;
        }

        public async Task<IList<Product>> GetAllByBrandId(int id)
        {
            return await _httpClient.GetFromJsonAsync<List<Product>>($"api/Product/GetAllByBrandId/{id}");
        }
        public async Task<IList<Product>> GetAllProductnewDetails(bool isActive)
        {
            return await _httpClient.GetFromJsonAsync<List<Product>>($"api/Product/GetAllProductnewDetails/{isActive}");
        }
        public async Task<IList<Product>> GetAllProductfeatureDetails(bool isActive)
        {
            return await _httpClient.GetFromJsonAsync<List<Product>>($"api/Product/GetAllProductfeatureDetails/{isActive}");
        }

        public async Task<IList<Product>>  GetAllByCategoryId(int id)
        {
            return await _httpClient.GetFromJsonAsync<List<Product>>($"api/Product/GetAllByCategoryId/{id}");
        }
        public async Task<IList<Product>> GetAllByRate(decimal FromRate , decimal ToRate)
        {
            return await _httpClient.GetFromJsonAsync<List<Product>>($"api/Product/GetAllByRate/{FromRate}/{ToRate}");
        }
        public async Task<IList<Product>> GetAllDetails()
        {
            var views = await _httpClient.GetFromJsonAsync<List<Product>>("api/Product/GetAllDetails");
            return views;
        }

        public async Task<IList<Product>> GetAllNew()
        {
            var views = await _httpClient.GetFromJsonAsync<List<Product>>("api/Product/GetAllNew");
            return views;
        }

        public async Task<IList<Product>> GetAllNewShop(bool shop)
        {
            return await _httpClient.GetFromJsonAsync<List<Product>>($"api/Product/GetAllNewShop/{shop}");
        }
        public async Task<IList<Product>> GetAllNewShopsale(bool shop)
        {
            return await _httpClient.GetFromJsonAsync<List<Product>>($"api/Product/GetAllNewShopsale/{shop}");
        }

        public async Task<IList<ProductPictureMapping>> GetAllProductMapping(int id)
        {
            var views = await _httpClient.GetFromJsonAsync<List<ProductPictureMapping>>($"api/Product/GetAllProductMapping/{id}");
            return views;
        }

        public async Task<IList<Product>> GetAllProductSearch(int areaid, string productname)
        {
            var result = await _httpClient.GetFromJsonAsync<List<Product>>($"api/Product/GetAllProductSearch/{areaid}/{productname}");
            return result;
        }
        public async Task<IList<Product>> GetAllProductSearchall(int areaid)
        {
            var result = await _httpClient.GetFromJsonAsync<List<Product>>($"api/Product/GetAllProductSearchall/{areaid}");
            return result;
        }

        public async Task<IList<Product>> GetAllSales()
        {
            var views = await _httpClient.GetFromJsonAsync<List<Product>>("api/Product/GetAllSales");
            return views;
        }

        public async Task<IList<ProductView>> GetAllStore()
        {
            var views = await _httpClient.GetFromJsonAsync<List<ProductView>>("api/Product/GetAllStore");
            return views;
        }

        public async Task<ProductView> GetbydetailsId(int id)
        {
            var views = await _httpClient.GetFromJsonAsync<ProductView>($"api/Product/GetbydetailsId/{id}");
            return views;
        }

        public async Task<Product> GetbyId(int id)
        {
            var views = await _httpClient.GetFromJsonAsync<Product>($"api/Product/GetbyId/{id}");
            return views;
        }

        public async Task<IList<Product>> GetSlider()
        {
            var views = await _httpClient.GetFromJsonAsync<List<Product>>("api/Product/GetSlider");
            return views;
        }

        public async Task<IList<UserDTO>> GetUser()
        {
            var views = await _httpClient.GetFromJsonAsync<List<UserDTO>>("api/Product/GetUser");
            return views;
        }

        public async Task<IList<Product>> Hightolow()
        {
            var views = await _httpClient.GetFromJsonAsync<List<Product>>("api/Product/Hightolow");
            return views;
        }

        public async Task<IList<Product>> Lowtohigh()
        {
            var views = await _httpClient.GetFromJsonAsync<List<Product>>("api/Product/Lowtohigh");
            return views;
        }

        public async Task<HttpResponseMessage> Save(Product model)
        {
            var result = await _httpClient.PostAsJsonAsync($"api/Product/Save", model);
            return result;
        }

        public async Task<HttpResponseMessage> SaveMapping(ProductPictureMapping model)
        {
            var result = await _httpClient.PostAsJsonAsync($"api/Product/SaveMapping", model);
            return result;
        }

        public async Task<IList<Product>> Sortatoz()
        {
            var views = await _httpClient.GetFromJsonAsync<List<Product>>("api/Product/Sortatoz");
            return views;
        }

        public async Task<HttpResponseMessage> Update(Product model)
        {
            var result = await _httpClient.PostAsJsonAsync($"api/Product/Update", model);
            return result;
        }

		public Task<IList<Product>> GetAllByCategorysubId(int id)
		{
			throw new NotImplementedException();
		}

		public async Task<IList<ProductVariation>> GetAllProductVariation(int id)
		{
            return await _httpClient.GetFromJsonAsync<List<ProductVariation>>($"api/Product/GetAllProductVariation/{id}");
        }
	}
}
