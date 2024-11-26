import mongoose, { Schema } from "mongoose";

const topicSchema = new Schema(
  {
    title: String,
    subtitle:String,
    description: String,
    categories: [String],
    price: String,
    imageFileUrl: String,
    pdfFileUrl: String,
  },
  {
    timestamps: true,
  }
);

const Topics = mongoose.models.Topics || mongoose.model("Topics", topicSchema);

export default Topics;


