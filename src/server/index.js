const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 3000 });

const clients = new Set();
server.on('connection', (ws) => {
  clients.add(ws);

  ws.on('close', () => {
    clients.delete(ws);
  });

  ws.on('message', (data) => {
    console.log(data, JSON.parse(data));
    const message = JSON.parse(data);
    // eslint-disable-next-line no-restricted-syntax
    for (const client of clients) {
      if (client !== ws) {
        const obj = { message, client };
        // client.send(obj);
        client.send(JSON.stringify(obj));
      }
    }
  });
});
