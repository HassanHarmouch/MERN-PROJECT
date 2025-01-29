const mongoose= require("mongoose");
const Schema= mongoose.Schema;

const productSchema= new mongoose.Schema({
    productName: {
        type: String,
        required: [true, "Add the product name"],
        trim: true,
        minLength:3,
        unique: true,
    },
    productDescription:{
        type: String,
        trim: true,
        minLength:3,
        maxLength: 255,
    },
    productCategory:{
        type: String,
        required: [true, "Please enter product category"],
        trim: true,
        minLength:3,
        maxLength: 255,
    },
    productSubCategory:{
        type: String,
        required: [true, "Please enter product subcategory"],
        trim: true,
        minLength:3,
        maxLength: 255,
    },
    productImage:{
        type: String,
        required: [true, "Please enter imageUrl"]
    },
    sizes: [{
        size: {
          type: String,
          required: true,
          enum: ['Regular', 'Medium', 'Large'], 
        },
        price: {
          type: Schema.Types.Decimal128,
          required: true,
          default: 0.00,
          min: 0.00, 
        }
    }],

    productQuantity:{
        type:Number,
        default:0,
        required: [true, "Add the product quantity"]
    },

    options: [{
        optionType: {
          type: String, // e.g., "Egg Type"
          required: true
        },
        values: [{
          type: String, // e.g., "Sunny-side-up"
          required: true
        }]
    }],

    createdBy:{
        type: Schema.Types.ObjectId,
        ref: 'User',

    }
      

},
{timestamps: true}
);

module.exports= mongoose.model("Product", productSchema);