import mongoose from 'mongoose';
const { Schema } = mongoose;

const CategoriesSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

const Categories = mongoose.model('Categories', CategoriesSchema);
export default Categories;

