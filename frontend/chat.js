
// All chat related code (socket.io events etc.) will go here.

/* Defining a global socket.io object named 'socket'. On every interaction with the socket.io server we will pass on the 'token'.
    A function named getCookieValue() has been defined at the bottom which will extract the cookie value of a particular cookie.

*/
var socket = io({
    query:{
        "token":getCookieValue("token")
    }
})

// In case the server replies with a wrong token message, your task is to redirect the user to the login page.
socket.on('wrongtoken',()=>{
    window.location="/login.html" // Use window.location here to redirect the user to the login page.
})


files = {} // Files object


// Recieveing text and files. 
socket.on('message',(data)=>{
    if(data.dataType=="text")
    {

        // Write your code here
        
        
    
    }
    else if(data.dataType=="file")
    {

        // Write your code here
      
    }
  
})

// This is the search functionallity. 
async function search()
{
    query = document.getElementById("searchBox").value
    
    
    fetch("/api/search/"+query).then(async (res)=>{
        result = await res.json()
        console.log(result)
        usersList = []
        result.forEach((user)=>{
            usersList.push(new User(user.name,user.username,"",false))

        })
        setUsersList(usersList)
        

    })
}



async function uploadFile()
{
   
    document.getElementById("uploadStatus").innerHTML="Uploading...";
   


    // Write your code here
   

   
}



// This is how we send text 
function send()
{
    message = document.getElementById("messageBox").value // Fetch message from message box.
    sendTo = document.getElementById("sendTo").value // This is a 'hidden' input element, containing whom to send the message to.
    date = new Date()
    socket.emit("sendMessage",{sendTo:sendTo,dataType:"text",data:message,date:date})
    let str = message.replaceAll(/</g,"")
     str = str.replaceAll(/>/g,"")
    
    addMessageBySender(str,date,"")
}
