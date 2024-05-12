import mongoose from 'mongoose';
const { Schema } = mongoose;

const cardSchema = new Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true, unique: true },
  image: { type: String, required: true, unique: true },
  url: { type: String, required: true, unique: true },
  category: { type: String, required: true, ref: 'Categories' }
});

const Card = mongoose.model('Card', cardSchema);
export default Card;
