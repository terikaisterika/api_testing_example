<h1>Тестовые примеры для работы c примерами rest api, websocket, socket io</h1>
<h2>Для чего?</h2>
<p>Чтобы было на чем тренироваться в рамках тестирования Postman, автотестов на api, возможно сделать первые шаги в программировании на клиентской части. Делалось для себя, для запусков на винде.</p>
<h2>С чем можно тренироваться?</h2>
<p>На данном этапе с REST API, socket io, websocket.</p>
<h3>Общее видео: https://drive.google.com/file/d/19sO4u2CBF95LPJLJtOQnhV4lIO7O3Wps/view?usp=sharing</h3>
<p>Зависимости: socket io и websocket получает количество задач и юзеров из REST API. (Просто, чтобы можно было показать взаимодействие)</p>
<p>Работа с REST API, попробовать базовую авторизацию, получить представления по правам, кодам ответов, методам, минимальным представлениям о логировании.</p>
<p>socket io - можно посмотреть работу по пользовательским событиям, получить базовое взаимодействие по пространствам и комнатам, взаимодействовать с сервером по командам (к примеру, получить помощь или получить количество юзеров или задач из REST API) и рассылать сообщения тем, кто подключился (можно сделать 2 подключения и посмотреть, как работает.</p>
<p>websocket - взаимодействовать с сервером по командам (к примеру, получить помощь или получить количество юзеров или задач из REST API) и рассылать сообщения тем, кто подключился </p>
<h2>Как установить?</h2>
<p>У Вас на компе должны быть visual studio, git (возможны другие варианты, но это уже от Вас зависит). Создайте папку, в которую собираетесь поместить проект. На странице https://github.com/terikaisterika/api_testing_example получите url (Кнопка Code=>скопировать появившийся url). Находясь в подготовленной папке у себя в консоли через команду git clone https://github.com/terikaisterika/api_testing_example.git скопируйте проект.</p>
<h3>REST API</h3>
https://drive.google.com/file/d/1aKflXDXPe5TGLwdmDubWL3-6bFu3Cb25/view?usp=sharing
<p>Проект можно запустить перейдя в папку task-api. Пример для windows: Выполните последовательно  cd .\api_testing_example\ => cd .\task-api\ => выполнить команду npm install (единожды в этом проекте) => npm start. Консоль отобразит url, на котором будет жить rest api + port </p>
<img src="https://github.com/terikaisterika/api_testing_example/assets/48588741/6d0619f0-5ce0-4bd3-8ed8-dd4e3d0c211d")/>
<p>Rest api содержит 2 endpoints</p>
<ul>
  <li>users. Поддерживает методы: POST (CREATE) , GET (READ список), GET по id, PUT (UPDATE), DELETE</li>
  <li>tasks. Поддерживает методы: POST (CREATE) , GET (READ список), GET по id, PUT (UPDATE), DELETE</li>
</ul>
<p>Формат body при создания user</p>
<code>
  {
    "firstName": "Тестовый title 2",
    "lastName": "Тестовый description 2"
  }
</code>
<p>Формат body задачи ("completed" булевый тип) </p>
<code>
  {
    "title": "Тестовый title 2",
    "description": "Тестовый description 2",
    "completed": false,
    "userId": 1
}
</code>
<h4>Коллекции для Postman будут в проекте.</h4>
<p>В коллекциях ws есть наименования отправитель и получатель, либо новенький/остальная команда. Сделано для того, чтобы проще было усвоить, как это работает. Но в принципе любой запрос может выполнять любую роль.</p>
<img src="https://github.com/terikaisterika/api_testing_example/assets/48588741/7439ac53-5286-4688-9646-e0655c22cd9e"/>

<p>Обращаться можно также на базовый путь, где можно получить полные урлы, а также установить куку.</p>
<img src="https://github.com/terikaisterika/api_testing_example/assets/48588741/458cc1b8-18e9-45f0-93f4-7f4eb92de069"/>
<p>Проект на основе базовой авторизации. Есть 2 роли:</p>
<ul>
  <li>admin:123 (login:password) - может делать все с endpoints</li>
  <li>manager:333 - не может обновлять и удалять users, остальное может</li>
</ul>
<img src="https://github.com/terikaisterika/api_testing_example/assets/48588741/e5ddfda0-4a54-404b-9f2a-a68dbd5cbb9c"/>
<p>Проект содержит мини логирование (файл access.log ). Если его нет, то он создается при запуске проекта. При выполнении запросов пишутся логи.</p>
<img src="https://github.com/terikaisterika/api_testing_example/assets/48588741/dcf24326-1826-43f7-a7a2-9e53bb049d92"/>
<p>Формат: метод, путь запроса, статус, размер body, время выполнения в мс, время/дата UTC, + добавлены в параметре localDateTime дата и время в привычном локальном формате.</p>
<p>Зависимость endpoints: задача без юзера не создается.</p>
<h3>Socket io</h3>
<h4>ws://127.0.0.1:7000/</h4>
<p>Проект можно запустить перейдя в папку cd .\get-information\ => выполнить команду npm install (единожды в этом проекте) => npm start. В консоль будет выведен url, на который можно тестировать, к примеру ws://127.0.0.1:7000/</p>
https://drive.google.com/file/d/1wl2WD1lrmRIGl6zZ0isZD8UTjsY7sCVA/view?usp=sharing
<p>Пример по ws://127.0.0.1:7000/ предполагает несколько ключевых слов:</p>
<ul>
  <li><strong>help</strong> - можно получить помощь;</li> 
  <li><strong>yes</strong> - выведет ключевые слова;</li>
  <li><strong>users</strong> - выдаст количество юзеров из REST API (для этого должен быть запущен проект с REST API);</li>
  <li><strong>tasks</strong> - выдаст количество задач из REST API (для этого должен быть запущен проект с REST API).</li>
  <li><strong>all</strong> - отправляет всем, кто слушает событие informEveryone. (Его можно отправлять и себе, если включить прослушивание события informEveryone)</li>
  <li><strong>broadcast</strong> - отправляет всем, кто подключен на данном url</li>
  <li><strong>no</strong> - в принципе любое сообщение, не связанное с заранее подготовленными командами будут вызывать сообщение, типа: </li>
  <img src="https://github.com/terikaisterika/api_testing_example/assets/48588741/e4e135d7-fd50-45e3-be4d-86a8987009f6"/>
</ul>
<p>Адрес ws://127.0.0.1:7000/ предназначен просто для ознакомления с возможностями (получать ответ от сервера или другого API, попробовать "пользовательские события"  и отправку всем ( informEveryone ), broadcast</p>
<p>Юзеров и задачи нужно создавать через rest api</p>
<h4>ws://127.0.0.1:7000/work</h4>
https://drive.google.com/file/d/1qDNI2ZDVfcQYpXVV5dX5QwzIMi5hwI2i/view?usp=sharing
<p>Пример пространства. Пользователь подключается по определенному урлу, в данном случае ws://127.0.0.1:7000/work и может общаться с остальными.</p>
<p>Представим новичка, он приходит на новую работу, подключается по определенному урлу к рабочему пространству. Вводит команду help и получает совет от сервера.</p>
<img src="https://github.com/terikaisterika/api_testing_example/assets/48588741/fd49bf3f-5332-4305-b6e2-791b422fc5d7"/>
<p>Далее следуя советам от сервера новый сотрудник получает пошаговые инструкции, может присоединиться к группе новых сотрудников, проверить сколько человек в комнате новеньких и есть ли задавать вопрос в комнату обучающихся или лучше послать вопрос в рабочее пространство. При необходимости система подсказывает, что необходимо сделать.</p>
<img src="https://github.com/terikaisterika/api_testing_example/assets/48588741/b158262d-46aa-4a82-9241-ed2ef73b3ade"/>
<p>Особенности: Обычные сообщения с типом <strong>message</strong> (не из списка команд серверу) будут пересылаться в рамках:</p>
<ul>
  <li> если Вы просто в рабочем пространстве, то всем</li>
  <li> если Вы в комнате, то только тем, кто в комнате.</li>
</ul>
<p>Сообщения с типом <strong>question</strong> будет рассылаться всем в рабочем пространстве, кто прослушивает это событие.</p>
<h3>WebSocket</h3>
<h4>ws://127.0.0.1:7001</h4>
https://drive.google.com/file/d/1NmbhbuUT98JjMiEY_pnhsCLH55ty29ct/view?usp=sharing
<p>Проект можно запустить перейдя в папку cd .\get-information\ =>npm run start_ws</p>
<p>У проекта есть уже знакомые команды</p>
<ul>
  <li><strong>help</strong> - можно получить помощь;</li> 
  <li><strong>users</strong> - выдаст количество юзеров из REST API (для этого должен быть запущен проект с REST API);</li>
  <li><strong>tasks</strong> - выдаст количество задач из REST API (для этого должен быть запущен проект с REST API).</li>
</ul>
<p>Остальной пересылаемый текст будет распространяться всем подключившимся.</p>
<img src="https://github.com/terikaisterika/api_testing_example/assets/48588741/b94348ab-01b9-4fe0-a317-4eff2a7a38cb"/>
