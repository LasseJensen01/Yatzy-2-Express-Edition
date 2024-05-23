import Player from "./Player.js";
import highlightCurrentPlayer from "./playerList.js";
//import endScreenStats from "./endscreen.js";
import endScreenStats from "./endscreen.js";

// Javascript GUI code
// button
let button = document.getElementById("rollButton");
button.addEventListener('click', buttonRoll);
console.log(button);
// arrays Clientside
let arrayBools = [false, false, false, false, false]; // array for the boolean values
let arrayBoolsTemp = [false, false, false, false, false]; // temporary array for the boolean values

// throwcount
let throwcount = document.getElementById('throwcount');
throwcount.disabled

// GUI functions
async function buttonRoll() {
    console.log("rolling");
    setBoolArray();
    const diceString = arrayBools.join('-');
    console.log(diceString);
    const url = `http://localhost:6969/gameLogic/buttonRoll/dice=${diceString}`
    const results = await fetch(url, {
        method: "GET",
        mode: "cors",
        cache: "no-cache"
    })
    let data = await results.json();
    console.log(data);
    const dice = data.dices;
    const diceResults = data.results;
    console.log("Clientside dice recieved: " + dice);
    for (let index = 0; index < 5; index++) {
        if (!arrayBools[index]) {
            let idPic = "dice" + (index+1);
            let diceImg = document.getElementById(idPic);
            diceImg.src = "/img/" + dice[index] + "hovedterning.png";
        }
    }
    let count = parseInt(throwcount.value);
    throwcount.value = ++count;
    if (throwcount.value == 3) {
        button.disabled = true;
    }
    setResults(diceResults);
}

async function loadCurrentPlayer() {
    const url = `http://localhost:6969/gameLogic/getUsers`
    const results = await fetch(url, {
        method: "GET",
        mode: "cors",
        cache: "no-cache"
    })
    let data = await results.json();
    let score = data.players[data.currentID]._score;
    loadElementArray(score);
    highlightCurrentPlayer();
}

function loadElementArray(scores) {
    console.log(scores);
    for (let i in elementArray){
        if (!(scores[i] === false)) {
            elementArray[i].setAttribute('value', scores[i]);
            elementArray[i].disabled = true;
            elementArray[i].classList.add("lockedInput");
        } else {
            elementArray[i].setAttribute('value', 0)
            elementArray[i].disabled = false;
            elementArray[i].classList.remove("lockedInput");
        }
        sumBonusTotalSet()
        totalSumInputs()
    }
    console.log(elementArray.toString);
}

// input method for sending a players choice to the server and updating their score
async function inputLock() {
    if (parseInt(throwcount.value) > 0) {
        let idNr = this.id;
        let element = document.getElementById(idNr);
        element.disabled = true;
        element.classList.add("lockedInput");
        let arrayIndex = getArrayIndexOfElement(idNr);
        const data = {index: arrayIndex, value: element.value};
        const url = `http://localhost:6969/gameLogic/inputLock`
        const results = await fetch(url, {
            method: "PUT",
            mode: "cors",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
        let response = await results.json();
        console.log(response);
        resetThrowAndButton();
        resetDice();
        sumBonusTotalSet();
        totalSumInputs();
        finished();
        loadCurrentPlayer();
        if(await finished()){
            gameOver()
        }
    }
}

// Resets throw count to 0 and enables button
function resetThrowAndButton() {
    throwcount.value = 0;
    button.disabled = false;
}

let images = document.querySelectorAll('img');
images.forEach(element => {
    element.addEventListener('click', lockButton)});

// Locks a dice image so it doesnt change
function lockButton() {
    let idNr = this.id;
    let parNode = document.getElementById(idNr).parentNode;
    idNr = idNr.substring(4);
    if (!arrayBools[idNr-1] && parseInt(throwcount.value) > 0) {
        if (arrayBoolsTemp[idNr-1]) {
        arrayBoolsTemp[idNr-1] = false;
        parNode.classList.remove("diceLocked")
        parNode.classList.add("diceOpen")
        } else {
        arrayBoolsTemp[idNr-1] = true;
        parNode.classList.remove("diceOpen")
        parNode.classList.add("diceLocked")
        }
    }
    console.log("Temp: " + arrayBoolsTemp.toString());
    console.log("Real: " + arrayBools.toString());
}

function setBoolArray() {
    for (let index = 0; index < arrayBools.length; index++) {
        arrayBools[index] = arrayBoolsTemp[index];
    }
}

// resets dice images to black
function resetDice() { 
    for (let index = 0; index < 5; index++) {
        let idPic = "dice" + (index+1);
        let diceImg = document.getElementById(idPic);
        let parNode = diceImg.parentNode;
        if (parNode.classList.contains("diceLocked")){
            parNode.classList.remove("diceLocked")
            parNode.classList.add("diceOpen")
        }
        diceImg.src = "/img/sortbox.png";
        console.log("Debug");
        // arrayNumbahs[index] = 0;
    }
    arrayBoolsTemp = [false, false, false, false, false];
    setBoolArray();
}


function setResults(results){
    for (let i = 0; i < elementArray.length; i++){
        if (!elementArray[i].disabled){
            elementArray[i].setAttribute('value', results[i])
        }
    }
}


const elementArray = [document.getElementById('input1'), document.getElementById('input2'),document.getElementById('input3'),
document.getElementById('input4'),document.getElementById('input5'),document.getElementById('input6'),
document.getElementById('input1Pair'), document.getElementById('input2Pair'), document.getElementById('input3Same'), document.getElementById('input4Same'),
document.getElementById('inputFullHouse'), document.getElementById('inputSmallStr'), document.getElementById('inputLargeStr'),
document.getElementById('inputChance'), document.getElementById('inputYatzy')]

const inputSummer = [document.getElementById('inputBonusSum'), document.getElementById('inputBonus'),
document.getElementById('inputSum'), document.getElementById('inputTotal')] 

// Returns the array index from elementArray with the given elementID. Returns null if id doesn't exist.
function getArrayIndexOfElement(elementID) {
    let arrayIndex = null;
    let found = false;
    let index = 0;
    while (!found && index < 15) {
        if (elementArray[index].id == elementID) {
            arrayIndex = index;
            found = true;
        } else {
            index++;
        }
    }
    return arrayIndex;
}
// Sets the input sumBonus to the sum of the first 6 inputs
function sumBonusTotalSet() {
    let sum = 0;
    for (let i = 0; i < 6; i++){
        if (elementArray[i].disabled) {
            sum += parseInt(elementArray[i].value);
        }
    }
    if (sum > 62) {
        sum += 50;
        inputSummer[1].value = 50;
    } else inputSummer[1].value = 0;
    inputSummer[0].value = sum;
}

// Inputmethods for locking an input
// async function inputLock() {
//     if (parseInt(throwcount.value) > 0) {
//         let idNr = this.id;
//         let element = document.getElementById(idNr);
//         element.disabled = true;
//         element.classList.add("lockedInput");
//         let arrayIndex = getArrayIndexOfElement(idNr);
//         const data = {index: arrayIndex, value: element.value};
//         const url = `http://localhost:6969/gameLogic/inputLock`
//         const results = await fetch(url, {
//             method: "PUT",
//             mode: "cors",
//             cache: "no-cache",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(data)
//         })
//         let response = await results.json();
//         console.log(response);
//         resetThrowAndButton();
//         resetDice();
//         sumBonusTotalSet();
//         totalSumInputs();
//         console.log("Person who annoys you 6 letters?: N*gger")
        
//     }
// }

elementArray.forEach(element => {
    element.addEventListener('click', inputLock)
});


// Sets the totalsum and total inputs (ty Simon)
function totalSumInputs(){
    let sum = 0;
    for (let i = 6; i < 15; i++){
        if (elementArray[i].disabled) {
            sum += parseInt(elementArray[i].value);
        }
    }
    inputSummer[2].setAttribute('value', sum);
    let total = parseInt(inputSummer[0].value) + parseInt(inputSummer[2].value);
    inputSummer[3].setAttribute('value', total);
}


// omdan den her metode til en der tjekker, om en spiller er færdig
async function finished() { 
    console.log("veggies served")
    const url = `http://localhost:6969/gameLogic/getUsers`
    const response = await fetch(url,{
        method: "GET",
        mode: "cors",
        cache: "no-cache",
    })

    let result = await response.json()

    console.log(result)

    let checker = arr => arr.every(v => v !== false)
    let allDone = 0


    result.players.forEach(Player => {
        if(checker(Player._score)){
            allDone = allDone + 1
        }
    });
    console.log(allDone)
    console.log(result.players.length)

    if(allDone == result.players.length){
        console.log("Lookie ma, i finished all my veggies")
        //endScreenStats();
        endScreenStats();
        window.location.href = 'http://localhost:6969/endscreen'
        return true
    } else {
        console.log("Bad boy, your veggies ain't finished")
        return false
    }
   
}

async function gameOver(){
    fetch ('gameLogic/savePlayers', {
        method: "PUT",
    }).then((res) => {})
    window.location.pathname = "/endscreen"
}