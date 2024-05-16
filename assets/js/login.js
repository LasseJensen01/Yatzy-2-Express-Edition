
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

let buttonNodeStart = document.getElementById('start')
buttonNodeStart.addEventListener('click', (event) => {
    console.log("Game starting");
    senduserData()
    window.location.href = 'http://localhost:6969/main'

})

async function senduserData() {
    // Collect user data from the DOM
    let userData = [];
    userList.querySelectorAll('li').forEach((item) => {
        userData.push(item.textContent);
    });

    const options = {
        method: 'POST', 
        headers: { // Correct typo here
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ users: userData }) // Send userData as an object with key 'users'
    };

    try {
        const response = await fetch('/main', options);
        if (!response.ok) {
            throw new Error('Failed to send user data');
        }
        console.log('User data sent successfully');
    } catch (error) {
        console.error('Error sending user data:', error.message);
    }
}




