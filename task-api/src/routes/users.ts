import express, {Router, Request, Response} from 'express';
import {body, validationResult} from 'express-validator';
import { User } from '../models/user';
import { Task } from '../models/task';

const router = Router();
const users: User[] = [];

const userValidationRules = [
  body('firstName').notEmpty().withMessage(
  `Требуется заполнить firstName`
  ),
  body('lastName').notEmpty().withMessage('Требуется заполнить lastName')
]
const restrictByLogin = (req:Request, res:Response,role:string = 'manager'):string|undefined=>{
  if (req.headers['authorization']){
    const authBase64 = req.headers['authorization'].match(/(?<=Basic\s).+/g)
    const loginPsw = authBase64?Buffer.from(authBase64[0], 'base64').toString('ascii'):''
    const login = loginPsw?loginPsw.match(/.+(?=:)/g):'';
    const loginReal = login?login:'';
    if(login!== null && login[0]==role) {
      res.status(403).send(`С ролью ${login} данное действие запрещено.`);
      return login[0];
    }
  }
}
router.post('/', userValidationRules, (req:Request, res:Response)=>{
  const errors = validationResult(req)
  if (!errors.isEmpty()){
    res.status(400).json({errors: errors.array()})
  }
  const user: User = {
    id: users.length + 1,
    firstName: req.body.firstName,
    lastName: req.body.lastName
  }
  users.push(user);
  res.status(201).json(user)
})

router.get('/', (req:Request, res: Response)=>{
  res.json(users)
})
router.get('/:id', (req:Request, res:Response)=>{
  const task = users.find((u)=>u.id === parseInt(req.params.id));
  if (!task){
    res.status(404).send(`Юзер с id = ${req.params.id} не найден`)
  } else {
    res.json(task)
  }
})

router.put('/:id', userValidationRules,(req:Request, res:Response)=>{
  const forbiddenLogin = 'manager'
  if (restrictByLogin(req,res) == forbiddenLogin) return;
  const errors = validationResult(req)
  if (!errors.isEmpty()){
    res.status(400).json({errors: errors.array()})
  }
  const user = users.find(u=>u.id === parseInt(req.params.id))
  if (!user){
    res.status(404).send(`Юзер с id = ${req.params.id} не найден`)
  } else {
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    res.json(user)
  }
})

router.delete('/:id', (req:Request, res:Response)=>{
  const forbiddenLogin = 'manager'
  if (restrictByLogin(req,res) == forbiddenLogin) return;
  const index = users.findIndex(u=>u.id === parseInt(req.params.id))
  if (index === -1){
    res.status(404).send(`Юзер с id = ${req.params.id} не найден`)
  } else {
    users.splice(index, 1);
    res.status(204).send();
  }
})

export {router, users};
