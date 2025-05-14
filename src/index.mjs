import express, { response } from "express";
import { query, validationResult } from "express-validator";

const app = express();

// middlewires
app.use( express.json() );


// listening port
const PORT = process.env.PORT || 2999;

app.listen( PORT, () => { 
    console.log( "listening" ); 
}); 


// data 
const mockUsers = [ 
    { "id": "1", "title": "muqaddimah", "author": "Ibn Khaldun" },
    { "id": "2", "title": "ihya", "author": "Ghazzali" },
    { "id": "3", "title": "Tahafut", "author": "Tahafut" }
]



// URLs

app.get( "/", ( request, response ) => { 
    response.send( 
        { "message": "Hello World !"  } 
     ) 
} ) 


app.get( "/users", ( request, response ) => {
    return response.status(200).send( mockUsers );
} )



