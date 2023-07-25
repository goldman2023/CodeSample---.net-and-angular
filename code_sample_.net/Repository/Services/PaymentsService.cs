using Dreamer.Client.Repository.Interface;
using Dreamer.Shared.Models;
using System.Net.Http.Json;

namespace Dreamer.Client.Repository.Services
{
    public class PaymentsService : IPayment
    {
        private readonly HttpClient _httpClient;

        public PaymentsService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<IList<Payment>> GetAll()
        {
            var views = await _httpClient.GetFromJsonAsync<List<Payment>>("api/Payments/GetAll");
            return views;
        }

        public async Task<Payment> GetbyId(int id)
        {
            return await _httpClient.GetFromJsonAsync<Payment>($"api/Payments/GetbyId/{id}");
        }
        public async Task<HttpResponseMessage> Update(Payment model)
        {
            var result = await _httpClient.PostAsJsonAsync($"api/Payments/Update", model);
            return result;
        }
    }
}
