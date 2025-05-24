

import { matchedData, validationResult } from "express-validator"; 
import { mockUsers } from "../utils/constants.mjs"; 
import { hashPassword } from "../utils/helpers.mjs"; 
import { Books } from "../schemas/books.mjs"; 



export const createBook = async ( request, response ) => { 

    const vresult = validationResult(request); 
    if( !vresult.isEmpty() ) 
        return response.status(400).send({ "errors": vresult.array() }); 


	const data = matchedData(request); 
	console.log(data); 
	const newBook = new Books(data); 
	
	try { 
		const savedBook = await newBook.save(); 
		console.log( "Book created" ); 
		return response.status(201).send(savedBook); 
	} 
	catch(error) 
	{ 
		console.log(error); 
		return response.status(400).send(error); 
	}
}; 


export const AllBooks = async ( request, response ) => {
    console.log("all books");
	try {
		const fetchedBooks = await Books.find({});
		console.log(fetchedBooks);
        
        console.log( new Date().toLocaleString() );
		return response.status(200).json(fetchedBooks);
	} catch (error) {
		console.log("failed to fetch from database");
		return response.status(400).json(error);
	}
}; 


export const bookFilter = async (request, response) => {
    
    const vresult = validationResult(request);

    if( !vresult.isEmpty() )
        return response.status(400).send({ "errors": vresult.array() }); 


    const { filter, value } = matchedData( request );

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
    
    try {
        await Books.deleteOne({ "title": title });
        console.log( title +  " deleted" );
        return response.sendStatus(200);
    } catch (error) {
        return response.status(400).send(error);
    }
};


export const deleteBookByAuthor = async ( request, response ) => {
    const { author } = request.body;

    try {
        await Books.deleteMany( { "author" : author } );
        console.log( "deleted books of " + author );
        return response.sendStatus(200);
    } catch (error) {
        return response.status(400).send(error);
    }


};


export const updateBook = async ( request, response ) => {
	const { title } = request.params;
    const updation = request.body;

    try {
        await Books.updateOne( { "title": title },{ $set : updation } );
        return response.status(200).send( title +" updated" );
    } catch (error) {
        return response.status(400).send(error);
    }

};

