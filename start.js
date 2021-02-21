/*

    Welcome to Shaastra Workshop 2021. This project is being used for teaching Node, Mongo and Socket.io.
    Some parts of the project have been removed, and you have to implement them.
    I will be coding on the side revealing the solution and discussing it.

*/




// Importing required modules
const express = require("express")

const app = express() // Our own API server

const chatServerHTTP = require("http").Server(app)
const io = require("socket.io")(chatServerHTTP) // Passing the chat server to Socket.io, so that the API and Socket.io server is common 
const bodyParser = require("body-parser")
const jwt = require("jsonwebtoken")




// Chat functionality


users = {}  // An object (or a hash map) mapping username to Socket.io "socket"



/*
        The first socket.io function is 'on'. This registers a callback, which will be triggered whenever a particular 'event'
        occurs. 
*/

io.on('connection',(socket)=>{
    // We enclose everything in a try-catch block, so that errors do not stop our program.
    try
    {
        let user = jwt.verify(socket.handshake.query["token"],"shaastra") // Verifying the json web token
        console.log(user)
        if(user)
        {
            users[user.username] = socket
        }

        /*
            Here we introduce a function called emit. It will emit a message for a particular socket.
            If you want to emit a message to everyone, use io.emit(). 



        */

        socket.emit('message',{dataType:"text",data:"Hello",senderType:0})
        socket.on('sendMessage',(data)=>{
            
            if(users.hasOwnProperty(data.sendTo))
            {
                data.sender = user.username
                users[data.sendTo].emit("message",data)
            }
        })
        socket.on('disconnect',()=>{
            delete users[user.username] // Delete user from Hash Map (or Object) upon disconnection
            console.log("disconnected")
        })
    }
    catch(err)
    {
        console.log("error")
        socket.emit('wrongtoken',{})
        socket.disconnect()
    }
   


})







// Core App functionality

app.use(bodyParser.json())






const apiRouter = require("./api")

app.use('/api',apiRouter)



// Send frontend web page and static files to user
app.get('/',(req,res)=>{
    res.sendFile(process.cwd() + "/frontend/chat.html")
})

app.get('/:fileName',(req,res)=>{
        res.sendFile(process.cwd() + "/frontend/"+req.params.fileName)
}) 






chatServerHTTP.listen(8080,()=>{
    console.log("Chat App started")
})
