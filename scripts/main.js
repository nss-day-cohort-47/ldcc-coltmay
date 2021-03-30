import { LoginForm } from "./auth/LoginForm.js";
import { RegisterForm } from "./auth/RegisterForm.js";
import { NavBar } from "./nav/NavBar.js";
import { ToppingDropDown } from "./nav/ToppingDropDown.js";
import { SnackList } from "./snacks/SnackList.js";
import { SnackDetails } from "./snacks/SnackDetails.js";
import { Footer } from "./nav/Footer.js";
import {
	logoutUser, setLoggedInUser, loginUser, registerUser, getLoggedInUser,
	getSnacks, getSingleSnack, useSnackCollection, useToppingCollection, getToppings
} from "./data/apiManager.js";

const applicationElement = document.querySelector("#ldsnacks");

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
~~~~~~~~~~~~~~~Login/Register Listeners~~~~~~~~~~~~~~~
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
applicationElement.addEventListener("click", event => {
	event.preventDefault();
	if (event.target.id === "login__submit") {
		//collect all the details into an object
		const userObject = {
			name: document.querySelector("input[name='name']").value,
			email: document.querySelector("input[name='email']").value
		}
		loginUser(userObject)
			.then(dbUserObj => {
				if (dbUserObj) {
					sessionStorage.setItem("user", JSON.stringify(dbUserObj));
					startLDSnacks();
				} else {
					//got a false value - no user
					const entryElement = document.querySelector(".entryForm");
					entryElement.innerHTML = `<p class="center">That user does not exist. Please try again or register for your free account.</p> ${LoginForm()} <hr/> <hr/> ${RegisterForm()}`;
				}
			})
	} else if (event.target.id === "register__submit") {
		//collect all the details into an object
		const userObject = {
			name: document.querySelector("input[name='registerName']").value,
			email: document.querySelector("input[name='registerEmail']").value,
			admin: false
		}
		registerUser(userObject)
			.then(dbUserObj => {
				sessionStorage.setItem("user", JSON.stringify(dbUserObj));
				startLDSnacks();
			})
	}
})

applicationElement.addEventListener("click", event => {
	if (event.target.id === "logout") {
		logoutUser();
		sessionStorage.clear();
		checkForUser();
	}
})


/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
~~~~~~~~~~~~~~~~~~~Snack Listeners~~~~~~~~~~~~~~~~~~~~
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
//* Displays details of snack when detail button is clicked by invoking showDetails.
applicationElement.addEventListener("click", event => {
	event.preventDefault();
	if (event.target.id.startsWith("detailscake")) {
		const snackId = event.target.id.split("__")[1];
		getSingleSnack(snackId)
			.then(response => {
				showDetails(response);
			})
	}
})

//* Shows all snacks when all snack button is clicked.
applicationElement.addEventListener("click", event => {
	event.preventDefault();
	if (event.target.id === "allSnacks") {
		showSnackList();
	}
})

//* Filters displayed snacks based on toppings.
applicationElement.addEventListener("change", event => {
	event.preventDefault();
	// Looks for a change on the topping selector dropdown.
	if (event.target.id === "toppingSelector") {
		// Pass the value (name as a string) throught the filteredSnacks function.
		filteredSnacks(event.target.value);
	}
})

//* Shows details of a single snack object.
const showDetails = (snackObj) => {
	const listElement = document.querySelector("#mainContent");
	listElement.innerHTML = SnackDetails(snackObj);
}

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
~~~~~~~~~~~~~~~~~User Authentication~~~~~~~~~~~~~~~~~~
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
const checkForUser = () => {
	if (sessionStorage.getItem("user")) {
		setLoggedInUser(JSON.parse(sessionStorage.getItem("user")));
		startLDSnacks()
	} else {
		applicationElement.innerHTML = "";
		//show login/register
		showNavBar()
		showLoginRegister();
	}
}

const showLoginRegister = () => {
	//template strings can be used here too
	applicationElement.innerHTML += `${LoginForm()} <hr/> <hr/> ${RegisterForm()}`;
}

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
~~~~~~~~~~~~~~~~~~~~~Nav Preview~~~~~~~~~~~~~~~~~~~~~~
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
const showNavBar = () => {
	applicationElement.innerHTML += NavBar();
}

const showSnackList = () => {
	getSnacks().then(allSnacks => {
		const listElement = document.querySelector("#mainContent")
		listElement.innerHTML = SnackList(allSnacks);
	})
}

const showFilteredSnackList = (filteredArray) => {
		const listElement = document.querySelector("#mainContent")
		listElement.innerHTML = SnackList(filteredArray);
}

const showFooter = () => {
	applicationElement.innerHTML += Footer();
}

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
~~~~~~~~~~~~~~~~~~~~Snack Filtering~~~~~~~~~~~~~~~~~~~
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/ 
//* A function written to filter by topping....probably going to rewrite with map and filter later...
const filteredSnacks = (toppingName) => {
	// Pulls all snacks and stores the array in a variable.
	let allSnacksArray = useSnackCollection();
	// Pulls all toppings and stores the array in a variable.
	let allToppingsArray = useToppingCollection();
	// Sets an empty string, to later hold the id of the topping we will be searching by.
	let toppingId = "";
	// Sets an empty array, to later hold all of the snack objects that contain the toppingId.
	let filteredSnackArray = [];

	// Loops through every topping, then for every topping...
	allToppingsArray.forEach(toppingObj => {
		// If the topping name in the the topping array matches the name of the string being passed into the function (toppingName)... 
		if (toppingObj.name === toppingName) {
			// Hold the value of the topping object's ID as toppingId, which will be used very soon.
			toppingId = toppingObj.id
		}
	});
	// A nested forEach (ugh) that loops through all of the snacks and all of the snackToppings contained within, then...
	allSnacksArray.forEach(snack => snack.snackToppings.forEach(topping => {
		// Using the toppingId we stored previously, we check if the toppingId matches the id of the toppings within the snackToppings, and...
		if (toppingId === topping.toppingId){
			// Pushes the snack containing the correct toppingId into the (initially) empty filteredSnackArary, then...
			filteredSnackArray.push(snack);
		}
	}))
	// Runs showFilteredSnackList on the completed filtered array.
	showFilteredSnackList(filteredSnackArray)
}

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
~~~~~~~~~~~~~~~~~~~~~~~Startup~~~~~~~~~~~~~~~~~~~~~~~~
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
const startLDSnacks = () => {
	applicationElement.innerHTML = "";
	//Get Toppings for the sake of dropdown.
	getToppings()
		.then(() => {
			showNavBar()
			applicationElement.innerHTML += `<div id="mainContent"></div>`;
			showSnackList();
			showFooter();
			ToppingDropDown();
		})
}

checkForUser();