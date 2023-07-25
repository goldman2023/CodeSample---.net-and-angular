using Dreamer.Shared.DTOs;
using Dreamer.Shared.Models;
using System.Net.Http.Json;

namespace Dreamer.Client.Repository
{
    public class UserRepository: IUsersRepository
    {
        private readonly HttpClient _httpClient;

        public UserRepository(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<HttpResponseMessage> AssignRole(EditRoleDTO editRole)
        {
            var result = await _httpClient.PostAsJsonAsync($"api/users/AssignRole", editRole);
            return result;
        }

        public async Task<UserInfo> GetbyId(string id)
        {
            return await _httpClient.GetFromJsonAsync<UserInfo>($"api/users/GetbyId/{id}");
        }

        public async Task<IList<RoleDTO>> GetRoles()
        {
            var views = await _httpClient.GetFromJsonAsync<List<RoleDTO>>("api/users/GetRoles");
            return views;
        }

        public async Task<List<UserDTO>> GetUsers()
        {
            var views = await _httpClient.GetFromJsonAsync<List<UserDTO>>("api/users/GetAll");
            return views;
        }

        public async Task<HttpResponseMessage> RemoveRole(EditRoleDTO editRole)
        {
            var result = await _httpClient.PostAsJsonAsync($"api/users/RemoveRole", editRole);
            return result;
        }
    }
}
