class Player {
    constructor(name) {
        this._name = name;
        this._score = new Array(15).fill(false);
        this._numberOfGamesPlayed = 0;
        this._totalScore = 0;
        this._avgScore = 0;
        this._numberOfRolls = 0;
    }
    // getters
    get name() {
        return this._name;
    }
    get score() {
        return this._score;
    }
    // setters
    set name(param) {
        this._name = param;
    }
    /**
     * Indsæt en score i playerens score array.
     * @param {int} index index for score arrayen
     * @param {int} value scoren for det givne index
     */
    setScore(index, value) {
        this._score[index] = value;
        // this.elementArray[int] = true; //Dafuq is dis ?
    }
    resetScore(){
        this._score = new Array(15).fill(false);
    }
}

export default Player;