export const SnackDetails = (snackObject) => {
	let toppingHTML = "";
	snackObject.toppings.forEach(topping => {
		toppingHTML += `${topping.topping.name}, `;
	});

	toppingHTML = toppingHTML.slice(0, -2);
	
	return `
	<div class="col">
		<div class="card shadow-sm" >
            <img class="bd-placeholder-img card-img-top"  style="max-width: 540px;" aria-label="Placeholder:${snackObject.name}" preserveAspectRatio="xMidYMid slice" focusable="false" src="${snackObject.snackImg}" alt="${snackObject.name}">
            <div class="card-body">
				<h5 color="primary">${snackObject.name}</h5>
            	<p class="card-text">${snackObject.description}</p>

				<div class="container">
					<div class="row row-cols-2">
						<div class="col col-details">Type: ${snackObject.type.name}</div>
						<div class="col col-details">Shape: ${snackObject.shape.name}</div>
						<div class="col col-details">Flavor: ${snackObject.inFlavor.name}</div>
						<div class="col col-details">Season: ${snackObject.season.name}</div>
					</div>
					<div class="row row-cols-1">
						<div class="col col-details">${toppingHTML}</div>
					</div>
				</div>

				<div class="d-flex justify-content-between align-items-center">
					<div class="btn-group">
					<button type="button" class="btn btn-sm btn-outline-secondary" id="editcake__${snackObject.id}" disabled>Edit</button>
					<button type="button" class="btn btn-sm btn-outline-secondary" id="deletecake__${snackObject.id}" disabled>Delete</button>
					</div>
                	<small class="text-muted">Count: ${snackObject.count}</small>
            	</div>
            </div>
    	</div>
	</div>
	`
}

/* //! My Obsolete Function :( ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const SnackToppingList = (snackObject) => {
	// An empty array to hold the topping ids.
	let allSnackToppings = [];
	// An emptry string to hold the names of all final toppings.
	let displayedSnackToppings = "";
	// Function to fetch all toppings of a single snack object, then...
	getSingleSnackToppings(snackObject.id)
		// With the object...
		.then(snackToppingObj => {
			// Look through each embeded topping object in an array, and with each topping object...
			snackToppingObj.snackToppings.forEach(topping => {
				// Push the id of the topping to the initially empty array, then...
				allSnackToppings.push(topping.toppingId)
			});
			// Get all of the toppings possible, then...
			getToppings()
				// with the array...
				.then(toppingArray => {
					// Look through each topping object in the database, and...
					toppingArray.forEach(toppingInList => {
						// Look through each topping id in the filled snack topping array, and...
						allSnackToppings.forEach(toppingInSingle => {
							// If the ids of the snack and the topping object match...
							if (toppingInList.id === toppingInSingle) {
								// Add that topping's name to the string holding the names of all toppings, then...
								displayedSnackToppings += `${toppingInList.name}, `
							}
						})
					});
					// Slice the final two characters from the completed string (', '), getting rid of the unecessary comma and whitespace.
					displayedSnackToppings = displayedSnackToppings.slice(0, -2);
					// Console log the result (it looks fine.)
					console.log(displayedSnackToppings);
					snackObject.toppings = displayedSnackToppings;
					console.log(snackObject)
					return snackObject;
				})
		})
	return snackObject;
}
*/ //! ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~