

export const createUserValidationSchema = {
	username: {
		isLength: {
			options: {
				min: 5,
				max: 32,
			},
			errorMessage:
				"Username must be at least 5 characters with a max of 32 characters",
		},
		notEmpty: {
			errorMessage: "Username cannot be empty",
		},
		isString: {
			errorMessage: "Username must be a string!",
		},
	},
	displayName: {
		notEmpty: true,
	},
	password: {
		notEmpty: true,
	},
};

export const createBookSchema = { 
	title: { 
		notEmpty: { 
			errorMessage: "Title cannot be empty", 
		}, 
		isString: { 
			errorMessage: "Title must be a string!", 
		} 
	}, 
	author: { 
		notEmpty: { 
			errorMessage: "Author cannot be empty", 
		}, 
		isString: { 
			errorMessage: "Author must be a string!", 
		} 
	},
	description : { 
		notEmpty: { 
			errorMessage: "Description cannot be empty", 
		}, 
		isString: { 
			errorMessage: "Description must be a string!", 
		}
	}
};