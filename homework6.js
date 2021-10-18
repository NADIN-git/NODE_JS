const io = require('socket.io');
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((request, response) => {
    if (request.method === 'GET') {

        const filePath = path.join(__dirname, 'homework6.html');

        readStream = fs.createReadStream(filePath);

        readStream.pipe(response);
    } else if (request.method === 'POST') {
        const data = '';

        request.on('data', chunk => {
            data += chunk;
            console.log("fgflgd" + data);
        });

        request.on('end', () => {
            const parsedData = JSON.parse(data);
            console.log(parsedData);

            response.writeHead(200, { 'Content-Type': 'json' });
            response.end(data);
        });
    } else {
        response.statusCode = 405;
        response.end();
    }
});

const socket = io(server);
const clients = []; //массив подключенных клиентов
const countClients = [];

socket.on('connection', function (socket) {
    const id = Math.random(); //клиенту присваивается рандомный id при подключении
    clients[id] = socket; //клиент идентифицируется на сервере с этим id
    countClients.push(socket.id)
    const cliCount = countClients.length
    console.log("новое соединение " + id + ", подключений: " + cliCount);
    socket.on('CLIENT_COUNT', () => {
        socket.emit('IN_CLIENTS', { msg: cliCount });
        socket.broadcast.emit('IN_CLIENTS', { msg: cliCount });
    });

    socket.on('NEW_CONN_EVEN', () => {
        socket.broadcast.emit('SERVER_NEW', { msg: "новое соединение " + id });
    });

    socket.on('CLIENT_MSG', (data) => {
        socket.broadcast.emit('SERVER_MSG', { msg: id + ": " + data.msg });
        socket.emit('SERVER_MSG', { msg: id + ": " + data.msg });
    });

    socket.on('disconnect', () => {
        countClients.pop(socket.id)
        const cliCount = countClients.length
        socket.emit('OUT_CLIENTS', { msg: cliCount });
        socket.broadcast.emit('OUT_CLIENTS', { msg: cliCount });
        console.log('Пользователь ' + id + ' покинул систему, подключений: ' + cliCount);
        socket.broadcast.emit('SERVER_OUT', { msg: id + ": покинул чат" })
    })
});

server.listen(3000, 'localhost');

