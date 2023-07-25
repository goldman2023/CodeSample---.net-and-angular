using Dreamer.Shared.Models;

namespace Dreamer.Client.Repository.Interface
{
    public interface IPayment
    {
        Task<IList<Payment>> GetAll();
        Task<HttpResponseMessage> Update(Payment model);
        Task<Payment> GetbyId(int id);
    }
}
