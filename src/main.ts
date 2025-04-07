import express from 'express';

const server = express();
server.use(express.json());

server.get('/user/:id/news/:newsId', (req, res) => {
  const { id, newsId } = req.params;
  res.send('Держите новости!');
});

// не до конца понял Path параметры ?

server.get('', (req, res) => {
  console.log('Пришли параметры:');
  console.log(req.query);
  res.send('Hello World!');
});

server.post('', (req, res) => {
  console.log('Пришло тело:');
  console.log(req.body);
  res.send('Hello World!');
});

const port = 2000;

server.listen(port, () => {
  console.log(`Server is started on port ${port}`);
});
