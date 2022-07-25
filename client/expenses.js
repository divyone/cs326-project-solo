export class Expenses{
  constructor(){
    this.expenses = [];

    this.id = 1;
    if(window.localStorage.getItem('id') !== null){
      this.id = Number(window.localStorage.getItem('id'));
    }

  }



   // TODO #8: Save the word score to the server
   async saveExpense(description, cost) {
    let expense = {id: id, description: description, cost: cost};
    this.expenses.push(expense);

    //http://localhost:3000/saveExpense?id=6&description=Concert&cost=67.95
    //id, description, cost

    let noSpacedescrip = description.split(" ").join("");
    let url = 'http://localhost:3000/saveExpense?id=' + this.id + '&description='+ description + '&cost=' + cost;
    let response = await fetch(url, {method: 'POST'});
    let data = await response;
    console.log(data);
    //console.log(await response.json());

    this.id++;
    window.localStorage.setItem('id', this.id.toString());
  }

  render(element) {
    let html = '<h1>Expenses</h1>';
    html += '<table border="1" width="50%">';
    this.expenses.forEach((exp) => {
      html += `
        <tr>
          <td>${exp.description}</td>
          <td>${exp.cost}</td>
        </tr>
      `;
    });
    html += '</table>';
    element.innerHTML = html;
  }

  async getExpenses() {

    let noSpacedescrip = description.split(" ").join("");
    let url = 'http://localhost:3000/getExpenses'
    let response = await fetch(url, {method: 'GET'});
    let data = await response;
    console.log(data);
    //console.log(await response.json());
  }

  async deleteExpenses() {

    let noSpacedescrip = description.split(" ").join("");
    let url = 'http://localhost:3000/deleteAll'
    let response = await fetch(url, {method: 'GET'});
    let data = await response;
    console.log(data);
    //console.log(await response.json());
  }
}