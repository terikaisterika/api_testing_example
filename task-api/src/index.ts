import express, {Request, Response, NextFunction, Router} from 'express'
import basicAuth from 'express-basic-auth'
import cookieParser from 'cookie-parser'
import routerTasks from './routes/tasks'
import {router as routerUsers } from './routes/users'
import cors from 'cors';
import morgan from 'morgan'
import fs = require('fs');
import path = require('path')
const app = express();
const baseUrl = process.env.BASE_URL || 'http://127.0.0.1'
const port = process.env.PORT || 3000;
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'access.log'),
  {flags: "a"}
)
app.use(express.json());
app.use(express.urlencoded({extended:true}))
morgan.token('nDate', (req, res)=>{
  return new Date().toLocaleString();
})
app.use(morgan(":method :url :status :res[content-length] - :response-time ms utc [:date[clf]] localDateTime [:nDate]", {stream: accessLogStream}))
app.use(cors())
app.use(cookieParser('test222'))
//базовая авторизация
const users = {'admin': '123', 'manager': '333'}
app.use(basicAuth({  users:users}))
app.use('/users', routerUsers)
app.use('/tasks', routerTasks);

app.use((req:Request, res: Response,next:NextFunction)=>{
  res.cookie('my-cookie', '12345', {
    maxAge: 3600000
  });
  next();
})
app.get('/', (req:Request, res: Response, )=>{
  res.send(`Полный путь для работы с задачами ${baseUrl}:${port}/tasks, 
    Полный путь для работы с юзерами ${baseUrl}:${port}/users`)
})

app.use((err: Error, req:Request, res:Response, next:NextFunction)=>{
  console.error(`Terika, тут проблема: ${err.stack}`)
  res.status(500).send('У нас необработанная ошибка, так бывает')
})

app.listen(port, ()=>{
  console.log(`Server running at ${baseUrl}:${port}`)
})