let buttonNode = document.getElementById("reset")

if(buttonNode){
    buttonNode.addEventListener('click', (event) =>{
     console.log("virker knappen?")
     window.location.href = 'http://localhost:6969/register'
    });
}
//redirect to register screen
