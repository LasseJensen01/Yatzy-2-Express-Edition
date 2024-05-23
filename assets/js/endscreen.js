import Player from "./Player.js";
let buttonNode = document.getElementById("reset")

if(buttonNode){
    buttonNode.addEventListener('click', (event) =>{
     console.log("virker knappen?")
     window.location.href = 'http://localhost:6969/register'
    });
}

async function endScreenStats(){
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
        p.updateGamesPlayed();
        p.updateTotalScore();
        p.updateAverageScore();
        let listItem = document.createElement('li')
        listItem.textContent = p._name + " - " + p.calcSum()
        list.appendChild(listItem)
    });
}
    
    /*
async function endScreenStats(){
    console.log("stats debug")
    const url = `http://localhost:6969/gameLogic/getUsers`
    const results = await fetch(url, {
        method: "GET",
        mode: "cors",
        cache: "no-cache"
    })
    let data = await results.json();
    let scores = data.players;
    let list = document.getElementById('scoreList')
    scores.array.forEach(score => {
        console.log(score._score)
        const scoreItem = document.createElement('li')
        scoreItem.classList.add("score")
        scoreItem.textContent = score._score;
        list.appendChild(scoreItem)
    });
}
*/
//export default endScreenStats;
export default endScreenStats;
