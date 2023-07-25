using Dreamer.Shared.Models;

namespace Dreamer.Client.Repository.Interface
{
    public interface IArea
    {
        Task<IList<Area>> GetAll();
        Task<HttpResponseMessage> Save(Area model);
        Task<HttpResponseMessage> Update(Area model);
        Task<Area> GetbyId(int id);
        Task<HttpResponseMessage> Delete(Area model);
    }
}
