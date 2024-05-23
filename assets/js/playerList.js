import Player from "./Player.js"

console.log("are you here?")

async function fillList(){
    console.log("What about here?");
    const url = `http://localhost:6969/gameLogic/getUsers`
    const results = await fetch(url, {
        method: "GET",
        mode: "cors",
        cache: "no-cache"
    })
    let data = await results.json();
    console.log(data);   
    let players = data.players;
    let list = document.getElementById('ul')
    players.forEach(p => {
        console.log(p._name);
        const listItem = document.createElement('li')
        listItem.textContent = p._name;
        list.appendChild(listItem);
    })
}
fillList();