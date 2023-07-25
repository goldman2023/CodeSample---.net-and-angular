using Dreamer.Shared.DTOs;
using Dreamer.Shared.Models;

namespace Dreamer.Client.Repository
{
    public interface IUsersRepository
    {
        Task<HttpResponseMessage> AssignRole(EditRoleDTO editRole);
        Task<IList<RoleDTO>> GetRoles();
        Task<UserInfo> GetbyId(string id);
        Task<List<UserDTO>> GetUsers();
        Task<HttpResponseMessage> RemoveRole(EditRoleDTO editRole);
    }
}
