import Response from './helpers/Response';
import express from 'express'
import bodyParser from 'body-parser';
import HttpStatus from 'http-status';
import cors from 'cors';
import router from './routes'

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(cors())
app.use(bodyParser.json({ type: 'application/json' }));
app.use('/', router);

app.get('/', (req, res) =>
  Response.successMessage(
  res, 
  'Researchhun APIs',
  '',
  HttpStatus.OK)
);
app.use('*', (req, res) =>
 Response.errorMessage(
  res, 
  'Oops, this route does not exist',
  HttpStatus.NOT_FOUND)
);

const port = process.env.PORT || 5000;

app.listen(port, ()=>{
    console.log(`Server is running on PORT ${port}...`);
})

export default app;
