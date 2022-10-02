import {carURL, handleHttpErrors} from "../../utils.js";
import { sanitizeStringWithTableRows } from "../../utils.js"


export function initCars() {
    document.getElementById("btn-get-all-cars").onclick = getAllCars
    document.getElementById("tbl-body").onclick = deleteCar
}

export async function getAllCars() {
    try {
        const carsFromDB = await fetch(carURL).then(handleHttpErrors)
        console.log(carsFromDB)
        showAllData(carsFromDB)
    }
    catch (err) {
        console.error("UPPPPPS: " + err) //This can be done better
    }
}

function showAllData(data) {
    const tableRowsArray = data.map(car => `
  <tr>                                
    <td>${car.brand} </td>              
    <td>${car.model} </td>                     
    <td>${car.pricePerDay} </td>  
    <td>
    <button id="${car.id}-column-id" type="button">Delete</button> 
        
  </tr>`)

    const tableRowsString = tableRowsArray.join("\n")
    document.getElementById("tbl-body").innerHTML = sanitizeStringWithTableRows(tableRowsString)
}

async function deleteCar(evt) {
    const target = evt.target
    if (!target.id.includes("-column-id")) {
        return
    }
    const id = target.id.replace("-column-id", "")
    console.log(id)
    if (target.classList.contains("other-page")) {
        window.router.navigate("find-user?id=" + id)
    }


    else {
        const options = {}
        options.method = "DELETE"

        const carURLForDelete = carURL+id
        const addedCar = await fetch(carURLForDelete, options).then(handleHttpErrors)
        await getAllCars

    }


}
