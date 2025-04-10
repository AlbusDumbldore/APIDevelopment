import express from 'express';
import { taskRouter } from './modules/task/task.router';
import { userRouter } from './modules/user/user.router';

const server = express(); // http://localhost:2000
server.use(express.json());

server.use('/user', userRouter);
server.use('/task', taskRouter);

const port = 2000;

server.listen(port, () => {
  console.log(`Server is started on port ${port}`);
});
