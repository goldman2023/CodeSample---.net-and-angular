using Blazored.LocalStorage;
using Dreamer.Client.Repository.Interface;
using Dreamer.Shared;
using System.Net.Http.Json;

namespace Dreamer.Client.Services.CartService
{
    public class CartService : ICartService
    {
        private readonly ILocalStorageService _localStorage;
        private readonly IProduct _productService;
        private readonly HttpClient _http;

        public event Action OnChange;

        public CartService(
            ILocalStorageService localStorage,
            IProduct productService,
            HttpClient http)
        {
            _localStorage = localStorage;
            _productService = productService;
            _http = http;
        }

        public async Task AddToCart(CartItem item)
        {
            var cart = await _localStorage.GetItemAsync<List<CartItem>>("cart");
            if (cart == null)
            {
                cart = new List<CartItem>();
            }

            var sameItem = cart
                .Find(x => x.ProductId == item.ProductId && x.CategoryId == item.CategoryId);
            if (sameItem == null)
            {
                cart.Add(item);
            }
            else
            {
                sameItem.Quantity += item.Quantity;
            }

            await _localStorage.SetItemAsync("cart", cart);
            OnChange.Invoke();
        }

        public async Task<List<CartItem>> GetCartItems()
        {
            var cart = await _localStorage.GetItemAsync<List<CartItem>>("cart");
            if (cart == null)
            {
                return new List<CartItem>();
            }
            return cart;
        }

        public async Task DeleteItem(CartItem item)
        {
            var cart = await _localStorage.GetItemAsync<List<CartItem>>("cart");
            if (cart == null)
            {
                return;
            }

            var cartItem = cart.Find(x => x.ProductId == item.ProductId && x.CategoryId == item.CategoryId);
            cart.Remove(cartItem);

            await _localStorage.SetItemAsync("cart", cart);
            OnChange.Invoke();
        }

        public async Task EmptyCart()
        {
            await _localStorage.RemoveItemAsync("cart");
            OnChange.Invoke();
        }

        public async Task AddToWishCart(CartItem item)
        {
            var cart = await _localStorage.GetItemAsync<List<CartItem>>("wishcart");
            if (cart == null)
            {
                cart = new List<CartItem>();
            }

            var sameItem = cart
                .Find(x => x.ProductId == item.ProductId && x.CategoryId == item.CategoryId);
            if (sameItem == null)
            {
                cart.Add(item);
            }
            else
            {
                sameItem.Quantity += item.Quantity;
            }

            await _localStorage.SetItemAsync("wishcart", cart);
            OnChange.Invoke();
        }

        public async Task<List<CartItem>> GetCartWishItems()
        {
            var cart = await _localStorage.GetItemAsync<List<CartItem>>("wishcart");
            if (cart == null)
            {
                return new List<CartItem>();
            }
            return cart;
        }

        public async Task DeleteWishItem(CartItem item)
        {
            var cart = await _localStorage.GetItemAsync<List<CartItem>>("wishcart");
            if (cart == null)
            {
                return;
            }

            var cartItem = cart.Find(x => x.ProductId == item.ProductId && x.CategoryId == item.CategoryId);
            cart.Remove(cartItem);

            await _localStorage.SetItemAsync("wishcart", cart);
            OnChange.Invoke();
        }

        public async Task EmptyWishCart()
        {
            await _localStorage.RemoveItemAsync("wishcart");
            OnChange.Invoke();
        }

        public async Task<string> Checkout()
        {
            var result = await _http.PostAsJsonAsync("api/payments/checkout", await GetCartItems());
            var url = await result.Content.ReadAsStringAsync();
            return url;
        }
    }
}
