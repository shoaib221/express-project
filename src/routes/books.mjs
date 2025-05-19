import { response, Router } from "express";
import { AllBooks, createBook, bookFilter, deleteBook, updateBook } from "../controllers/books.mjs";
import { Books } from "../schemas/books.mjs";
import { testmw3 } from "../utils/middlewares.mjs";

export const bookRouter = Router();


bookRouter.use(testmw3);
bookRouter.post( "/books/create/", createBook );
bookRouter.get( "/books/all/", AllBooks);
bookRouter.get( "/books/", bookFilter );
bookRouter.delete( "/books/:title", deleteBook );
bookRouter.patch( "/books/:title", updateBook );



