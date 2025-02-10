import { useState,useEffect } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Navigation.css";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/userApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import axios from 'axios'

// import FavoritesCount from "../Products/FavoritesCount";

const Navigation = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("userInfo"));
  const loggedInUserId = storedUser?.data?.user._id; // Extract user ID safely
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    if (userInfo) {
      // Clear the cart whenever the user logs in
      console.log("useEffect!")
    }
  }, [userInfo, dispatch]);



  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };



  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
        // Call the logout API
        const response = await axios.post(
            "http://localhost:3000/api/users/logout",
            {},
            { withCredentials: true }
        );

        // Check if the logout was successful
        if (response.status === 200) {
            // Remove the token from localStorage (if used)
            localStorage.removeItem("token");
            localStorage.removeItem("userInfo");
            localStorage.removeItem("expirationTime");



          
            // Show success message
            alert("Logged out successfully!");

            // Redirect to the homepage
            navigate('/login')
                  } else {
            alert("Logout failed. Please try again.");
        }
    } catch (err) {
        // Handle specific errors
        if (err.response) {
            // Server responded with an error status code (e.g., 401, 500)
            alert(`Logout failed: ${err.response.data.message || "Server error"}`);
        } else if (err.request) {
            // Request was made but no response was received
            alert("Logout failed: No response from the server.");
        } else {
            // Something else went wrong
            alert("Logout failed: An unexpected error occurred.");
        }
        console.error("Logout error:", err);
    }
};
  return (
    <div
      style={{ zIndex: 9999 }}
      className={`${
        showSidebar ? "hidden" : "flex"
      } xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-4 text-white bg-[#000] w-[4%] hover:w-[15%] h-[100vh]  fixed `}
      id="navigation-container"
    >
      <div className="flex flex-col justify-center space-y-4">
        <Link
          to="/"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <AiOutlineHome className="mr-2 mt-[3rem]" size={26} />
          <span className="hidden nav-item-name mt-[3rem]">HOME</span>{" "}
        </Link>

        <Link
          to="/shop"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <AiOutlineShopping className="mr-2 mt-[3rem]" size={26} />
          <span className="hidden nav-item-name mt-[3rem]">SHOP</span>{" "}
        </Link>

        <Link to="/cart" className="flex relative">
          <div className="flex items-center transition-transform transform hover:translate-x-2">
            <AiOutlineShoppingCart className="mt-[3rem] mr-2" size={26} />
            <span className="hidden nav-item-name mt-[3rem]">Cart</span>{" "}
          </div>

          <div className="absolute top-9">
  {loggedInUserId && cartItems.length > 0 && (
    <span>
      <span className="px-1 py-0 text-sm text-white bg-pink-500 rounded-full">
        {cartItems.reduce((a, c) => a + c.qty, 0)}
      </span>
    </span>
  )}
</div>

        </Link>

        
        <Link to="/user-orders" className="flex relative">
          <div className="flex items-center transition-transform transform hover:translate-x-2">
            <AiOutlineShoppingCart className="mt-[3rem] mr-2" size={26} />
            <span className="hidden nav-item-name mt-[3rem]">My Orders</span>{" "}
          </div>

 

        </Link>

     
      </div>

      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="flex items-center text-gray-800 focus:outline-none"
        >
          {userInfo ? (
            <span className="text-white">{userInfo.username}</span>
          ) : (
            <></>
          )}
          {userInfo && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 ml-1 ${
                dropdownOpen ? "transform rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
              />
            </svg>
          )}
        </button>

      
              <>
              <ul>
     
            {userInfo?
            <li>
              <button
                onClick={logoutHandler}
                className="block w-full px-4 py-2 text-left hover:bg-gray-100"
              >
                Logout
              </button>
            </li> :<></>}
          </ul>
     {!userInfo ? (
        <ul>
          <li>
            <Link
              to="/login"
              className="flex items-center mt-5 transition-transform transform hover:translate-x-2"
            >
              <AiOutlineLogin className="mr-2 mt-[4px]" size={26} />
              <span className="nav-item-name">LOGIN</span>
            </Link>
          </li>
          <li>
            <Link
              to="/register"
              className="flex items-center mt-5 transition-transform transform hover:translate-x-2"
            >
              <AiOutlineUserAdd size={26} />
              <span className="nav-item-name">REGISTER</span>
            </Link>
          </li>
        </ul>
      ) : (
        <></>
      )}
  </>
          </div>
    </div>
  )}

export default Navigation;