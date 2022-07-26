export class Expenses{
  constructor(){
    this.id = 1;
    if(window.localStorage.getItem('id') !== null){
      this.id = Number(window.localStorage.getItem('id'));
    }

  }

   //Save the expense to the database
   async saveExpense(description, cost) {
    let noSpaceDescrip = description.split(" ").join("");
    let url = '/saveExpense?id=' + this.id + '&description='+ noSpaceDescrip + '&cost=' + cost;
    let response = await fetch(url, {method: 'POST'});
    let data = await response.json();

    this.id++;
    window.localStorage.setItem('id', this.id.toString());
  }

  //Render table of expenses saved in database
  async render(element) {
    let currExpesnes = await this.getExpenses();
    let html = '<h1>Expenses</h1>';
    html += '<table border="1" width="50%">';
    currExpesnes.forEach((exp) => {
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

  //get all expenses from database
  async getExpenses() {
    let url = '/getExpenses'
    let response = await fetch(url, {method: 'GET'});
    let data = await response.json();
    return data;
  }

  //delete all expenses from database
  async deleteExpenses() {
    let url = '/deleteAll'
    let response = await fetch(url, {method: 'GET'});
    let data = await response.json();

    this.id = 1;
    window.localStorage.setItem('id', this.id.toString());
  }

  async totalExpenses(){
    let totalElem = document.getElementById('total');
    let currExpesnes = await this.getExpenses();
    let total = 0;

    if(currExpesnes.length !== 0){
      currExpesnes.forEach(expense => {
        total += expense.cost
      });
    }
    totalElem.value = total;
  }

  //hide and show Expense Tracker
  showOrHide(elem){
    if(elem.style.display === 'none'){
      elem.style.display = 'block';
    }
    else{
      elem.style.display = 'none';
    }
  }
}