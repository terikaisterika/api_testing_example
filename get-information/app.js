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
let clientsWorkSpace = [];
let nicknames = {};
//Получить количество сущностей из rest api
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
        answer = `Если хотите узнать количество существующих юзеров, введите users.
          Количество задач можно узнать введя tasks.
          Чтобы оповестить всех о своем подключении, отправьте all.
          Если надо подключиться к рабочему пространству, то это можно сделать по урлу ws://${host}:${port}/work.`;
        break;
      case 'users':
        getCount(message, socket);
        break;
      case 'tasks':
        getCount(message, socket);
        break;
      case 'all':
        io.sockets.emit(
          'informEveryone',
          `К нам присоединился пользователь с ${socket.id}`
        );
        break;
      case 'broadcast':
        socket.broadcast.emit(
          'message',
          `Это пример, когда сообщение получают все, кроме отправителя`
        );
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
// Работа с пространствами и комнатами
const work_space = io.of('/work');
work_space.on('connection', (socket) => {
  console.log(`Client with id ${socket.id} connected`);
  let answer = '';
  const introdactionRoom = 'introdactionRoom';
  let rooms = work_space.adapter.rooms;
  clientsWorkSpace.push(socket.id);
  work_space
    .to(socket.id)
    .emit(
      'message',
      'Соединение установлено. Вы присоединились к пространству work. Тут обсуждаются рабочие вопросы'
    );
  socket.on('message', (message) => {
    switch (message) {
      case 'help':
        socket.emit(
          'message',
          `Для только присоединившихся к нашей команде отправьте слово introduction.\n 
          Так Вы присоединитесь к обучающимся. Остальные могут просто отправлять сообщения.`
        );
        break;
      case 'introduction':
        socket.join(introdactionRoom);
        work_space.to(socket.id).emit(
          'message',
          `Тут Вы получите помощь для новичков.
           Общие инструкции можно получить, отправив слово instructions`
        );
        break;
      case 'instructions':
        if (socket.rooms.has(introdactionRoom)) {
          answer = `В первый день нужно ознакомиться с должностными инструкциями на главной странице.
          Далее установить необходимые инструменты.
          Запрашивать доступы нет необходимости.
          После подтверждения Вашей личности запросы на доступы были разосланы автоматически.
          Список приложений и доступов к ним можно будет проверить на вашей личной странице после 12:00.
          Если Вам не хватает какой-то информации, задайте вопрос.
          Мы разошлем его всем в комнате обущающихся.
          Выйти из из комнаты instructions можно отправив слово complete.
          Если нужно отправить сообщение за пределы комнаты, отправьте сообщение с типом события question. 
          Его получат все, кто прослушивает это событие и может ответить на вопросы новичков.`;
        } else {
          answer = `Чтобы воспользоваться командой, присоединитесь к комнате обучающихся через команду introduction`;
        }
        work_space.to(socket.id).emit('message', answer);
        break;
      case 'complete':
        if (socket.rooms.has(introdactionRoom)) {
          socket.leave(introdactionRoom);
          answer = `Вы покинули комнату ${introdactionRoom}`;
        } else {
          answer = `Вы не были в комнате ${introdactionRoom}`;
        }
        work_space.to(socket.id).emit('message', answer);
        break;
      case 'count':
        answer = rooms.has(introdactionRoom)
          ? rooms.get(introdactionRoom).size
          : 0;
        work_space.to(socket.id).emit('message', answer);
        break;
      default:
        socketInRoom = socket.rooms.has(introdactionRoom);
        if (message && answer == '' && socketInRoom) {
          socket.broadcast
            .in(introdactionRoom)
            .emit('message', `${message} (msg для комнаты)`);
        } else if (message && socketInRoom == false) {
          socket.broadcast.emit('message', `${message} (msg для всех)`);
        }
    }
  });
  socket.on('question', (message) => {
    if (message) work_space.broadcast.emit('question', message);
  });
  socket.on('disconnect', () => {
    clientsWorkSpace.splice(clientsWorkSpace.indexOf(socket.id), 1);
    console.log(`Client with id ${socket.id} disconnected`);
  });
});
app.use(express.static(__dirname));
http.listen(port, host, () =>
  console.log(`Server listens ws://${host}:${port}`)
);
