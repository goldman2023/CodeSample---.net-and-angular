using Dreamer.Shared.Models;

namespace Dreamer.Client.Repository.Interface
{
    public interface ICategory
    {
        event Action OnChange;
        Task<IList<Category>> GetAll();
        Task<IList<Category>> GetAllByCat(int id);
        Task<IList<Category>> GetAllParent();
        Task<HttpResponseMessage> Save(Category model);
        Task<HttpResponseMessage> Update(Category model);
        Task<Category> GetbyId(int id);
        Task<HttpResponseMessage> Delete(Category model);
    }
}
