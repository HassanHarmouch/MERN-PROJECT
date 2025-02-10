import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Recommendation = () => {
  const [recommended, setRecommended] = useState([]);
  const [bundles, setBundles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const userId = userInfo?.data?.user?._id;

        // Fetch recommended products
        const { data: recommendedData } = await axios.get(
          `http://localhost:3000/api/products/recommendations?userId=${userId}`,
          { withCredentials: true }
        );

        // Fetch bundles
        const { data: bundlesData } = await axios.get("http://localhost:3000/api/bundles");

        setRecommended(recommendedData);
        setBundles(bundlesData);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.error || err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Recommendations for You</h2>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          {recommended.length === 0 && bundles.length === 0 ? (
            <p>No recommendations available.</p>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {/* Display Recommended Products */}
              {recommended.map((product) => (
                <div key={product._id} className="bg-white p-4 rounded-lg shadow-lg">
                  <Link to={`/product/${product._id}`}>
                    <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-md" />
                  </Link>
                  <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
                  <p className="text-gray-600">${product.price}</p>
                  <Link to={`/product/${product._id}`} className="text-blue-500">
                    View Details →
                  </Link>
                </div>
              ))}

              {/* Display Bundles */}
              {bundles.map((bundle) => (
                <div key={bundle._id} className="bg-white p-4 rounded-lg shadow-lg border border-yellow-400">
                  <Link to={`/bundle/${bundle._id}`}>
                    <img src={bundle.image} alt={bundle.name} className="w-full h-48 object-cover rounded-md" />
                  </Link>
                  <h3 className="text-lg font-semibold mt-2 text-yellow-600">{bundle.name} (Bundle)</h3>
                  <p className="text-gray-600">${bundle.price}</p>
                  <Link to={`/bundle/${bundle._id}`} className="text-yellow-500">
                    View Bundle →
                  </Link>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Recommendation;
