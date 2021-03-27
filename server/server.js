import { Server } from 'ws';

const wss = new Server({port:6666});

wss.on('connection', (WebSocket) => {
  wss.on('message', (data) => {
    wss.clients.forEach((client) => {
      if(client.readyState === WebSocket.OPEN) {
        client.send(data)
      }
    })
  })
})