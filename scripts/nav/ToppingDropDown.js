import { getToppings } from "../data/apiManager.js";

export const ToppingDropDown = () => {
    const DropDownElement = document.querySelector("#toppingSelector")
    getToppings()
        .then(toppingArray => {
            let toppingDropDownHTML = "<option selected>Select A Topping</option>"
            toppingArray.forEach(topping => {
                toppingDropDownHTML += `<option id="selection__${topping.id}">${topping.name}</option>`
            });
            DropDownElement.innerHTML = toppingDropDownHTML;
        })
}