using Dreamer.Shared.DTOs;
using Dreamer.Shared.Models;

namespace Dreamer.Client.Repository.Interface
{
    public interface IProduct
    {
        Task<IList<ProductView>> GetAll();
        Task<IList<UserDTO>> GetUser();
        Task<IList<ProductView>> GetAllStore();
        Task<IList<Product>> GetAllDetails();
        Task<IList<Product>> GetAllNew();
        Task<IList<Product>> GetAllNewShop(bool shop);
        Task<IList<Product>> GetAllNewShopsale(bool shop);
        Task<IList<Product>> GetAllSales();
        Task<IList<Product>> GetAllByCategoryId(int id);
        Task<IList<Product>> GetAllByCategorysubId(int id);
        Task<IList<Product>> GetAllByRate(decimal FromRate, decimal ToRate);
        Task<IList<Product>> GetAllByBrandId(int id);
        Task<IList<Product>> GetSlider();
        Task<HttpResponseMessage> Save(Product model);
        Task<HttpResponseMessage> Update(Product model);
        Task<Product> GetbyId(int id);
        Task<ProductView> GetbydetailsId(int id);
        Task<HttpResponseMessage> Delete(ProductView model);
        Task<IList<ProductVariation>> GetAllProductVariation(int id);

        //Sorting
        Task<IList<Product>> Hightolow();
        Task<IList<Product>> Lowtohigh();
        Task<IList<Product>> Discountlowtohigh();
        Task<IList<Product>> Sortatoz();
        Task<IList<Product>> GetAllProductnewDetails(bool isActive);
        Task<IList<Product>> GetAllProductfeatureDetails(bool isActive);

        //ProductMappingMaster
        Task<HttpResponseMessage> SaveMapping(ProductPictureMapping model);
        Task<HttpResponseMessage> DeleteMapping(ProductPictureMapping master);
        Task<IList<ProductPictureMapping>> GetAllProductMapping(int id);
        
        //FrontEnd
        Task<IList<Product>> GetAllProductSearch(int areaid, string productname);
        Task<IList<Product>> GetAllProductSearchall(int areaid);
    }
}
