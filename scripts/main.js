console.log('yum, yum, yum');

import { LoginForm } from "./auth/LoginForm.js";
import { RegisterForm } from "./auth/RegisterForm.js";
import { NavBar } from "./nav/NavBar.js";
import { ToppingDropDown } from "./nav/ToppingDropDown.js";
import { SnackList } from "./snacks/SnackList.js";
import { SnackDetails } from "./snacks/SnackDetails.js";
import { Footer } from "./nav/Footer.js";
import {
	logoutUser, setLoggedInUser, loginUser, registerUser, getLoggedInUser,
	getSnacks, getSingleSnack, useSnackCollection, useToppingCollection
} from "./data/apiManager.js";

const applicationElement = document.querySelector("#ldsnacks");

//login/register listeners
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
// end login register listeners

// snack listeners
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

applicationElement.addEventListener("click", event => {
	event.preventDefault();
	if (event.target.id === "allSnacks") {
		showSnackList();
	}
})

applicationElement.addEventListener("change", event => {
	event.preventDefault();
	if (event.target.id === "toppingSelector") {
		filteredSnacks(event.target.value);
	}
})

const showDetails = (snackObj) => {
	const listElement = document.querySelector("#mainContent");
	listElement.innerHTML = SnackDetails(snackObj);
}
//end snack listeners

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

const startLDSnacks = () => {
	applicationElement.innerHTML = "";
	showNavBar()
	applicationElement.innerHTML += `<div id="mainContent"></div>`;
	showSnackList();
	showFooter();
	ToppingDropDown();
}

const filteredSnacks = (toppingName) => {

	let allSnacksArray = useSnackCollection();
	let allToppingsArray = useToppingCollection();
	let toppingId = "";
	let filteredSnackArray = [];

	allToppingsArray.forEach(toppingObj => {
		if (toppingObj.name === toppingName) {
			toppingId = toppingObj.id
		}
	});

	allSnacksArray.forEach(snack => snack.snackToppings.forEach(topping => {
		if (toppingId === topping.toppingId){
			filteredSnackArray.push(snack);
		}
	}))
	console.log(filteredSnackArray)
	showFilteredSnackList(filteredSnackArray)
}

checkForUser();