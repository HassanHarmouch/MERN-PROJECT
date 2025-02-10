import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { addToCart, removeFromCart, resetCart } from "../../redux/features/cart/cartSlice";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { itemsPricebeforeDiscount, itemsPriceAfterDiscount, shippingPrice, taxPrice, totalPrice } = cart;

  const storedUser = JSON.parse(localStorage.getItem("userInfo"));
  const loggedInUserId = storedUser?.data?.user._id; // Extract user ID safely

  // Filter cart items belonging to the logged-in user
  const { cartItems } = cart;

  const userCartItems = cartItems.filter(
    (item) => item.userId === loggedInUserId || !item.userId
  );

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  // Reset Cart Handler
  const resetCartHandler = () => {
    dispatch(resetCart());
  };

  return (
    <>
      <div className="container flex justify-around items-start flex wrap mx-auto mt-8">
        {userCartItems.length === 0 ? (
          <div>
            Your cart is empty <Link to="/shop">Go To Shop</Link>
          </div>
        ) : (
          <>
            <div className="flex flex-col w-[80%]">
              <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>

              {userCartItems.map((item) => (
                <div key={item._id} className="flex items-enter mb-[1rem] pb-2">
                  <div className="w-[5rem] h-[5rem]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>

                  <div className="flex-1 ml-4">
                    <Link to={`/product/${item._id}`} className="text-pink-500">
                      {item.name}
                    </Link>

                    <div className="mt-2 text-white font-bold">
                      <span className="line-through text-gray-400">
                        ${item.price.toFixed(2)}
                      </span>{" "}
                      <span className="text-green-400 ml-2">
                        -{item.discount}% OFF
                      </span>
                    </div>

                    <div className="mt-2 text-black">{item.brand}</div>
                    <div className="mt-2 text-black font-bold">
                      $ {(item.price * (1 - item.discount / 100)).toFixed(2)}
                    </div>
                  </div>

                  <div className="w-24">
                    <select
                      className="w-full p-1 border rounded text-black"
                      value={item.qty}
                      onChange={(e) =>
                        addToCartHandler(item, Number(e.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <button
                      className="text-red-500 mr-[5rem]"
                      onClick={() => removeFromCartHandler(item._id)}
                    >
                      <FaTrash className="ml-[1rem] mt-[.5rem]" />
                    </button>
                  </div>
                </div>
              ))}

              <div className="mt-8 w-[40rem]">
                <div className="p-4 rounded-lg">
                  <h2 className="text-xl font-semibold mb-2">
                    Items ({userCartItems.reduce((acc, item) => acc + item.qty, 0)})
                  </h2>

                  <div className="text-2xl font-bold">
                    ${" "}
                    {userCartItems
                      .reduce(
                        (acc, item) =>
                          acc + item.qty * ((item.price * (100 - item.discount)) / 100),
                        0
                      )
                      .toFixed(2)}
                  </div>

                  <div className="text-2xl font-bold">
                    Subtotal: ${itemsPricebeforeDiscount}
                  </div>
                  <div className="text-2xl font-bold">
                    Discount: -${(itemsPricebeforeDiscount - itemsPriceAfterDiscount).toFixed(2)}
                  </div>
                  <div className="text-2xl font-bold">
                    Shipping: ${shippingPrice}
                  </div>
                  <div className="text-2xl font-bold">
                    Taxes: ${taxPrice}
                  </div>
                  <div className="text-2xl font-bold">
                    <span className="font-bold">Final Total:</span> ${totalPrice}
                  </div>

                  <button
                    className="bg-pink-500 mt-4 py-2 px-4 rounded-full text-lg w-full"
                    disabled={userCartItems.length === 0}
                    onClick={checkoutHandler}
                  >
                    Proceed To Checkout
                  </button>

                  {/* Reset Cart Button */}
                  <button
                    className="bg-red-500 mt-4 py-2 px-4 rounded-full text-lg w-full"
                    onClick={resetCartHandler}
                  >
                    Reset Cart
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
