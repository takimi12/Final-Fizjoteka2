import mongoose, { Schema, Document } from "mongoose";


export interface ICategory extends Document {
  _id: string;
  title: string;
  subtitle1: string;
  subtitle2: string;
  subtitle3: string;
  price: string;
  description: string;
  category: string;
  imageFileUrl: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// Schema definition with validation
const productSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxLength: [100, "Title cannot be more than 100 characters"],
    },
    subtitle1: {
      type: String,
      required: [true, "Subtitle1 is required"],
      trim: true,
    },
    subtitle2: {
      type: String,
      required: [true, "Subtitle2 is required"],
      trim: true,
    },
    subtitle3: {
      type: String,
      required: [true, "Subtitle3 is required"],
      trim: true,
    },
    price: {
      type: String, // Can be changed to number if needed
      required: [true, "Price is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
    },
    imageFileUrl: {
      type: String,
      required: [true, "Image URL is required"],
    },
    createdAt: {
      type: String,
      required: [true, "CreatedAt is required"],
    },
    updatedAt: {
      type: String,
      required: [true, "UpdatedAt is required"],
    },
    __v: {
      type: Number,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

const Product = mongoose.models.Product || mongoose.model<ICategory>("Product", productSchema);

export default Product;
