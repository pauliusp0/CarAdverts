import mongoose from 'mongoose';
const { Schema } = mongoose;

const carSchema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  make: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  gearbox: {
    type: String,
    required: true,
  },
  fuelType: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  mileage: {
    type: Number,
    required: true,
  },
  img: {
    type: Array,
  },
});

const Car = mongoose.model('car', carSchema);
export default Car;
