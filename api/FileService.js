import fs from 'fs'
import Player from '../assets/js/Player.js';

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
                existingData.players = existingData.players.filter(p => p._name !== player._name)
                existingData.players.push(player)
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