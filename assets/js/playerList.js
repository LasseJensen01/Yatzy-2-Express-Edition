import { response } from "express"
import gameLogic from "../../api/GameLogic";

document.addEventListener('DOMContentLoaded', () => {
    fetch('/gameLogic')
    .then(response => response.json)
    .then(players => {
        const list = document.getElementById('ul')
        players.array.forEach(p => {
            const listItem = document.getElementById('li');
            listItem.textContent = p;
            list.appendChild(listItem)
        });
    })
    .catch(error => console.error('Error sending Player data', error))
})