import mongoose from "mongoose";
import { createApp } from "./createApp.mjs";

mongoose.connect("mongodb://localhost/express_tutorial").then(() => {
	console.log( "Connected to Database" )
	const app = createApp();
	const PORT = process.env.PORT || 2999;
	app.listen(PORT, () => {
		console.log(`Running on Port ${PORT}`);
	});

}).catch((err) => console.log(`Error: ${err}`));



