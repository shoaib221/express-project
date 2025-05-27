import mongoose from "mongoose";


const BooksSchema = new mongoose.Schema({
	title: {
		type: mongoose.Schema.Types.String,
		required: true,
		unique: true,
	},
	author: mongoose.Schema.Types.String,
	description: mongoose.Schema.Types.String
});



export const Books = mongoose.model("Books", BooksSchema);

