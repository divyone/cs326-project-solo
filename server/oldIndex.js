import { database } from './database.js';

import express from 'express';
import logger from 'morgan';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use('/', express.static('client'));

//Implement the saveExpense endpoint
app.post('/saveExpense', async (request, response) => {
  try{
    const options = request.query;
    const name = options.name;
    const cost = Number(options.cost);

    await database.saveExpense(name, cost);
    response.status(200).json({status: "success"});
  }
  catch(err){
    console.log(err);
    response.json({ error: `In saveExpense` });
  }
});

//Implement the top10Expenses endpoint
app.get('/top10Expenses', async (request, response) => {
  try{
    let expenses = await database.top10Expenses();
    response.status(200).json(expenses);
  }
  catch(err){
   response.json({ error: `In top10Expenses` });
  }
});

//Implement the /getExpenses endpoint
app.get('/getExpenses', async (request, response) =>{
  try{
    let expenses = await database.getExpenses();
    response.status(200).json(expenses);
  }
  catch(err){
    response.json({ error: `In getExpenses` });
  }
});

//Implement the /saveIncome endpoint
app.post('/saveIncome', async (request, response) => {
  try{
    const options = request.query;
    const name = options.name;
    const cost = Number(options.cost);

    await database.saveIncome(name, cost);
    response.status(200).json({status: "success"});
  }
  catch(err){
    console.log(err);
    response.json({ error: `In saveIncome` });
  }
});

//Implement the /getIncome endpoint
app.get('/getIncome', async (request, response) =>{
  try{
    let incomes = await database.getIncome();
    response.status(200).json(incomes);
  }
  catch(err){
    response.json({ error: `In getIncome` });
  }
});

// This matches all routes that are not defined.
app.all('*', async (request, response) => {
  response.status(404).send(`Not found: ${request.path}`);
});

//start server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});