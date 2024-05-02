import {Router} from 'express'
let api = Router()

import fs from 'fs'


// Alle Restful api kald:
api.get('/', (req,res)=> {
    // masser af beregninger og db opslag og andet fedt for at bygge det objekt der sendes
    res.status(200).send({
        status: true,
        response: "Hello World!"
    })
})

api.post('/user', async (req,res)=> {
    let userName = req.body.userName
    await writeFile({user: userName})
    res.status(200).send({status: "OK"})
})

// Øvelse: flyt læs og skriv over i en serviceKlasse fil og importer og brug den her
async function readFile() {
    let fileContent = await fs.promises.readFile('./users.json', {encoding: 'utf-8'})

    return JSON.parse(fileContent)
}

async function writeFile(data={}) {
    let existingUsers = await readFile()
    existingUsers.push(data)
    existingUsers = JSON.stringify(existingUsers)
    await fs.promises.writeFile('./users.json', existingUsers, {encoding: 'utf-8'})
}

export default api