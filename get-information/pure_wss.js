const WebSocketServer = require('ws');
const request = require('request');
let clients = {};
const port = 7001;
let webSocketServer = new WebSocketServer.Server({
  port: port,
});
/**
 * Отправка сообщения всем, кроме себя
 * @param {*} clients объект подключенных клиентов
 * @param {*} message сообщение, которое планируем отправить
 * @param {*} id свое id, которое исключает это id из получателей
 */
function sendMessageAll(clients, message, id) {
  for (const key in clients) {
    if (key == id) continue;
    clients[key].send(message);
  }
}
//Отправка сообщения от сервера только себе
function sendMessageYourself(mySocket, message) {
  mySocket.send(message);
}
/**
 * Получение количества юзеров или задач от rest api
 * возможные значения entity 'users' и 'tasks'
 * @param {*} entity
 * @param {*} mySocket
 */
function getCount(entity, mySocket) {
  let url = `http://admin:123@127.0.0.1:3000/${entity}`;
  request(url, async (err, res, body) => {
    if (err) {
      sendMessageYourself(
        mySocket,
        `У нас случилась ошибка, мы уже чиним.
        Текст ошибки: ${err}.
        Хотя скорее всего Вы просто не запустили проект с Rest API`
      );
      return;
    } else {
      const resBody = res.body;
      const answer = JSON.parse(resBody).length;
      sendMessageYourself(mySocket, answer);
      return;
    }
  });
}
function checkToken(url, expectedToken = '123') {
  let result = false;
  let parameters = new Map();
  url
    .replace('/?', '')
    .split('&')
    .forEach((element) => {
      const [parameter, value] = element.split('=');
      parameters.set(parameter, value);
    });
  if (parameters.has('token')) {
    result = parameters.get('token') == expectedToken;
  }
  return result;
}
// Основа взаимодействия сервера с клиентом.
webSocketServer.on('connection', (ws, req) => {
  if (!checkToken(req.url)) {
    ws.close(1000, 'Токен какой-то не такой');
    return;
  }
  let answer = '';
  const id = Number(Math.random().toString().replace('0.', ''));
  clients[id] = ws;
  clients[id].send(
    `Соединение установлено. Для получения инструкции отправьте слово help`
  );
  console.log('Установлено соединение ' + id);
  ws.on('message', (message) => {
    message = message.toString();
    switch (message) {
      case 'help':
        answer = `Если хотите узнать количество существующих юзеров в REST API, введите users.
          Количество созданных задач в REST API можно узнать введя tasks.
          Для общения с остальными подключенными юзерами просто отправляйте сообщения`;
        sendMessageYourself(clients[id], answer);
        break;
      case 'users':
        getCount(message, clients[id]);
        break;
      case 'tasks':
        getCount(message, clients[id]);
        break;
      default:
        if (message) {
          sendMessageAll(clients, message, id);
        }
    }
  });
  ws.on('close', () => {
    console.log(console.log('соединение закрыто ', id));
    delete clients[id];
  });
});
console.log(`Сервер запущен на ws://127.0.0.1:${port}`);
