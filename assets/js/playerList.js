import { response } from "express"
import gameLogic from "../../api/GameLogic";

console.log("WHat about here bro?")

const fetchPlayers = document.addEventListener('DOMContentLoaded', () => {
    fetch('/gameLogic')
    .then(response => response.json)
    .then(users => {
        console.log(users + "Do you even get here bro?")
        const list = document.getElementById('ul')
        users.array.forEach(u => {
            const listItem = document.getElementById('li');
            listItem.textContent = u;
            list.appendChild(listItem)
        });
    })
    .catch(error => console.error('Error sending Player data', error))
})

fetchPlayers();