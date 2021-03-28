const WebSocket = require("ws").Server

const wss = new WebSocket({ port: 8081 })

console.log("Chat Server Started")

wss.on("connection", (ws) => {
  ws.on("open", (data) => {
    console.log(data)
  })

  ws.on("ping", (data) => {
    console.log(data)
  })

  ws.on("message", (data) => {
    console.log(`Client hast sent us: ${data}`)
    // wss.clients.forEach((client) => {
    //   if (client.readyState === WebSocket.OPEN) {
    //     client.send(data)
    //   }
    // })
  })

  ws.on("error", (data) => {
    console.log("ERROR :(")
    console.log(data)
  })

  ws.on("close", (data) => {
    console.log("Client has disconnected!")
  })
})
