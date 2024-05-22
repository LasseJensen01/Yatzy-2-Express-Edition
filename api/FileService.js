import fs from 'fs'

class FileService {
    static async readFile() {
        let fileContent = await fs.promises.readFile('./users.json', {encoding: 'utf-8'})
        if (fileContent.trim() === '') {
            // If file is empty, return an empty object
            return {};
        }
        return JSON.parse(fileContent)
    }
    
    static async writeFile(player) {
        let existingData = await FileService.readFile()
        if (!existingData.players) {
            // Checks wether or not the users.json already has a players array, if not makes one
            existingData.players = [];
        }
        existingData.players.push(player)

        existingData = JSON.stringify(existingData)
        await fs.promises.writeFile('./users.json', existingData, {encoding: 'utf-8'})
    }
}

export default FileService;