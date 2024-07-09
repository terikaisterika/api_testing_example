<h1>Тестовые примеры для работы c примерами rest api, websocket, socket io</h1>
<h2>Для чего?</h2>
<p>Чтобы было на чем тренироваться в рамках тестирования Postman, автотестов на api, возможно сделать первые шаги в программировании на клиентской части.</p>
<h2>С чем можно тренироваться?</h2>
<p>На данном этапе с REST API, socket io, websocket.</p>
<h2>Как установить?</h2>
<p>У Вас на компе должны быть visual studio, git (возможны другие варианты, но это уже от Вас зависит). Создайте папку, в которую собираетесь поместить проект. На странице https://github.com/terikaisterika/api_testing_example получите url (Кнопка Code=>скопировать появившийся url). Находясь в подготовленной папке у себя в консоли через команду git clone https://github.com/terikaisterika/api_testing_example.git скопируйте проект.</p>
<h3>REST API</h3>
<p>Проект можно запустить перейдя в папку task-api. Пример для windows: Выполните последовательно  cd .\api_testing_example\ => cd .\task-api\ => выполнить команду npm install (единожды в этом проекте) => npm start. Консоль отобразит url, на котором будет жить rest api + port </p>
<img src="https://github.com/terikaisterika/api_testing_example/assets/48588741/6d0619f0-5ce0-4bd3-8ed8-dd4e3d0c211d")/>
<p>Rest api содержит 2 endpoints</p>
<ul>
  <li>users. Поддерживает методы: POST (CREATE) , GET список, GET по id, PUT (UPDATE), DELETE</li>
  <li>tasks. Поддерживает методы: POST (CREATE) , GET список, GET по id, PUT (UPDATE), DELETE</li>
</ul>
<p>Обращаться можно также на базовый путь, где можно получить полные урлы</p>
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
<p>Проект можно запустить перейдя в папку cd .\get-information\ => выполнить команду npm install (единожды в этом проекте) => npm start. В консоль будет выведен url, на который можно тестировать, к примеру ws://127.0.0.1:7000/</p>
<p>Пример по ws://127.0.0.1:7000/ предполагает несколько ключевых слов:</p>
<ul>
  <li><strong>help</strong> - можно получить помощь;</li> 
  <li><strong>yes</strong> - выведет ключевые слова;</li>
  <li><strong>users</strong> - выдаст количество юзеров из REST API (для этого должен быть запущен проект с REST API);</li>
  <li><strong>tasks</strong> - выдаст количество задач из REST API (для этого должен быть запущен проект с REST API).</li>
</ul>
<p></p>
<p>Юзеров и задачи можно создавать через rest api</p>
<h3>Пример работы на видео:</h3>
https://drive.google.com/file/d/1eckCkDnhSba5HlsyioUI0kU7317Cs2kq/view?usp=sharing
