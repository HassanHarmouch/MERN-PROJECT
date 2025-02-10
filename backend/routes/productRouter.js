
// controllers
const {
  fetchProducts,
  fetchProductById,
  fetchAllProducts,
  addProductReview,
  fetchTopProducts,
  fetchNewProducts,getRecommendedProducts,
  filterProducts,
} =require("../controllers/productController.js");
const {authenticate} = require("../middlewares/authMiddleware.js");
const  {checkId} = require ("../middlewares/checkId.js");


const express=require('express')
const router = express.Router();


// router
//   .route("/")
//   .get(fetchProducts)
//   .post(authenticate, authorizeAdmin, formidable(), addProduct);



router.route("/").get(fetchProducts)

router.route("/allproducts").get(fetchAllProducts);
router.route("/:id/reviews").post(authenticate, checkId, addProductReview);

router.get("/top", fetchTopProducts);
router.get("/new", fetchNewProducts);

router.get("/recommendations", getRecommendedProducts);


router
  .route("/:id")
  .get(fetchProductById)
 


//   router
//   .route("/:id")
//   .get(fetchProductById)
//   .put(authenticate, authorizeAdmin, formidable(), updateProductDetails)
//   .delete(authenticate, authorizeAdmin, removeProduct);

router.post("/filter", filterProducts);

module.exports = router; 