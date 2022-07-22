import { Year } from './year.js'

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