import { Year } from './year.js';
import { Calendar } from "./calendar.js";
import { Week } from "./week.js";

let yearBttn = document.getElementById('yearbttn');
let yearElem = document.getElementById('year');
let topYear = document.getElementById('topYear');

let y = new Year();
y.render(yearElem);
y.top5Render(topYear);

yearElem.style.display = 'none'
topYear.style.display = 'none'


yearBttn.addEventListener('click', () => y.showOrHide('year'));
//yearBttn.addEventListener('click', () => y.showOrHide('topYear'));

y.monthEvents();

topYear.addEventListener('keyup', () => y.saveMonthEvents());





//import { Calendar } from "./calendar.js";
//import { Week } from "./week.js";

//UI Components
let monthBttn = document.getElementById('monthbttn');
let previousElem = document.getElementById('previous');
let nextElem = document.getElementById('next');
let calendarElem = document.getElementById('calendar');
let weeklyViewElem = document.getElementById('week');


let c = new Calendar();
c.render(calendarElem);
c.current();
let daysElem = document.querySelectorAll('.days') //new


let w = new Week();
w.renderWeek();
//w.displayWeek(c.month, c.week)
let weekElem = document.querySelectorAll('.week-item')


weeklyViewElem.style.display = 'none'


monthBttn.addEventListener('click', () => {
  w.showOrHide('week')
  //w.displayWeek(currMonth, currWeek);
});




previousElem.addEventListener('click', () => {
  c.previousMonth();
  c.render(calendarElem);
  c.current();
  
  removeEventListenerDays(daysElem);
  daysElem = document.querySelectorAll('.days')
  addEventListenerDays(daysElem);

  w.displayWeek(c.month, c.week);
});



nextElem.addEventListener('click', () => {
  c.nextMonth();
  c.render(calendarElem);
  c.current();

  
  removeEventListenerDays(daysElem);
  daysElem = document.querySelectorAll('.days')
  addEventListenerDays(daysElem);


  w.displayWeek(c.month, c.week);

});


function addEventListenerDays(elem){
  //console.log(elem);
  elem.forEach( e =>{
    e.addEventListener('click', () =>{
      console.log('********************************');
      console.log(c.month);
      console.log(c.week);
      w.displayWeek(c.month, c.week);
    })
  });
}

function removeEventListenerDays(elem){
  elem.forEach( e =>{
    e.replaceWith(e.cloneNode(true));
  });
}

addEventListenerDays(daysElem);
w.displayWeek(c.month, c.week);






weekElem.forEach( elem => {
  //console.log(elem);
  elem.addEventListener('keyup', () => {
    //get week, get month
    //console.log('words');
    //console.log(elem);
    //console.log(c.year);
    //console.log(c.month);
    //console.log(c.week);//find way to identify if prev current or next month by getting elem

    w.saveData(c.month, c.week, elem);
  })

});

weekElem.forEach( elem => {
  let checkboxes = elem.querySelectorAll('.check');
  checkboxes.forEach( checkbox =>{
    checkbox.addEventListener('change', () =>{
      console.log(elem);
      console.log(checkboxes);
      console.log('clicked!')
      w.saveData(c.month, c.week, elem);
    })
  })

});
