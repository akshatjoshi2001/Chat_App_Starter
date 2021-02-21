/*
    Made for Shaastra Workshop 2021. Created by Akshat Joshi.
    

    This is the javascript file which handles all UI related events. You don't need to edit this file.
    This file exposes an API which can be used for controlling the User Interface.
    The API documentation is availaible on the github page.
    



*/



/**
 * Clears cookies. And logs out the user
 */
function logout()
{
    document.cookie="token= ;username= ";
    window.location="/";
}


window.onload = ()=>{
    document.getElementById("chatBox").style.visibility="hidden"
   
    document.getElementById("userhello").innerHTML="Hi <b>" + getCookieValue("username") +"</b><br /> <a class='logout' href='#' onclick='logout()'>Logout</a>"
    if(getCookieValue("username") == undefined)
    {
        window.location="/login.html"
    }
    
}

/**
 * Gets the value of a cookie stored in the user's browser
 * @param {string} name - The name of the cookie
 */

function getCookieValue(name)
{
    arr = document.cookie.split(';')
    for(i in arr)
    {
        el = arr[i]
        
        if(el.split("=")[0].trim()==name)
        {
          
            return el.split("=")[1]
        }
    }

    
}



/** The User class. It is used for describing the meta data of User(s) for the UI */
class User
{
    /**
     * 
     * @param {string} name - The full name of the user
     * @param {string} username - The username of the user
     * @param {string} profile_image - The profile picture URL
     * @param {boolean} online - If true then user is online, if false then user is offline 
     */
    constructor(name,username,profile_image,online)
    {
        this.name = name
        this.username = username
        if(profile_image != undefined && profile_image != "")
        {
            this.profile_image = profile_image
        }
        else
        {
            this.profile_image  = "/profile.png"
        }
        this.online = online
    }
}

/**
 * Gets the username of the currently active user
 */

function getActiveUser()
{
    return document.getElementById("sendTo").value;
}




users_map = []
/**
 * 
 * @param {Array<User>} userList - List of Users 
 */
function setUsersList(userList)
{
    

    document.getElementById("users_list").innerHTML = ""
    
    userList.forEach((user,i)=>{
        users_map.push(user)
        id = users_map.length - 1

        html = '<li onclick="setActiveUser('+id+')" id="user'+i+'">'
        html+='<div class="d-flex bd-highlight">'
        html+='<div class="img_cont">'
        html+='    <img src="'+user.profile_image+'" class="rounded-circle user_img">'
        if(user.online)
        {
        html+='    <span class="online_icon"></span>'
        }
        html+='</div>'
        html+='<div class="user_info">'
        html+='<span>'+user.name+'</span>'
        html+='<p>'+user.username+'</p>'
        html+='</div></div></li>'
        document.getElementById("users_list").innerHTML=document.getElementById("users_list").innerHTML+html



    });
    


}


function setActiveUser(id)
{
    user = users_map[id]
    clearConversation()
    document.getElementById("chatBox").style.visibility="visible"
    
    setConversationTop(user.name,user.username,user.online,user.profile_image)
    document.getElementById("sendTo").value=user.username
    
}


/**
 * Clears the entire conversation
 */

function clearConversation()
{
    document.getElementById("messages").innerHTML=""
}


/**
 * Set attributes on the top bar of the conversation
 * @param {string} title - The title bar of the conversation
 * @param {string} desc  - The description of the conversation (May include stuff like number of unread messages or the user's username in the conversation)
 * @param {string} profile_image - The URL of the profile picture of the reciever in the conversation
 * @param {boolean} online - If true then reciever is online, if false then reciever is offline 
 */

function setConversationTop(title,desc,online,profile_image)
{
    document.getElementById("title").innerHTML=title
    document.getElementById("desc").innerHTML=desc
    if(online)
    {
    document.getElementById("online_status").style.visibility="visible"
    }
    else{
        document.getElementById("online_status").style.visibility="hidden"

    }
    document.getElementById("profile_image").setAttribute("src",profile_image)



    
}
/**
 * 
 * @param {string} message - Message by the sender 
 * @param {string} date - Date and Time when the message was sent
 * @param {string} image -  URL of the profile picture of the sender
 */


function addMessageBySender(message,date,image)
{


    html=""
    html+='<div class="d-flex justify-content-end mb-4">'

    html+=' <div class="msg_cotainer_send">'
    html+=message
    html+=   '<span class="msg_time_send">'+ date + '</span>'
    html+='</div>'
    html+='<div class="img_cont_msg">'
    html+='<img src="">'
    html+= '</div>'

    document.getElementById("messages").innerHTML= document.getElementById("messages").innerHTML+html




}
/**
 * 
 * @param {string} message - Message by the reciever 
 * @param {string} date - Date and Time when the message was recieved
 * @param {string} image -  URL of the profile picture of the reciever
 */

function addMessageByReciever(message,date,image)
{
    
    html=""
    html+='<div class="d-flex justify-content-start mb-4">'

    html+=' <div class="msg_cotainer">'
    html+=message
    html+=   '<span class="msg_time">'+ date + '</span>'
    html+='</div>'
    html+='<div class="img_cont_msg">'
    html+='<img src="">'
    html+= '</div>'

    document.getElementById("messages").innerHTML= document.getElementById("messages").innerHTML+html

}
/**
 * 
 * @param {string} url - URL of the file
 * @param {string} date - Date and Time when the message was recieved
 * @param {string} image -  URL of the profile picture of the reciever
 */

function addFileByReciever(url,date,image)
{
    html = "Hey! You recieved a file: <a href='"+url+"'>Download it</a>"
    addMessageByReciever(html,date,image)
}

/**
 * 
 */
function showUploadArea()
{
    document.getElementById("fileBox").click()
    document.getElementById("uploadArea").style.visibility="visible"
}