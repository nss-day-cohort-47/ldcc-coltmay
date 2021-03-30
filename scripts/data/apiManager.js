const apiURL = "http://localhost:8088";

// user functions
let loggedInUser = {}

export const getLoggedInUser = () => {
	return { ...loggedInUser };
}

export const logoutUser = () => {
	loggedInUser = {}
}

export const setLoggedInUser = (userObj) => {
	loggedInUser = userObj;
}

export const loginUser = (userObj) => {
	return fetch(`${apiURL}/users?name=${userObj.name}&email=${userObj.email}`)
		.then(response => response.json())
		.then(parsedUser => {
			//is there a user?
			if (parsedUser.length > 0) {
				setLoggedInUser(parsedUser[0]);
				return getLoggedInUser();
			} else {
				//no user
				return false;
			}
		})
}

export const registerUser = (userObj) => {
	return fetch(`${apiURL}/users`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(userObj)
	})
		.then(response => response.json())
		.then(parsedUser => {
			setLoggedInUser(parsedUser);
			return getLoggedInUser();
		})
}


// snack functions

let snackCollection = [];
let toppingCollection = [];

export const useSnackCollection = () => {
	//Best practice: we don't want to alter the original state, so
	//make a copy of it and then return it
	//the spread operator makes quick work
	const snackCollectionCopy = [...snackCollection]
	return snackCollectionCopy;
}

export const getSnacks = () => {
	return fetch(`${apiURL}/snacks`)
		.then(response => response.json())
		.then(parsedResponse => {
			snackCollection = parsedResponse
			return parsedResponse;
		})
}

//* A function that will fetch a single snack from the snack database by ID, with expanded properties.
export const getSingleSnack = (snackId) => {
	return fetch(`${apiURL}/snacks/${snackId}/?_expand=type&_expand=inFlavor&_expand=season&_expand=shape&_embed=snackToppings`)
		.then(response => response.json())
		.then(parsedResponse => {
			return getSingleSnackToppings(snackId)
				.then((toppings) => {
					parsedResponse.toppings = toppings;
					return parsedResponse;
				})
		})
}

export const getSingleSnackToppings = (snackId) => {
	return fetch(`${apiURL}/snackToppings?snackId=${snackId}&_expand=topping`)
		.then(response => response.json())
		.then(parsedResponse => {
			toppingCollection = parsedResponse
			return parsedResponse;
		})
}

export const getToppings = () => {
	return fetch(`${apiURL}/toppings`)
		.then(response => response.json())
		.then(toppingsArray => {
			const dropdownElement = document.querySelector("form-select form-select btn-info");
			let dropDownHTML = "<option selected>Select A Topping</option>";
			toppingsArray.forEach(topping => {
				dropDownHTML += `<option id="option__${topping.id}">${topping.name}</option>`
			});
			console.log(dropDownHTML)
		})
}