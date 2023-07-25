using Dreamer.Client.Repository.Interface;
using Dreamer.Shared.Models;
using System.Net.Http.Json;

namespace Dreamer.Client.Repository.Services
{
    public class StoreService : IStore
    {
        private readonly HttpClient _httpClient;

        public StoreService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }
        public async Task<HttpResponseMessage> Delete(StoreView model)
        {
            var result = await _httpClient.PostAsJsonAsync<StoreView>("api/Store/Delete", model);
            return result;
        }

        public async Task<IList<Store>> GetAll()
        {
            var views = await _httpClient.GetFromJsonAsync<List<Store>>("api/Store/GetAll");
            return views;
        }

        public async Task<IList<StoreView>> GetAllView()
        {
            var views = await _httpClient.GetFromJsonAsync<List<StoreView>>("api/Store/GetAllView");
            return views;
        }

        public async Task<Store> GetbyId(int id)
        {
            return await _httpClient.GetFromJsonAsync<Store>($"api/Store/GetbyId/{id}");
        }

        public async Task<UserProfile> GetStoreInfo(string id)
        {
            return await _httpClient.GetFromJsonAsync<UserProfile>($"api/Store/GetStoreInfo/{id}");
        }

        public async Task<HttpResponseMessage> Save(Store model)
        {
            var result = await _httpClient.PostAsJsonAsync($"api/Store/Save", model);
            return result;
        }

        public async Task<HttpResponseMessage> Update(Store model)
        {
            var result = await _httpClient.PostAsJsonAsync($"api/Store/Update", model);
            return result;
        }
    }
}
