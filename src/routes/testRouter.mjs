import { request, response, Router } from "express";
import { body, validationResult, matchedData } from "express-validator";
import { User } from "../schemas/User.mjs";
import { UserOnly } from "../utils/middlewares.mjs";

export const testRouter = Router()

const hour1 = 1000 * 60 * 60;
const minute1 = 1000 * 60;

testRouter.get( "/cookie", 
    ( request, response ) => {
        console.log( request.headers );        
        console.log( request.signedCookies );
        
        response.cookie( "hello", "newton", { maxAge: minute1, signed: true } );
        return response.sendStatus(201);
    }
)

testRouter.get( "/empty",
    ( request, response ) => {
        console.log( request.cookies );
        return response.sendStatus(201);
    }
)


testRouter.get( "/session",
    ( request, response ) => {
        console.log(request.session);
        console.log(request.session.id);
        
        request.session.visited=true;
        return response.sendStatus(200);

    }
)

/* express stores the session id with corresponding data and sends the session id 
to the client. Whenever that client sends request with that session id express.session() 
attaches corresponding data with the request */

testRouter.post( "/register",
    body( "username" ).notEmpty().withMessage("Username cannot be empty"),
    body( "password" ).notEmpty().withMessage("Password cannot be empty"),
    async ( request, response ) => {
        const vresult = validationResult(request); 
        
        if( !vresult.isEmpty() ) 
            return response.status(400).send({ "errors": vresult.array() });     

        const data = matchedData(request); 
        console.log(data); 
        const newUser = new User(data);

        try {
            const savedUser = await newUser.save(data);
            console.log( "User Created" );
            return response.status(201).send(savedUser); 
        } catch(error) {
            console.log(error);
            return response.status(400).send(error); 
        }
    }
);

testRouter.post( "/login",
    body( "username" ).notEmpty().withMessage("Username cannot be empty"),
    body( "password" ).notEmpty().withMessage("Password cannot be empty"),
    async ( request, response ) => {

        console.log(request.session);

        if( request.session.user )
            return response.status(200).send({ "message": "Already signed in" });

        const vresult = validationResult(request); 
        
        if( !vresult.isEmpty() ) 
            return response.status(400).send({ "errors": vresult.array() });     

        const { username, password } = matchedData(request); 

        try {
            const user = await User.findOne( { "username": username } );
            if(!user) return response.status(400).send({ "error": "Invalid username" });
            if( user.password === password ) 
            {
                request.session.visited=true;
                request.session.user = user.id;
                return response.status(200).send({ "message": "logged in" });
            }
            return response.status(400).send( { "error": "Invalid password" } ); 
        } catch(error) {
            console.log(error);
            return response.status(400).send(error); 
        }
    }
);

testRouter.use(UserOnly);

testRouter.get( "/profile",
    async (request, response) => {
        const { id } = request.session.user;
        try {
            const user = await User.findOne({ "id": id });
            return response.status(200).send(user);
        } catch (error) {
            return response.status(400).send(error);
        }
    }
);

testRouter.get( "/logout",
    async (request, response) => {
        request.session.destroy((err) => {
            if (err) {
                return response.status(400).send(err);
            } else {
                return response.send('Logged out successful');
            }   
        });
    }   
);

