import express from 'express'
const app = express()

app.use(express.static('assets'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Session opsætning
// secret = salt
//const session = require('express-session')
import session from 'express-session' // Skal laves om til import ellers klager ES6 modulet
app.use(session({
  secret: 'lick.ma.pussy.and.my.crack',
  saveUninitialized: true,
    resave: true
}))

// Viewengine opsætning
app.set('view engine', 'pug')


app.get('/', (req,res)=> {
    res.render('main')
})

app.listen(6969, ()=> {console.log("Yatzy Time!")})