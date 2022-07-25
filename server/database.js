import 'dotenv/config';
import pg from 'pg';
 
// Get the Pool class from the pg module.
const { Pool } = pg;
 
export class expenseDatabase {
  constructor(dburl) {
    this.dburl = dburl;
  }
 
  async connect() {
    // Create a new Pool
    this.pool = new Pool({
      connectionString: this.dburl,
      ssl: { rejectUnauthorized: false }, // Required for Heroku connections
    });
  
    // Create the pool.
    this.client = await this.pool.connect();
  
    // Initialize the database.
    await this.init();
  }
 
  //create database table
  async init() {
    const queryText = `
      create table if not exists budget (
        id varchar(30) primary key,
        description varchar(100),
        cost float
      );
    `;
    const res = await this.client.query(queryText);
  }
 
  // Close the pool.
  async close() {
    this.client.release();
    await this.pool.end();
  }
 
  //save word expense into the database.
  async saveExpense(id, description, cost) {
    const queryText =
      'INSERT INTO budget (id, description, cost) VALUES ($1, $2, $3) RETURNING *';
    const res = await this.client.query(queryText, [id, description, cost]);
    return res.rows;
  }
 
  //get/read all expenses from the database.
  async getExpenses() {
    const queryText = 'SELECT * FROM budget';
    const res = await this.client.query(queryText);
    return res.rows;
  }

  //get/read the top 5 expenses from the database.
  async top5Expenses() {
    const queryText = 'SELECT * FROM budget';
    const res = await this.client.query(queryText);
    
    const sorted = res.rows.sort((a, b) => b.score - a.score);
    const top = sorted.slice(0, 5);
    return top;
  }
 
  //delete an expense from the database.
  async deleteExpense(id) {
    const queryText = 'DELETE FROM budget WHERE id = $1 RETURNING *';
    const res = await this.client.query(queryText, [id]);
    return res.rows;
  }

  //delete all expenses from the database.
  async deleteAll() {
    const queryText = 'DELETE FROM budget';
    const res = await this.client.query(queryText);
    return res.rows;
  }
}
 

