import express from 'express';

const app = express();
const port = 3000;

app.use('/', (req, res) => {
  res.send("Hello");
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}` );
});
