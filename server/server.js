const express = require("express")
const http = require("http")
const WebSocket = require("ws")

const PORT = 8081
const SERVER = http.createServer(express)
const wss = new WebSocket.Server({ server: SERVER })

wss.on("connection", (ws) => {
  ws.on("open", (data) => {
    console.log(data)
  })

  ws.on("message", (data) => {
    console.log(`Client has sent us: ${data}`)
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data)
      }
    })
  })

  ws.on("error", (data) => {
    console.log("ERROR :(")
    console.log(data)
  })

  ws.on("close", (data) => {
    console.log(data)
    console.log("Client has disconnected!")
  })
})

SERVER.listen(PORT, () => {
  console.log(`Server is listening on PORT: ${PORT}!`)
})
