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
    let playersArr = data.players
    let list = document.getElementById("scoreList")
    playersArr.sort((a,b) => a.calcSum() - b.calcSum())

    playersArr.forEach(p => {
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
