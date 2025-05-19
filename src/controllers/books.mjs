import { matchedData, validationResult } from "express-validator"; 
import { mockUsers } from "../utils/constants.mjs"; 
import { hashPassword } from "../utils/helpers.mjs"; 
import { Books } from "../schemas/books.mjs"; 



export const createBook = async ( request, response ) => { 
	const data = request.body; 
	console.log(data); 
	const newBook = new Books(data); 
	
	try{ 
		const savedUser = await newBook.save(); 
		console.log( "Book created" ); 
		return response.status(201).send(savedUser); 
	} 
	catch(error) 
	{ 
		console.log(error); 
		return response.sendStatus(401); 
	}
};

export const AllBooks = async ( request, response ) => {
	try {
		const fetchedBooks = await Books.find({});
		console.log("successful");
		
		return response.status(200).send(fetchedBooks);
	} catch (error) {
		console.log("failed");
		return response.sendStatus(400);
	}
};

export const bookFilter = async (request, response) => {
    
    const {
        query: { filter, value } 
    } = request;

    if( !filter || !value ) 
    {
        try {
            const books = await Books.find({});
            return response.status(200).send(books);
        } catch(error) {
            return response.status(400).send(error);
        }
    }
    else
    {
        try{    
            if( filter === "title" ) 
            {
                const books= await Books.find( { "title" : value } ) ;
                return response.status(200).send(books);
            }       
            const books= await Books.find( { "author" : value } ) ;
            return response.status(200).send(books);
        } catch (error) {
            return response.status(400).send(error);
        }
    }
};

export const deleteBook = async ( request, response ) => { 
	const { title } = request.params;
	return response.status(200).send("delete " +title);
};

export const updateBook = async ( request, response ) => {
	const { title } = request.params;
	return response.status(200).send("update "+ title);
};