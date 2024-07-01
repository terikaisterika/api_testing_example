import express, { Router, Request, Response, NextFunction } from "express";
import {users} from '../routes/users'
import { body,validationResult } from 'express-validator';
import { Task } from "../models/task";
import { Buffer } from "buffer";

const router = Router();
const tasks:Task[] = [];
const taskValidationRules = [
  body('title').notEmpty().withMessage('Требуется title'),
  body('description').notEmpty().withMessage('Требуется description'),
  body('completed').isBoolean().withMessage('Completed должен быть булевого типа'),
  body('userId').notEmpty().withMessage('Укажите юзера')
]
router.post('/', taskValidationRules, (req: Request, res: Response)=>{
  const errors = validationResult(req)
  if (!errors.isEmpty()){
    res.status(400).json({errors: errors.array()})
  }
  if (users.length > 0){
    let user = users.find((u)=>u.id === parseInt(req.body.userId))
    if (!user){
      res.status(404).send(`Элемент с id = ${req.body.userId} не найдена`)
    } else {
      const task: Task = {
        id: tasks.length + 1,
        title: req.body.title,
        description: req.body.description,
        completed: false,
        userId: user.id
        }
      tasks.push(task);
      res.status(201).json(task)
    }
  } else {
    res.status(400).send(`Сейчас список юзеров пуст. 
      Создайте юзера`)
  }
  
});

router.get('/', (req:Request, res: Response)=>{
  res.json(tasks)
})
router.get('/:id', (req:Request, res:Response)=>{
  const task = tasks.find((t)=>t.id === parseInt(req.params.id));
  if (!task){
    res.status(404).send(`Задача с id = ${req.params.id} не найдена`)
  } else {
    res.json(task)
  }
})

router.put('/:id', taskValidationRules,(req:Request, res:Response)=>{
  const errors = validationResult(req)
  if (!errors.isEmpty()){
    res.status(400).json({errors: errors.array()})
  }
  let user = users.find((u)=>u.id === parseInt(req.body.userId))
  const task = tasks.find(t=>t.id === parseInt(req.params.id))
  if (!task){
    res.status(404).send(`"Элемент с id = ${req.params.id} не найдена`)
  } else if (!user){
    res.status(404).send(`Элемент с id = ${req.body.userId} не найдена`)
  }else {
    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.completed = req.body.completed || task.completed;
    res.json(task)
  }
})

router.delete('/:id', (req:Request, res:Response)=>{
  const index = tasks.findIndex(t=>t.id === parseInt(req.params.id))
  if (index === -1){
    res.status(404).send(`Задача с id = ${req.params.id} не найдена`)
  } else {
    tasks.splice(index, 1);
    res.status(204).send();
  }
})

export default router;