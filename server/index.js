// vanilla Node.js server example
// import {createServer} from 'http';
// const server = createServer((req, res) => {
//   // when a request is received, this function is called
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World');
// });

// server.listen(3000, '127.0.0.1', () => {
//   // This function is called when the server starts listenin
//   console.log(`Server running at http://127.0.0.1:3000/`);
// });


// Express server example
import express from 'express';
import routes from './routes.js';
import connectWithDB from './utility/dbconnector.js';

const app = express();
const PORT = 3000;


connectWithDB();

app.get('/', (req, res) => {
    res.send('Hello World from Express!');
});

app.use(routes);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
