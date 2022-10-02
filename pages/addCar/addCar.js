
import {carURL} from "../../utils.js";
import {handleHttpErrors} from "../../utils.js";

export async function addCar(){
    document.getElementById("btn-add-car").onclick = makeNewCar

    async function makeNewCar() {
        const newCar = {}
        newCar.brand = document.getElementById("input-car-brand").value
        newCar.model = document.getElementById("input-car-model").value
        newCar.pricePerDay = document.getElementById("input-car-price").value


        const options = {}
        options.method = "POST"
        options.headers = { "Content-type": "application/json" }
        options.body = JSON.stringify(newCar)
        const addedCar = await fetch(carURL, options).then(handleHttpErrors)
    }
}