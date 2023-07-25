using Dreamer.Client.Repository.Interface;
using Dreamer.Shared.Models;
using System.Net.Http.Json;

namespace Dreamer.Client.Repository.Services
{
    public class CategoryService : ICategory
    {
        private readonly HttpClient _httpClient;
        public event Action OnChange;
        public CategoryService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }
        public async Task<HttpResponseMessage> Delete(Category model)
        {
            var result = await _httpClient.PostAsJsonAsync<Category>("api/Category/Delete", model);
            return result;
        }

        public async Task<IList<Category>> GetAll()
        {
            var views = await _httpClient.GetFromJsonAsync<List<Category>>("api/Category/GetAll");
            return views;
            OnChange.Invoke();
        }
        public async Task<IList<Category>> GetAllByCat(int id)
        {
            var views = await _httpClient.GetFromJsonAsync<List<Category>>($"api/Category/GetAllByCat/{id}");
            return views;
        }

        public async Task<IList<Category>> GetAllParent()
        {
            var views = await _httpClient.GetFromJsonAsync<List<Category>>("api/Category/GetAllParent");
            return views;
            OnChange.Invoke();
        }

        public async Task<Category> GetbyId(int id)
        {
            return await _httpClient.GetFromJsonAsync<Category>($"api/Category/GetbyId/{id}");
            OnChange.Invoke();
        }

        public async Task<HttpResponseMessage> Save(Category model)
        {
            var result = await _httpClient.PostAsJsonAsync($"api/Category/Save", model);
            return result;
        }

        public async Task<HttpResponseMessage> Update(Category model)
        {
            var result = await _httpClient.PostAsJsonAsync($"api/Category/Update", model);
            return result;
        }
    }
}
