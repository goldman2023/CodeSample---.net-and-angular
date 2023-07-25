using Dreamer.Client.Repository.Interface;
using Dreamer.Shared.Models;
using System.Net.Http.Json;

namespace Dreamer.Client.Repository.Services
{
    public class AreaService : IArea
    {
        private readonly HttpClient _httpClient;

        public AreaService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }
        public async Task<HttpResponseMessage> Delete(Area model)
        {
            var result = await _httpClient.PostAsJsonAsync<Area>("api/Area/Delete", model);
            return result;
        }

        public async Task<IList<Area>> GetAll()
        {
            var views = await _httpClient.GetFromJsonAsync<List<Area>>("api/Area/GetAll");
            return views;
        }

        public async Task<Area> GetbyId(int id)
        {
            return await _httpClient.GetFromJsonAsync<Area>($"api/Area/GetbyId/{id}");
        }

        public async Task<HttpResponseMessage> Save(Area model)
        {
            var result = await _httpClient.PostAsJsonAsync($"api/Area/Save", model);
            return result;
        }

        public async Task<HttpResponseMessage> Update(Area model)
        {
            var result = await _httpClient.PostAsJsonAsync($"api/Area/Update", model);
            return result;
        }
    }
}
