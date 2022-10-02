
//Add id to this URL to get a single user
import {memberURL} from "../../utils.js";

export async function initFindUser(match) {
  document.getElementById("btn-fetch-user").onclick = fetchUserData
  if (match?.params?.id) {
    const id = match.params.id
    try {
      renderUser(id)
    } catch (err) {
      document.getElementById("error").innerText = "Could not find user: " + id
    }
  }
}

async function fetchUserData() {
  document.getElementById("error").innerText = ""
  const id = document.getElementById("user-id-input").value
  if (!id) {
    document.getElementById("error").innerText = "Please provide an id"
    return
  }
  try {
    renderUser(id)
  } catch (err) {
    console.log("UPS " + err.message)
  }
}

async function renderUser(id) {
  try {
    const user = await fetch(memberURL + id).then(res => res.json())
    //jsonplaceholder returns an empty object for users not found, NOT an error
    if (Object.keys(user).length === 0) {  //checks for an empty object = {}
      throw new Error("No user found for id:" + id)
    }

    document.getElementById("first-name").innerText = user.firstName;
    document.getElementById("last-name").innerText = user.lastName;
    document.getElementById("street").innerText = user.street;
    document.getElementById("city").innerText = user.city;

  } catch (err) {
    document.getElementById("error").innerText = err
  }
}