import fs from 'fs'

class FileService {
    static async readFile() {
        let fileContent = await fs.promises.readFile('./users.json', {encoding: 'utf-8'})
    
        return JSON.parse(fileContent)
    }
    
    static async writeFile(data={players: []}) {
        let existingUsers = await readFile()
        let playerArr = JSON.parse(existingUsers);
        for (let i = 0; i < data.players.length; i++){
            let player = data.players[i];
            if (playerArr.findIndex(p => p.name == player.name) != -1){
                let idx = playerArr.findIndex(p => p.name == player.name);

            }
        }
        existingUsers.push(data)
        existingUsers = JSON.stringify(existingUsers)
        await fs.promises.writeFile('./users.json', existingUsers, {encoding: 'utf-8'})
    }
}

export default FileService;