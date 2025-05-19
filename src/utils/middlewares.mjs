

import { mockUsers } from "./constants.mjs";


export const resolveIndexByUserId = (request, response, next) => {
	const {
		params: { id },
	} = request;
	const parsedId = parseInt(id);
	if (isNaN(parsedId)) return response.sendStatus(400);
	const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);
	if (findUserIndex === -1) return response.sendStatus(404);
	request.findUserIndex = findUserIndex;
	next();
};

export const testmw1 = ( request, response, next ) => {
	console.log( " test middleware 1 " );

	next();
};

export const testmw2 = ( request, response, next ) => {
	console.log( " test middleware 2 " );

	next();
};

export const testmw3 = ( request, response, next ) => {
	console.log( " test middleware 3 " );

	next();
};

