let buttonNode = document.getElementById('register')
let usernameInput = document.getElementsByName('username')
let userList = document.getElementById("playerList")
buttonNode.addEventListener('click', (event)=>{
    //TODO
    // Hvad der skal ske når vi klikker på register knap i login
    console.log("Dakker");
    let name = usernameInput.value;
    userList.appendChild("Dakker")
})


