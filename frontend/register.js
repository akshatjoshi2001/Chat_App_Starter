
// You saw how in login.js we used the fetch call to login the user. You are supposed to do the same for registeration



//  Let's create a function handleRegister() which will be called when the register button is clicked.
function handleRegister()
{
    username = document.getElementById("username").value // fetching username from the input box
    password = document.getElementById("password").value // fetching password from the input box
    name = document.getElementById("name").value // fetching name from the input box



    // Write a method which will call our registration API at the backend using the POST method. Use the 'fetch' Web API  call, 
    // Also report errors if any during the process using the reportError() function defined below.
    fetch("/api/register",{
        method:'POST',
        body:JSON.stringify({username:username,password:password,name:name}),
        headers: {
            'Content-Type': 'application/json'
          }
    }).then((response)=>{
       
        // Write your code here
   
      

    })
    

}

// UI function for reporting errors. Do not edit this.
function reportError(string)
{
    document.getElementById("error").innerHTML=string;
}