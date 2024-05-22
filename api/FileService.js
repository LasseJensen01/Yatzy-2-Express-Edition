import fs from 'fs'
import Player from '../Player.js';

class FileService {
    static async readFile() {
        let fileContent = await fs.promises.readFile('./users.json', {encoding: 'utf-8'})
        if (fileContent.trim() === '') {
            // If file is empty, return an empty object
            return {};
        }
        return JSON.parse(fileContent)
    }
    
    static async writeFile(player={Player}) {
        let existingData = await FileService.readFile()
        if (!existingData.players) {
            // Checks wether or not the users.json already has a players array, if not makes one
            existingData.players = [];
        }
        let found = false
        existingData.players.forEach(p => {
            if (p._name == player._name){
                found = true
                p._numberOfGamesPlayed++;
                p._totalScore += player._totalScore
                p._avgScore = p._totalScore/p._numberOfGamesPlayed
                p._numberOfRolls += player._numberOfRolls
            }
        });
        if (!found){
           existingData.players.push(player) 
        }
        

        existingData = JSON.stringify(existingData)
        await fs.promises.writeFile('./users.json', existingData, {encoding: 'utf-8'})
    }
}

export default FileService;