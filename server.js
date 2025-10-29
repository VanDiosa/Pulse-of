const express = require('express');
const http = require('http');

const { Server } = require("socket.io"); // const socketIO = require('socket.io');
const { SerialPort } = require('serialport'); // para conectar y leer los datos del microbit...
const { ReadlineParser } = require('@serialport/parser-readline'); //...a traves del puerto USB

const app = express();
const server = http.createServer(app);
const io = new Server(server); // const io = socketIO(server); sintaxis moderna de V4
const port = 3000;

app.use(express.static('public'));

// Microbit
const microbitPort = new SerialPort({ path: 'COM10', baudRate: 115200 }); //REVISAR SIEMPRE QUE SE CAMBIA DE MICROBIT Y MODIFICAR EL COM
const parser = microbitPort.pipe(new ReadlineParser({ delimiter: '\n' }));

parser.on('data', (line) => { // separar los valores (botones y acelerometro)
    const [x, y, a, b] = line.trim().split(',');
    const data = {
        x: Number(x),
        y: Number(y),
        buttonA: a === 'True' || a === '1',
        buttonB: b === 'True' || b === '1'
    };

    if (data.buttonA) io.emit('microbit', { button: 'A' });
    if (data.buttonB) io.emit('microbit', { button: 'B' });
});

// Socket.io
io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');

    socket.on('message', (data) => { // Comunicacion Mobile → Desktop
        io.emit('message', data); // ahora io.emit en lugar de broadcast para asegurar que los 3 reciban todos los datos de sincronizacion
    });

    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});

server.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});
