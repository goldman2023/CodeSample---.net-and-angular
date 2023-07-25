using Dreamer.Shared;

namespace Dreamer.Client.Services.CartService
{
    public interface ICartService
    {
        event Action OnChange;
        Task AddToCart(CartItem item);
        Task AddToWishCart(CartItem item);
        Task<List<CartItem>> GetCartItems();
        Task<List<CartItem>> GetCartWishItems();
        Task DeleteItem(CartItem item);
        Task DeleteWishItem(CartItem item);
        Task EmptyCart();
        Task EmptyWishCart();
        Task<string> Checkout();
    }
}
