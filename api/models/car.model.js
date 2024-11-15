// api/models/car.model.js
import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    //unique: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  images: {
    type: [String],  // Array of image URLs or paths
    validate: [arrayLimit, '{PATH} should be in range (1,10)'],
    default: ["https://clipart-library.com/images/dc9Kr8ERi.png"] // Limit to 10 images
  },
  tags: {
    car_type: {
      type: String,
     // required: true,
      trim: true,
    },
    company: {
      type: String,
     // required: true,
      trim: true,
    },
    dealer: {
      type: String,
      //required: true,
      trim: true,
    },
    // Add additional tags if needed
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }
}, { timestamps: true });


function arrayLimit(val) {
  return val.length <= 10 && val.length>=1;
}

const Car = mongoose.model("Car", carSchema);
export default Car
