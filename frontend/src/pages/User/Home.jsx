import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../../components/Loader.js";
import Message from "../../components/Message.js";
import Product from "../Products/Product.jsx";
import Header from "../../components/Header.js";
import Recommendation from './Recommendation.jsx'









const Home = () => {
  const { keyword } = useParams();
  const [data, setData] = useState({ products: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(`http://localhost:3000/api/products?keyword=${keyword || ""}`);
        setData({ products: data.products });
        setIsLoading(false);
      } catch (error) {
        setIsError(error?.response?.data?.error || "An error occurred");
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [keyword]); // Refetch when keyword changes

  return (
    <>
      {!keyword && <Header />}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">{isError}</Message>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h1 className="ml-[20rem] mt-[10rem] text-[3rem]">Special Products</h1>
            <Link
              to="/shop"
              className="bg-pink-600 font-bold rounded-full py-2 px-10 mr-[18rem] mt-[10rem]"
            >
              Shop
            </Link>
          </div>

          <div className="flex justify-center flex-wrap mt-[2rem]">
            {data.products.map((product) => (
              <div key={product._id}>
                <Product product={product} />
              </div>
            ))}
          </div>

          <Recommendation/>
        </>
      )}
    </>
  );
};

export default Home;

 

 




//TODO: Refactor this code
/* const Home = () => {
  const { keyword } = useParams();
  const [data, setData] = useState({ products: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    const getProductsData = async () => {
      setIsLoading(true);
      try {
        const products = await getProducts(keyword); // Use the axios function to get products
        setData({ products });
        setIsLoading(false);
      } catch (error) {
        setIsError(error?.response?.data?.message || 'An error occurred');
        setIsLoading(false);
      }
    };

    getProductsData();
  }, [keyword]); // Depend on keyword to refetch on change

  return (
    <>

@@ -104,7 +20,7 @@ export default Home;
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {isError || "An error occurred"}
        </Message>
      ) : (
        <>


@@ -132,34 +48,6 @@ export default Home;
    </>
  );
};
 */



/* const Home= ()=>{
  return <div className='border'>Home</div>
}
 */



/* const Home = () => {
  const { keyword } = useParams();

  return (
    <>
      {!keyword && <Header />}
      <h1 className="ml-[20rem] mt-[10rem] text-[3rem]">Special Products</h1>
      <Link
        to="/shop"
        className="bg-pink-600 font-bold rounded-full py-2 px-10 mr-[18rem] mt-[10rem]"
      >
        Shop
      </Link>
    </>
  );
};
 */