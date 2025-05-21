import { Router } from "express";
import { mockUsers } from "../utils/constants.mjs";
import { testRouter } from "./testRouter.mjs"
import  { bookRouter } from "./books.mjs"
import { testmw2 } from "../utils/middlewares.mjs";


export const routes = Router();

routes.use( testmw2 );

routes.use( testRouter );


routes.use( bookRouter );