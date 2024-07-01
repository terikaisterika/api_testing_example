import express, {Request, Response, NextFunction, Router} from 'express'
import basicAuth from 'express-basic-auth'
import cookieParser from 'cookie-parser'
import routerTasks from './routes/tasks'
import {router as routerUsers } from './routes/users'
import cors from 'cors';

const app = express();
const baseUrl = process.env.BASE_URL || 'http://127.0.0.1'
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({extended:true}))
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
  res.send(`Полный путь для тестов задач ${baseUrl}:${port}/tasks`)
})

app.use((err: Error, req:Request, res:Response, next:NextFunction)=>{
  console.error(`Terika, тут проблема: ${err.stack}`)
  res.status(500).send('У нас необработанная ошибка, так бывает')
})

app.listen(port, ()=>{
  console.log(`Server running at ${baseUrl}:${port}`)
})