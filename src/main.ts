import express, { Request, Response } from 'express';

const server = express(); // http://localhost:2000
server.use(express.json());

server.post('/task/create', (req: Request, res: Response) => {
  res.json({ message: 'Создание задачи' });
});

server.get('/task/:taskId', (req: Request, res: Response) => {
  const taskId = req.params.taskId;

  res.json({ message: `Вы пытаетесь запросить задачу с id=${taskId}` });
});

server.get('/task/list', (req: Request, res: Response) => {
  res.json({ message: 'Вы патыетесь запросить список задач' });
});

server.post('/user/register', (req: Request, res: Response) => {
  const body = req.body;
  res.json({ message: 'Вы проходите процесс регистрации' });
});

server.post('/user/login', (req: Request, res: Response) => {
  res.json({ message: 'Вы проходите процесс авторизации' });
});

server.get('/user/profile', (req: Request, res: Response) => {
  res.json({ message: 'Вы пытаетесь запросить профиль пользователя' });
});

const port = 2000;

server.listen(port, () => {
  console.log(`Server is started on port ${port}`);
});
