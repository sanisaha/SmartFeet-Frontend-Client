import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/data/store";
import { removeItemFromCart, updateQuantity } from "../app/data/cartSlice";
import { toast } from "react-toastify";
import collection1 from "../assets/images/Collection-1.webp";
import { Link } from "react-router-dom";

const Cart: React.FC = () => {
  const { items, totalItems, totalPrice } = useSelector(
    (state: RootState) => state.cart
  );

  const dispatch = useDispatch();

  const handleRemove = (productId: string) => {
    dispatch(removeItemFromCart(productId));
    toast.error("Product removed from cart");
  };

  const handleQuantityChange = (productId: string, quantity: number) => {
    // Find the product in the cart by its ID
    const cartItem = items.find((item) => item.product.id === productId);

    // Find the product size information from the product data
    const productSize = cartItem?.product.productSizes.find(
      (sizeInfo) => sizeInfo.sizeValue === cartItem?.size
    );

    // Ensure the quantity doesn't exceed the available quantity for that size
    if (productSize && quantity > productSize.quantity) {
      toast.warn(
        `Only ${productSize.quantity} items available for size ${cartItem?.size}`
      );
      return;
    }

    if (quantity < 1) {
      toast.warn("Quantity can't be less than 1");
      return;
    }

    dispatch(updateQuantity({ productId, quantity }));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-center">Your Cart</h2>

        {items.length === 0 ? (
          <p className="text-lg text-gray-600 text-center">
            Your cart is empty.
          </p>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-6">
            {/* Cart Items */}
            <div className="space-y-6">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex items-center justify-between border-b border-gray-200 pb-4 mb-4"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={collection1} // Assuming there's an image URL
                      alt={item.product.title}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div>
                      <h3 className="text-lg font-semibold">
                        {item.product.title}
                      </h3>
                      <p className="text-gray-600">{item.product.price} €</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6">
                    {/* Quantity Input */}
                    <div>
                      <label className="text-sm text-gray-600 mr-2">Qty:</label>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(
                            item.product.id,
                            parseInt(e.target.value)
                          )
                        }
                        className="w-16 border border-gray-300 rounded-md px-2 py-1 text-center"
                      />
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => handleRemove(item.product.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="mt-8 flex justify-between items-center">
              <div className="text-lg">
                <p>
                  Total Items:{" "}
                  <span className="font-semibold">{totalItems}</span>
                </p>
                <p>
                  Total Price:{" "}
                  <span className="font-semibold">{totalPrice} €</span>
                </p>
              </div>
              <Link
                to="/orders"
                className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
