let buttonNode = document.getElementById('register')
let usernameInput = document.getElementById('userName')
let userList = document.getElementById('playerList')
buttonNode.addEventListener('click', (event)=>{
    //TODO
    // Hvad der skal ske når vi klikker på register knap i login
    console.log("Dakker");
    let name = usernameInput.value;
    let listItem = document.createElement('li')
    listItem.textContent = name
    userList.appendChild(listItem)
})


