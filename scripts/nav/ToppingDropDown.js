import { useToppingCollection } from "../data/apiManager.js";

export const ToppingDropDown = () => {
    // Remove querySelector, as function will be interpolated in Nav.
    //// const DropDownElement = document.querySelector("#toppingSelector")
    const toppingArray = useToppingCollection();
    
    const toppingDropDown = toppingArray.map((topping) => {
        return `<option id="selection__${topping.id}">${topping.name}</option>`
    })
    return toppingDropDown
}