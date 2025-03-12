const express = require('express')
const http = require('http')
const Server = require('socket.io').Server

const app = express()

const server = http.createServer(app)
const io = new Server(server,{
    cors:{
        origin:"*"
    }
})

io.on("connection",(socket)=>{
    console.log("connected");
    
    //push all communicateion to users
    socket.on("chat",chat =>{
        io.emit("chat",chat)
    })
    socket.on("disconnect",()=>{
        console.log("disconnect")
    })
})

server.listen("3001",()=>{
  console.log("running on 3001n port");
  
})