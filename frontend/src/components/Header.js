import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./Loader";
import SmallProduct from "../pages/Products/SmallProduct";
import ProductCarousel from "../pages/Products/ProductCarousel";

const Header = () => {
  const [data, setData] = useState([]); // Holds the top products
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    // Define an async function to fetch data using Axios
    const fetchTopProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/products/top"); // Adjust the URL as needed
        setData(response.data);
      } catch (err) {
        console.error(err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopProducts();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <h1>ERROR: {error.message}</h1>;
  }

  return (
    <div className="flex justify-around">
      <div className="xl:block lg:hidden md:hidden sm:hidden">
        <div className="grid grid-cols-2">
          {data.map((product) => (
            <div key={product._id}>
              <SmallProduct product={product} />
            </div>
          ))}


        </div>

      </div>
      <ProductCarousel/>
    </div>
  );
};

export default Header;