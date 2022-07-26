import express from 'express';
import { expenseDatabase } from './database.js';
import logger from 'morgan';

class expenseServer {
  constructor(dburl) {
    this.dburl = dburl;
    this.app = express();
    this.app.use('/', express.static('client'));
  }
  
  async initRoutes() {
    // Note: when using arrow functions, the "this" binding is lost.
    const self = this;
  
    //Implement the /saveExpense endpoint
    this.app.post('/saveExpense', async (request, response) => {
      try {
        const options = request.query;
        const id = options.id;
        const description = options.description;
        const cost = Number(options.cost);
  
        const expense = await self.db.saveExpense(id, description, cost);
        response.send(JSON.stringify(expense));
      } catch (err) {
        response.status(500).send(err);
      }
    });
  
    //Implement the /getExpenses endpoint
    this.app.get('/getExpenses', async (request, response) => {
      try {
        const expense = await self.db.getExpenses();
        response.send(JSON.stringify(expense));
      } catch (err) {
        response.status(500).send(err);
      }
    });

    //Implement the /top5Expenses endpoint
    this.app.get('/top5Expenses', async (request, response) => {
      try {
        const expense = await self.db.top5Expenses();
        response.send(JSON.stringify(expense));
      } catch (err) {
        response.status(500).send(err);
      }
    });
  
    //Implement the /deleteExpense endpoint
    this.app.get('/deleteExpense', async (request, response) => {
      try {
        const options = request.query;
        const id = options.id;

        const expense = await self.db.deleteExpense(id);
        response.send(JSON.stringify(expense));
      } catch (err) {
        response.status(500).send(err);
      }
    });
  
    //Implement the /deleteAll endpoint
    this.app.get('/deleteAll', async (request, response) => {
      try {
        const expense = await self.db.deleteAll();
        response.send(JSON.stringify(expense));
      } catch (err) {
        response.status(500).send(err);
      }
    });
      
  }
  
  //Initialize database
  async initDb() {
    this.db = new expenseDatabase(this.dburl);
    await this.db.connect();
  }
  
  //start server
  async start() {
    await this.initRoutes();
    await this.initDb();
    const port = process.env.PORT || 3000;
    this.app.listen(port, () => {
      console.log(`Server listening on port ${port}!`);
    });
  }
 }
  
 
//create and start server
const server = new expenseServer(process.env.DATABASE_URL);
server.start();