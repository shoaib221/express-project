import { Router } from "express";

export const testRouter = Router()

const hour1 = 1000 * 60 * 60;
const minute1 = 1000 * 60;

testRouter.get(
    "/test/cookie", ( request, response ) => {
        console.log( request.headers );        
        console.log( request.signedCookies );
        
        response.cookie( "hello", "newton", { maxAge: minute1, signed: true } );
        return response.sendStatus(201);
    }
)

testRouter.get(
    "/test/empty",
    ( request, response ) => {
        console.log( request.cookies );
        return response.sendStatus(201);
    }
)

testRouter.get(
    "/test/session",
    ( request, response ) => {
        console.log(request.session);
        console.log(request.session.id);
        request.session.visited=true;
        return response.sendStatus(200);

    }
)

