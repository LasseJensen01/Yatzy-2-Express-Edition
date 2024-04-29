// Javascript GUI code

// setting the images
let dice1 = new Image();
dice1.src = "/img/1hovedterning.png";
let dice2 = new Image();
dice2.src = "/img/2hovedterning.png";
let dice3 = new Image();
dice3.src = "/img/3hovedterning.png";
let dice4 = new Image();
dice4.src = "/img/4hovedterning.png";
let dice5 = new Image();
dice5.src = "/img/5hovedterning.png";
let dice6 = new Image();
dice6.src = "/img/6hovedterning.png";

// button
let button = document.getElementById("rollButton");
button.addEventListener('click', buttonRoll);

// arrays
let arrayNumbahs = Array.from({ length: 5 }); // array for the dice 1-5
let arrayFrequency = Array.from({ length: 7 }).map(() => 0); // array for the numbers 1-6, showing their frequency, not using rn might delete later
let arrayBools = [false, false, false, false, false]; // array for the boolean values
let arrayBoolsTemp = [false, false, false, false, false]; // temporary array for the boolean values

// throwcount
let throwcount = document.getElementById('throwcount');
throwcount.disabled

// GUI functions
function buttonRoll() {
    setBoolArray();
    for (let index = 0; index < arrayNumbahs.length; index++) {
        let element = arrayNumbahs[index];
        if (!arrayBools[index]) {
            let numbah = randomNumbahGenerator();
            arrayNumbahs[index] = numbah;
            let idPic = "dice" + (index+1);
            let diceImg = document.getElementById(idPic);
            diceImg.src = "/img/" + numbah + "hovedterning.png";
        }
    }
    let count = parseInt(throwcount.value);
    throwcount.value = ++count;
    if (throwcount.value == 3) {
        button.disabled = true;
    }
    setResults();
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
    for (let index = 0; index < arrayNumbahs.length; index++) {
        let idPic = "dice" + (index+1);
        let diceImg = document.getElementById(idPic);
        let parNode = diceImg.parentNode;
        if (parNode.classList.contains("diceLocked")){
            parNode.classList.remove("diceLocked")
            parNode.classList.add("diceOpen")
        }
        diceImg.src = "/img/sortbox.png";
        arrayNumbahs[index] = 0;
    }
    arrayBoolsTemp = [false, false, false, false, false];
    setBoolArray();
}


function setResults(){
    let results = getResults();
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
    }
    inputSummer[0].value = sum;
}

// Inputmethods for locking an input
function inputLock() {
    if (parseInt(throwcount.value) > 0) {
        let idNr = this.id;
    let element = document.getElementById(idNr);
    element.disabled = true;
    element.classList.add("lockedInput");
    resetThrowAndButton();
    resetDice();
    setResults();
    sumBonusTotalSet();
    totalSumInputs();
    finished();
    }
}

elementArray.forEach(element => {
    element.addEventListener('click', inputLock)
});

//needs changes
function fillelementArray(){
    for (let i of elementArray){
        i.setAttribute('value', 1);
    }
    console.log(elementArray.toString);
}

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

function finished() {
    let count = 0;
    for (let i = 0; i < elementArray.length; i++){
        if (elementArray[i].disabled){
            count++;
        }
    }
    if (count == 15) {
        setTimeout(function() {
            // Show the alert after the changes have been made
            alert("Du er færdig! Start nyt spil?");
            location.reload();
        }, 0);
    }
}

// Javascript Thinking Code
///////////////////////////////////////////////////////////
// generates random number between 1 & 6
function randomNumbahGenerator() { 
    let numbah = Math.floor(Math.random() * 6) + 1;
    return numbah;
}

function frequency() { // generates an array symbolising the frequency of the numbers 1-6
    let frequency = Array.from({ length: 7 }).map(() => 0);
    for (let index = 0; index < arrayNumbahs.length; index++) {
        frequency[arrayNumbahs[index]]++;
    }
    return frequency;
}
//Result functions

//Same value points. Can be used for 1 - 6
function sameValuePoints(value){
    let sum = 0;
    for (let i = 0; i < arrayNumbahs.length; i++){
        if (value == arrayNumbahs[i]){
            sum += value;
        }
    }
    return sum;
}


// One Pair Points
function onePairPoints(){
    let sum = 0;
    let freq = frequency();
    for (let i = 0; i < freq.length; i++){
        if (freq[i] > 1){
            sum = i*2;
        }
    }
    return sum;
}

//Two pair points
function twoPairPoints(){
    let sum = 0;
    let count = 0;
    let freq = frequency();
    for (let i = 0; i < freq.length; i++){
        if (freq[i] > 1){
            sum += i*2;
            count++;
        }
    }
    if (count == 2){
        return sum;
    }
    return 0;
}

// ThreeSamePoints
function ThreeSamePoints() {
    let freq = frequency();
    let sum = 0;
    for (let i = 1; i < 7; i++) {
        if (freq[i] > 2) {
            sum = i * 3;
        }
    }
    return sum;
}

// Four Same
function fourSamePoints(){
    let sum = 0;
    let freq = frequency();
        for (let i = 1; i < freq.length; i++){
            if (freq[i] > 3){
                sum = i * 4;
            }
        }
        return sum;
}


// FullHouse
function fullHouse() {
    let freq = frequency();
    let sum = 0;
    let hasFound2 = false;
    let hasFound3 = false;
    for (let i = 1; i < 7; i++) {
        if (freq[i] == 2) {
            sum += i * 2;
            hasFound2 = true;
        } else if (freq[i] == 3) {
            sum += i * 3;
            hasFound3 = true;
        }
    }
    if (hasFound2 && hasFound3) {
         return sum;
    } else return 0;
}

// Small Straight
function smallStraightPoints() {
    let freq= frequency();
    for (let i = 1; i < 6; i++) {
        if (freq[i] != 1) {
            return 0;
        }
    }
    return 15;
}

// Large Straight
function largeStraightPoints() {
    let freq = frequency();
    for (let i = 2; i < 7; i++) {
        if (freq[i] != 1) {
            return 0;
        }
    }
    return 20;
}

// Chance Points
function chancePoints() {
    let sum = 0;
    for (let i = 0; i < arrayNumbahs.length; i++) {
        sum += arrayNumbahs[i];
    }
    return sum;
}

// Yatzy Points
function yatzyPoints() {
    let freq = frequency();
    for (let i = 1; i < 7; i++) {
        if (freq[i] == 5) {
            return 50;
        }
    }
    return 0;
}

//Get results method
function getResults() {
    let results = Array.from({ length: 15});
    for (let i = 0; i <= 5; i++){
        results[i] = sameValuePoints(i+1);
    }
    results[6] = onePairPoints();
    results[7] = twoPairPoints();
    results[8] = ThreeSamePoints();
    results[9] = fourSamePoints();
    results[10] = fullHouse();
    results[11] = smallStraightPoints();
    results[12] = largeStraightPoints();
    results[13] = chancePoints();
    results[14] = yatzyPoints();
    return results;
}

