import Player from '../Player.js';
import {Router} from 'express'
let gameLogic = Router()

// Arrays Serverside
let arrayNumbahs = [1,1,1,1,1]; // array for the dice 1-5
let players = [] // players
let currentPlayerID = 0;
function addPlayer(player) {
    players.push(player);
}

function nextPlayer() { // Sets the currentPlayerID to the next player in the array
    if (currentPlayerID == players.length - 1) {
        currentPlayerID = 0;
    } else {
        currentPlayerID++;
    }
}


// Server Endpoints
gameLogic.post('/main', (req, res)=> {
    let users = req.body.users
    console.log(users);
    users.forEach((u) => {addPlayer(new Player(u))})
    console.log("Done");
    console.log(players);

    res.json(users)
})

gameLogic.get('/getUsers', (req, res)=> {
    res.json({players: players})
})

gameLogic.get('/buttonRoll/:dice', (req, res)=> {
    let diceString = req.params.dice;
    diceString = diceString.replace('dice=','')
    const dice = diceString.split('-').map(value => value === 'true');
    console.log(dice);
    for (let index = 0; index < arrayNumbahs.length; index++) {
        if (!dice[index]) {
            arrayNumbahs[index] = randomNumbahGenerator();
        }
    }
    const data = getResults();
    //console.log(data);
    //console.log(arrayNumbahs);
    res.json({dices: arrayNumbahs, results: data})
})

gameLogic.put('/inputLock', (req, res)=> {
    console.log("Inputlock ramt");
    const id = req.body.index;
    const value = req.body.value;
    players[currentPlayerID].setScore(id, value);
    let isUpdateSuccessful = false;
    if (players[currentPlayerID]._score[id] != false) {
        isUpdateSuccessful = true;
    }
    console.log(players[currentPlayerID]._score[id]);
    nextPlayer();
    if (isUpdateSuccessful) {
        res.status(200).send({ message: 'User updated successfully' });
    } else {
        res.status(500).send({ message: 'Failed to update user' });
    }
    //res.json({players: players, currentPlayerID: currentPlayerID});
})

// Javascript Thinking Code
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

export default gameLogic