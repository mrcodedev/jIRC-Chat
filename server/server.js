const WebSocket = require("ws")

const wss = new WebSocket.Server({ port: 8081 })

wss.on("connection", (ws) => {
  console.log("New client connected!")

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
