
// Importing required modules
const mongoose = require("mongoose")
const models = require("./models")
const express = require("express")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")


// Connecting to the database
mongoose.connect('mongodb://localhost:27017/letschat', {useNewUrlParser: true, useUnifiedTopology: true});


// Some errors that can be shown to the user.
let errors = [
    "Successful",
    "Invalid username/password",
   "Operation not allowed",
    "Username already exists",
    "Data missing",
    "Unknown Error"
];

// This function returns an object that will be sent back to the user as response after some operation in JSON format.
function apiMessage(errorCode,data)
{
    return {status:errorCode,message:errors[errorCode],data:data}



}


let router = express.Router()



/*
    Look at the register API function. You need to understand this, and similarly implement the login API function.
*/
router.post('/register',(req,res)=>{
    let username = req.body.username;  // Getting the username. We extract the username from the HTTP request body
    let password = req.body.password; // Getting the password. Same as above.

    const hash = crypto.createHash('sha256').update(password).digest('base64'); // We hash the password using SHA256
    let name = req.body.name;
    if(!username || !password || !name) // Check if username or password is empty or not
    {
        return res.json(apiMessage(4,{}))  // If empty send error message (with error code 4)
    }

    if(username.trim()=="" || password.trim()=="" || name.trim()=="")  // If empty send error message (with error code 4)
    {
        return res.json(apiMessage(4,{}))
    }
     // Check if username already exists
     
    models.User.find({username:username}).then((users)=>{
        console.log(users)
        if(users.length>0)
        {
            return res.json(apiMessage(3,{}));
        }
          // Store inside database
    let newUser = new models.User({username:username,password:hash,name:name})
    
    newUser.save((err,user)=>{
        if(err)
        {
            console.log(err)
            return res.json(apiMessage(5,{trace:err}))
        }
       
       return res.json(apiMessage(0,{})) // If registeration was successful return success. Note that we haven't called return from outside the callback

    })

   });
  

});

// Now implement the Login API function.

router.post('/login',(req,res)=>{
        
        // Write your code here
     
        
})

// Also write the API function call to search for a user
router.get('/search/:query',(req,res)=>{
   // Write your code here
});





module.exports = router;