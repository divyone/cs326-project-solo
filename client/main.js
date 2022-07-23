import { Year } from './year.js';
import { Calendar } from "./calendar.js";
import { Week } from "./week.js";

//UI Components
let yearBttn = document.getElementById('yearbttn');
let yearElem = document.getElementById('year');
let topYear = document.getElementById('topYear');
let monthBttn = document.getElementById('monthbttn');
let previousElem = document.getElementById('previous');
let nextElem = document.getElementById('next');
let calendarElem = document.getElementById('calendar');
let weeklyViewElem = document.getElementById('week');

//YEARLY VIEW
//render year and top 5 events
let y = new Year();
y.render(yearElem);
y.top5Render(topYear);

//hide display of top 5 events and year view
yearElem.style.display = 'none'
topYear.style.display = 'none'

//change backgorund when month clicked and show top5 events
y.monthEvents();

yearBttn.addEventListener('click', () => y.showOrHide('year'));
topYear.addEventListener('keyup', () => y.saveMonthEvents());


//MONTHLY VIEW
//render calender and define all DOM elements with the class 'days'
let c = new Calendar();
c.render(calendarElem);
c.current();
let daysElem = document.querySelectorAll('.days') //new

//render weekly planner and define all DOM elements with the class 'week-item'
let w = new Week();
w.renderWeek();
let weekElem = document.querySelectorAll('.week-item')
//weeklyViewElem.style.display = 'none'     /remove in final project

addEventListenerDays(daysElem);
w.displayWeek(c.month, c.week);

//Event Listners
monthBttn.addEventListener('click', () => {
  w.showOrHide('week')
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

weekElem.forEach( elem => {
  elem.addEventListener('keyup', () => {
    w.saveData(c.month, c.week, elem);
  })

});

weekElem.forEach( elem => {
  let checkboxes = elem.querySelectorAll('.check');
  checkboxes.forEach( checkbox =>{
    checkbox.addEventListener('change', () =>{
      w.saveData(c.month, c.week, elem);
    })
  })

});

//adds event listerer to elements to call display week
function addEventListenerDays(elem){
  elem.forEach( e =>{
    e.addEventListener('click', () =>{
      w.displayWeek(c.month, c.week);
    })
  });
}

//removes event listern from element
function removeEventListenerDays(elem){
  elem.forEach( e =>{
    e.replaceWith(e.cloneNode(true));
  });
}