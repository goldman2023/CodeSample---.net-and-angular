using Dreamer.Client.Repository.Interface;
using Dreamer.Shared.Models;
using System.Net.Http.Json;

namespace Dreamer.Client.Repository.Services
{
    public class CountryRepository : ICountry
    {
        private readonly HttpClient _httpClient;

        public CountryRepository(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }
        public async Task<HttpResponseMessage> Delete(Country model)
        {
            var result = await _httpClient.PostAsJsonAsync<Country>("api/Country/Delete", model);
            return result;
        }

        public async Task<IList<Country>> GetAll()
        {
            var views = await _httpClient.GetFromJsonAsync<List<Country>>("api/Country/GetAll");
            return views;
        }

        public async Task<Country> GetbyId(int id)
        {
            return await _httpClient.GetFromJsonAsync<Country>($"api/Country/GetbyId/{id}");
        }

        public async Task<HttpResponseMessage> Save(Country model)
        {
            var result = await _httpClient.PostAsJsonAsync($"api/Country/Save", model);
            return result;
        }

        public async Task<HttpResponseMessage> Update(Country model)
        {
            var result = await _httpClient.PostAsJsonAsync($"api/Country/Update", model);
            return result;
        }
    }
}
