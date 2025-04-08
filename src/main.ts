import express from 'express';

const server = express();
server.use(express.json());

// server.get('/user/:id/news/:newsId', (req, res) => {
//   const { id, newsId } = req.params;
//   res.send('Держите новости!');
//   res.json({
//     id: newsId,
//     newsId: req.params.id,
//   });
// });

// server.get('', (req, res) => {
//   console.log('Пришли параметры:');
//   console.log(req.query);
//   res.send('Hello!');
// });

server.post('/task/:id/task/:title/task/:description', (req, res) => {
  console.log('Пришла задача');
  console.log(req.body);
  res.send(`Задача ${req.body.id}. ${req.body.title} \n Описание: ${req.body.description}`);
});

server.get('/user/profile', (req, res) => {
  console.log('Инициализация входа');
  console.log(req.query);
  const user = ({ id, name, email, password, role } = req.params);
  res.send(`Добро пожаловать, ${req.body.name}`);
});

const port = 2000;

server.listen(port, () => {
  console.log(`Server is started on port ${port}`);
});
