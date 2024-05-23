window.location.href = 'http://localhost:6969/endscreen'
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
    let playersArr = data.players
    let list = document.getElementById("scoreList")
    playersArr.sort((a,b) => a.calcSum() - b.calcSum())

    playersArr.forEach(p => {
        let listItem = document.createElement('li')
        listItem.textContent = p._name + " - " + p.calcSum()
        list.appendChild(listItem)
    });
    



//redirect to register screen
