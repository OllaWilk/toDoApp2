const express = require('express');
const socket = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = app.listen(8000, () => {
    console.log('Server is running on port 8000');
});

const io = socket(server);

let tasks = [];

io.on('connection', (socket) => {

    socket.emit('updateData', tasks);

    socket.on('addTask', task => {
      console.log('New task added ' + task);
      tasks.push(task);
      socket.broadcast.emit('addTask', task);
    });

    socket.on('removeTask', (taskIdex) => {
      console.log('Task with index ' + taskIdex + 'removed.');
      tasks.splice(taskIndex, 1);
      socket.broadcast.emit('removeTask');
    });
});

app.use((req, res) => {
    res.status(404).send({ message: 'not found...'});
});