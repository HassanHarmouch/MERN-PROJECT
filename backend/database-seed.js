

const mongoose = require("mongoose");
const Category = require("./models/categoryModel");
const Product = require("./models/productModel"); 
const database = require("./database");
// Predefined furniture categories
const categories = [
  "Sofa",
  "Table",
  "Chair",
  "Bed",
  "Storage",
  "Desk",
  "Lighting",
  "Shelving",
  "Rugs",
  "Decor",
];

const chairs = [
  {
    name: "Atmosphera",
    image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcR0Z3403NWoM5JKFyIcQmpI4o47Ow5zMrjMd0PRTqClpuIWJJCpRrM00NkEUUHACEV07DHk6gTCW0BgnZMmZ5qzqd9H0GFkJs9ANmuI4W6Dfi2eG_CG44Cy7dqWqrTlC2XArDPwcVI6Eb-4&usqp=CAc.jpg",
    brand: "GS",
    quantity: 12,
    category: "67a0b7a9d7455824ec57d69f", // actual category id from MongoDB
    description: "Defining piece!",
    reviews: [
      {
        name: "John Doe",
        rating: 5,
        comment: "This chair is just beautiful! My wife loves it.",
        user: "679bad8c1966459a0cddd0ce" // actual ObjectId from MongoDB
      }
    ],
    rating: 5,
    numReviews: 1,
    price: 110.00,
    countInStock: 8,
    isBundle: false,
    bundleId: null // Not part of any bundle
  },
  {
    name: "Leisure Chair",
    image: "https://europeanhousehold.com/cdn/shop/files/Untitleddesign-2024-05-22T131648.459.png?v=1716375040&width=1080",
    brand: "EU Household",
    quantity: 17,
    category: "67a0b7a9d7455824ec57d69f", // actual category id from MongoDB
    description: "Navy blue leisure chair",
    reviews: [
      {
        name: "Diana Farhat",
        rating: 5,
        comment: "Comfiest chair ever",
        user: "679bb5001a45da2ed1f9f1ea" 
      },
      {
        name: "Marwa Bikai",
        rating: 5,
        comment: "Recommended!",
        user: "679bb474fdf36583f7803bfc" 
      },

    ],
    rating: 5,
    numReviews: 2,
    price: 139.00,
    countInStock: 8,
    isBundle: false,
    bundleId: null // Not part of any bundle
  },
  {
    name: "Anastazia Chair",
    image: "https://plus.unsplash.com/premium_photo-1705169612592-32610774a5d0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2hhaXJ8ZW58MHx8MHx8fDA%3D",
    brand: "Wolves Furniture",
    quantity: 17,
    category: "67a0b7a9d7455824ec57d69f", // actual category id from MongoDB
    description: "Mustard leisure chair",
    reviews: [
      {
        name: "Diana Farhat",
        rating: 5,
        comment: "Best for after work rest",
        user: "679bb5001a45da2ed1f9f1ea" 
      },
      {
        name: "Marwa Bikai",
        rating: 4,
        comment: "Recommended, the color isn't nice though",
        user: "679bb474fdf36583f7803bfc" 
      },

    ],
    rating: 4.5,
    numReviews: 2,
    price: 139.00,
    countInStock: 8,
    isBundle: false,
    bundleId: null // Not part of any bundle
  },
  {
    name: "Circle Chair",
    image: "https://plus.unsplash.com/premium_photo-1680112806039-244731d88d45?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    brand: "Wolves Furniture",
    quantity: 17,
    category: "67a0b7a9d7455824ec57d69f", // actual category id from MongoDB
    description: "Cicle-shaped chair",
    reviews: [
      {
        name: "Diana Farhat",
        rating: 5,
        comment: "My dog loves it",
        user: "679bb5001a45da2ed1f9f1ea" 
      },
      {
        name: "Marwa Bikai",
        rating: 4,
        comment: "Looks good, but not very comfortable to sit in",
        user: "679bb474fdf36583f7803bfc" 
      },

    ],
    rating: 4.5,
    numReviews: 2,
    price: 139.00,
    countInStock: 8,
    isBundle: false,
    bundleId: null // Not part of any bundle
  },
  {
    name: "Kitchen Chair",
    image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    brand: "Ikea",
    quantity: 13,
    category: "67a0b7a9d7455824ec57d69f", // actual category id from MongoDB
    description: "Black wooden chair",
    reviews: [
      
    ],
    rating: 0,
    numReviews: 0,
    price: 199.99,
    countInStock: 10,
    isBundle: false,
    bundleId: null // Not part of any bundle
  },
  {
    name: "Princessa Chair",
    image: "https://images.unsplash.com/photo-1586158291800-2665f07bba79?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    brand: "Ikea",
    quantity: 13,
    category: "67a0b7a9d7455824ec57d69f", // actual category id from MongoDB
    description: "Pink Chair",
    reviews: [
      
    ],
    rating: 0,
    numReviews: 0,
    price: 126.00,
    countInStock: 10,
    isBundle: false,
    bundleId: null // Not part of any bundle
  },
  {
    name: "Damak Chair",
    image: "https://plus.unsplash.com/premium_photo-1705169612261-2cf0407141c3?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    brand: "Ikea",
    quantity: 13,
    category: "67a0b7a9d7455824ec57d69f", // actual category id from MongoDB
    description: "Modern chair with a sleek design",
    reviews: [
      
    ],
    rating: 0,
    numReviews: 0,
    price: 185.00,
    countInStock: 10,
    isBundle: false,
    bundleId: null // Not part of any bundle
  },
];

async function seedCategories() {
  try {
    // Ensure the database connection is established
    await database.connectToDatabase();
    // Check if any categories already exist
    const existingCategories = await Category.find({});
    if (existingCategories.length === 0) {
      // If no categories exist, add them
      for (let categoryName of categories) {
        const category = await Category.create({ name: categoryName });
        console.log(`${categoryName} category added successfully!`);
      }
    } else {
      console.log("Categories already exist. Skipping category seeding.");
    }
  } catch (err) {
    console.error("Error seeding categories:", err);
  }
}

async function seedProducts(products) {
  try {
    await database.connectToDatabase();

    // Delete all existing products in the collection
    await Product.deleteMany({});
    console.log("Existing products deleted.");

    // Drop all indexes (except the default _id index)
    await Product.collection.dropIndexes();
    console.log("Indexes dropped.");

    // Loop through each product and insert it individually
    for (let product of products) {
      await Product.create(product);
      console.log(`Product ${product.name} added successfully!`);
    }

    await mongoose.connection.close();
    console.log("Database connection closed.");

    process.exit(0); // Ensure script exits properly
  } catch (err) {
    console.error("Error seeding products:", err);
    await mongoose.connection.close();
    process.exit(1); // Exit with failure code
  }
}



// Call the function to seed categories and products
async function seed() {
  await seedCategories();
  await seedProducts(chairs);
}
seed();


