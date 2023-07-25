using Dreamer.Shared.Models;

namespace Dreamer.Client.Repository.Interface
{
    public interface ICountry
    {
        Task<IList<Country>> GetAll();
        Task<HttpResponseMessage> Save(Country model);
        Task<HttpResponseMessage> Update(Country model);
        Task<Country> GetbyId(int id);
        Task<HttpResponseMessage> Delete(Country model);
    }
}
