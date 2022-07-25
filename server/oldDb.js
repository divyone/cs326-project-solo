import { readFile, writeFile } from 'fs/promises';

class Database {
  constructor(){
    this.path = 'expenseTracker.json';
  }

  /**
     * This method saves an expense made to the datatbase file (this.path).
     *
     * @param {string} name the name of the expense
     * @param {number} cost the cost of the expense
     */
  async saveExpense(name, cost) {
    const data = await this._read();
    data.expense.push({ name, cost });
    await this._write(data);
  }

  /**
   * This method saves any income/money made to the datatbase file (this.path).
   *
   * @param {string} name the name of the income
   * @param {number} cost the numerical income value
  */
  async saveIncome(name, cost) {
    const data = await this._read();
    data.income.push({ name, cost });
    await this._write(data);
  }

  /**
   * This method returns the top 10 largest expenses from the datatbase file (this.path).
   * First it get all the expenses by reading the database file (this.path), then it sort 
   * the expense and return an array of the top 10 largest.
   *
   * @returns [{name: string, cost: number}] returns the top 10 expenses

   */
  async top10Expenses() {
    const data = await this._read();
    const sorted = data.expense.sort((a, b) => b.cost - a.cost);
    const top = sorted.slice(0, 10);
    return top;
  }

  /**
   * This method returns all of the expenses from the datatbase file (this.path).
   * First it get all the expenses by reading the database file (this.path), then it will
   * return this data in the form of an array.
   *
   * @returns [{name: string, score: number}] returns all recorded expenses
   */
   async getExpenses() {
    const data = await this._read();
    const expense = data.expense;
    return expense;
  }

  /**
   * This method returns all of the incomes from the datatbase file (this.path).
   * First it get all the incomes by reading the database file (this.path), then it will
   * return this data in the form of an array.
   *
   * @returns [{name: string, score: number}] returns all recorded incomes
   */
  async getIncome() {
    const data = await this._read();
    const income = data.income;
    return income;
  }

  /**
   * Read data from database file (this.path). If database file does not exist 
   * initialize it
   *
   * @returns [{expense: array, score: array}] returns all of expense trackers data
   */
  async _read() {
    console.log(this.path)
    try {
      const data = await readFile(this.path, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return { expense: [], income: [] };
    }
  }

  //write data to database file (this.path)
  async _write(data) {
    console.log(this.path)
    await writeFile(this.path, JSON.stringify(data), 'utf8');
  }
}

const database = new Database();
export { database };
