const mongoose = require("mongoose")


// Define Database schema here




// Look at the users schema below. This illustrates on how to create a Schema in Mongooose
let usersSchema = mongoose.Schema({

    username:String,
    password:String,
    name:String

});

// Now you have to implement a Chat Schema which will store chats in the database.
// We shall not be using it in the live demo. It's an Homework

// Write your code here




// The user model is defined here
const User = mongoose.model("User",usersSchema)

// Similarly create a Chat model using the chatSchema you created above.

const Chat = null // Replace null with the correct code


module.exports = {User:User,Chat:Chat}
