const express = require('express'),
  app = express(),
  http = require('http').createServer(app),
  io = require('socket.io')(http),
  request = require('request');

const host = '127.0.0.1';
const port = 7000;
const hostRest = '127.0.0.1';
const portRest = 3000;

let clients = [];
function getCount(entity, socket) {
  let url = `http://admin:123@127.0.0.1:3000/${entity}`;
  request(url, async (err, res, body) => {
    if (err) {
      socket.emit(
        'message',
        `У нас случилась ошибка, мы уже чиним. Текст ошибки: ${err}`
      );
      return;
    } else {
      const resBody = res.body;
      const answer = JSON.parse(resBody).length;
      socket.emit('message', answer);
      return;
    }
  });
}
io.on('connection', (socket) => {
  console.log(`Client with id ${socket.id} connected`);
  clients.push(socket.id);

  socket.emit(
    'message',
    'Соединение установлено. Хотите начать диалог, введите yes'
  );

  socket.on('message', (message) => {
    let answer = '';

    switch (message) {
      case 'yes':
        answer =
          'Если хотите узнать количество существующих юзеров, введите users. Количество задач можно узнать введя tasks';
        break;
      case 'users':
        getCount(message, socket);
        break;
      case 'tasks':
        getCount(message, socket);
        break;
      default:
        answer = `Я не знаю, что Вам ответить. Меня к такому не готовили `;
    }
    if (answer) {
      socket.emit('message', answer);
    }
  });

  socket.on('disconnect', () => {
    clients.splice(clients.indexOf(socket.id), 1);
    console.log(`Client with id ${socket.id} disconnected`);
  });
});

app.use(express.static(__dirname));
http.listen(port, host, () =>
  console.log(`Server listens http://${host}:${port}`)
);
