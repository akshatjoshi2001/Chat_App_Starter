
// Let's see how we login the user.

function handleLogin()
{
    username = document.getElementById("username").value  //Fetch the username from the input box
    password = document.getElementById("password").value  //Fetch the password from the input box
 

    // Using the fetch function to call our backend. We use the post method
    fetch("/api/login",{
        method:'POST',
        body:JSON.stringify({username:username,password:password}),
        headers: {
            'Content-Type': 'application/json'
          }
    }).then((response)=>{
       
    // response.json() will return a Promise containing the parsed JSON content. (i.e it will convert JSON into Javascript object)
         response.json().then((data)=>{
             
            if(data.status != 0)   // If status code is not 0 report error.
            { 
                // Reporting error if any
                reportError(data.message)
    
            }
            else
            {
                
                token = data.data.token // Getting the token from the parsed JSON response
                document.cookie = "token="+token+";samesite=strict" // Storing the token in a cookie
                document.cookie = "username="+username+";samesite=strict" // Storing the username in a cookie
                window.location="/chat.html" // Redirecting to the chat page
            }

        })

      

    })
    

}

// UI function for reporting errors
function reportError(string)
{
    document.getElementById("error").innerHTML=string;
}