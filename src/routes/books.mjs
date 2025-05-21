import { response, Router } from "express";
import { AllBooks, createBook, bookFilter, deleteBook, updateBook, deleteBookByAuthor } from "../controllers/books.mjs";
import { Books } from "../schemas/books.mjs";
import { testmw3 } from "../utils/middlewares.mjs";
import { query, body, checkSchema } from "express-validator";
import { createBookSchema } from "../utils/validationSchemas.mjs";

export const bookRouter = Router();


bookRouter.use(testmw3);


bookRouter.post( "/books/create/", checkSchema(createBookSchema), createBook );


bookRouter.get( "/books/all/", AllBooks);
bookRouter.delete( "/books/author/", deleteBookByAuthor );


bookRouter.get( "/books/",
    query("filter").isString().notEmpty().withMessage("Invalid filter"),
    query("value").isString().notEmpty().withMessage("Invalid value"),
    bookFilter );


bookRouter.delete( "/books/:title", deleteBook );
bookRouter.patch( "/books/:title", updateBook );



