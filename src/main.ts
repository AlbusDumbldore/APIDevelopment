import express, { Request, Response } from 'express';

const server = express();

server.get('/', (req: Request, res: Response) => {
  console.log('Пришёл GET / запрос');

  res.json({ message: 'Hello World!' });
});

server.post('/', (req: Request, res: Response) => {
  console.log('Пришёл POST / запрос');

  res.send({ message: 'Goodbye World!' });
});

const port = 2000;

server.listen(port, () => {
  console.log(`Server is started on port ${port}`);
});
