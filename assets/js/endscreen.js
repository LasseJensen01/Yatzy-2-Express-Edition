import Player from "./Player.js";
let buttonNode = document.getElementById("reset")

if(buttonNode){
    buttonNode.addEventListener('click', (event) =>{
     console.log("virker knappen?")
     window.location.href = 'http://localhost:6969/register'
    });
}

const url = `http://localhost:6969/gameLogic/getUsers`
    const results = await fetch(url, {
        method: "GET",
        mode: "cors",
        cache: "no-cache"
    })
    let data = await results.json();
    let playersArr = data.players.map(playerData => {
        Object.setPrototypeOf(playerData, Player.prototype);
        return playerData });

    let list = document.getElementById("scoreList")
    console.log(playersArr);
    playersArr.sort((a,b) => a.calcSum() - b.calcSum())

    playersArr.forEach(p => {
        p.updateTotalScore();
        p.updateAverageScore();
        p.updateGamesPlayed();
        let listItem = document.createElement('li')
        listItem.textContent = p._name + " - " + p.calcSum()
        list.appendChild(listItem)
    });
    



//redirect to register screen
