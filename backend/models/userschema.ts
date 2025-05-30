import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			unique: true,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			enum: ["user"],
			default: "user",
			required: true,
		},
	},
	{ timestamps: true },
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
