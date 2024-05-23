import express from 'express'
const app = express()

app.use(express.static('assets'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use((req, res, next) => {
  console.log(req.url);
  next();
})


// Session opsætning
// secret = salt
//const session = require('express-session')
import session from 'express-session' // Skal laves om til import ellers klager ES6 modulet
app.use(session({
  secret: 'tomatosauce',
  saveUninitialized: true,
    resave: true  
}))

// Viewengine opsætning
app.set('view engine', 'pug')


app.get('/main', (req,res)=> {
  console.log('Forside');
    res.render('main')
})



app.get('/register', (req,res)=> {
  res.render('login')
})

app.get('/endscreen', (req, res) => {
  console.log("We dem bois");
  res.render('endscreen')
  res.end()
})


import gameLogic from './api/GameLogic.js'
app.use('/gameLogic', gameLogic)


//Midlleware der fanger ALLE requests
app.use((req, res, next) => {
  res.status(404).send('You lost?')
})

app.listen(6969, ()=> {console.log("Yatzy Time!")})
