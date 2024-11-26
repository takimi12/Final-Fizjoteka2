import mongoose, { Schema } from 'mongoose';

const CategorySchema = new Schema(
    {
        title: String,
        subtitle1:String,
        subtitle2:String,
        subtitle3:String, 
        price:String,
        description:String,
        category:String,
        imageFileUrl: String,
     
    },
  {
    timestamps: true,
  }
);


const Categories = mongoose.models.Categories || mongoose.model("Categories", CategorySchema);

export default Categories;





