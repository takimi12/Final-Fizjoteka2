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
        imageFileUrl: {
          type: String,
          required: [true]
        }
    },
  {
    timestamps: true,
  }
);

export type ICategory = mongoose.InferSchemaType<typeof CategorySchema>;

const Categories = mongoose.models.Categories || mongoose.model("Categories", CategorySchema);

export default Categories;





