

import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";


import { routes } from "./routes/index.mjs";
import "./strategies/local-strategy.mjs";
import { testmw1 } from "./utils/middlewares.mjs";


export function createApp() {
	const app = express();
	app.use(testmw1);
	app.use(express.json());
	app.use(cookieParser("take"));
	
	app.use(
		session({
			secret: "a&n%s$o@n",
			saveUninitialized: false,
			resave: false,
			cookie: {
				maxAge: 60000 * 60,
			},
			store: MongoStore.create({
				client: mongoose.connection.getClient(),
			}),
		})
	);

	// app.use(passport.initialize());
	// app.use(passport.session());
	app.use(routes);

	return app;
}