import { response, Router } from "express";
import { AllBooks, createBook, bookFilter, deleteBook, updateBook, deleteBookByAuthor } from "../controllers/books.mjs";
import { Books } from "../schemas/books.mjs";
import { testmw3 } from "../utils/middlewares.mjs";
import { query, body, checkSchema } from "express-validator";
import { createBookSchema } from "../utils/validationSchemas.mjs";


export const bookRouter = Router();


bookRouter.use(testmw3);


bookRouter.post( "/create", checkSchema(createBookSchema), createBook );
bookRouter.get( "/all", AllBooks);
bookRouter.delete( "/author", deleteBookByAuthor );


bookRouter.get( "",
    query("filter").isString().notEmpty().withMessage("Invalid filter"),
    query("value").isString().notEmpty().withMessage("Invalid value"),
    bookFilter );


bookRouter.delete( "/:title", deleteBook );
bookRouter.patch( "/:title", updateBook );



