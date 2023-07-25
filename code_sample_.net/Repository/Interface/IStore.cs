using Dreamer.Shared.Models;

namespace Dreamer.Client.Repository.Interface
{
    public interface IStore
    {
        Task<IList<Store>> GetAll();
        Task<IList<StoreView>> GetAllView();
        Task<HttpResponseMessage> Save(Store model);
        Task<HttpResponseMessage> Update(Store model);
        Task<Store> GetbyId(int id);
        Task<UserProfile> GetStoreInfo(string id);
        Task<HttpResponseMessage> Delete(StoreView model);
    }
}
