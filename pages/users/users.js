import {memberURL} from "../../utils.js";
import { sanitizeStringWithTableRows } from "../../utils.js"


export function initUsers() {
  document.getElementById("btn-get-all").onclick = getAllMembers
  document.getElementById("tbl-body").onclick = showUserDetails
}

export async function getAllMembers() {
  try {
    const membersFromDB = await fetch(memberURL).then(res => res.json())
    console.log(membersFromDB)
    showAllData(membersFromDB)
  }
  catch (err) {
    console.error("UPPPPPS: " + err) //This can be done better
  }
}

function showAllData(data) {
  const tableRowsArray = data.map(user => `
  <tr>                                
    <td>${user.firstName} </td>              
    <td>${user.lastName} </td>                     
    <td>${user.street} </td>  
    <td>${user.city} </td>
    <td>
    <!--See https://getbootstrap.com/docs/5.0/components/modal/ for an explanation of the classes used below -->
    <button id="${user.id}-column-id" type="button"  class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button> 
   
    <button id="${user.id}-column-id" type="button"  class="other-page btn btn-sm btn-secondary">Details-2</button> </td>      
  </tr>`)

  const tableRowsString = tableRowsArray.join("\n")
  document.getElementById("tbl-body").innerHTML = sanitizeStringWithTableRows(tableRowsString)
}

async function showUserDetails(evt) {
  const target = evt.target
  if (!target.id.includes("-column-id")) {
    return
  }
  const id = target.id.replace("-column-id", "")
  if (target.classList.contains("other-page")) {
    window.router.navigate("find-user?id=" + id)
  }
  else {
    document.getElementById("exampleModalLabel").innerText = "Details for userId: " + id
    const user = await fetch(URL + id).then(res => res.json())
    document.getElementById("user-content").innerText = JSON.stringify(user, null, 2)
  }
}
