import { Router } from "express";

export const testRouter = Router()

const hour1 = 1000 * 60 * 60;
const minute1 = 1000 * 60;

testRouter.get(
    "/cookie", ( request, response ) => {
        console.log( request.headers );
        
        console.log( request.signedCookies );
        
        
        
        
        response.cookie( "hello", "newton", { maxAge: minute1, signed: true } );
        return response.sendStatus(201);
    }
)

testRouter.get(
    "/empty",
    ( request, response ) => {
        console.log( request.cookies );
        return response.sendStatus(201);
    }
)

