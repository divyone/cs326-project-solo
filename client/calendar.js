export class Calendar{
  constructor(){
    this.d = new Date();
    this.year = this.d.getFullYear();
    this.month = this.d.getMonth();
    this.day = this.d.getDay();
    this.date = this.d.getDate();
    this.week = null;
    this.currMonth = this.d.getMonth();
    this.currYear = this.d.getFullYear();
    this.firstDay = this.firstDayOfMonth(this.year, this.month);
    this.totalDays = this.daysInMonth(this.year, this.month);

    this.m = ["January","February","March","April","May",
                "June","July","August","September","October",
                "November","December"];
    
    this.d = ["Sunday", "Monday", "Tuesday", "Wednesday", 
                "Thursday", "Friday", "Saturday"];
  }

  /**
   * Use to make sure the constructor variables are updated correctly (soley for testing purposes) 
   */
  current(){
    let currM = this.m[this.month];
    let currDay = this.d[this.day];

    console.log("year: " + this.year);
    console.log("month: " + currM);
    console.log("day: " + currDay);
    console.log("week: " + this.week);
    console.log("first day: " + this.d[this.firstDay]);
    console.log("total day: " + this.totalDays);
    console.log("current year: " + this.currYear);
    console.log("current month: " + this.m[this.currMonth]);
    console.log("current date: " + this.date);
  }

  /**
   * changes the values of this.month, this.year, this.totalDays, and this.firstDay to match the 
   * previous month's data.
   */
  previousMonth(){
    if(this.month === 0){
      this.year--;
      this.month = 11;
    }
    else{
      this.month--;
    }
    this.totalDays = this.daysInMonth(this.year, this.month);
    this.firstDay = this.firstDayOfMonth(this.year, this.month);
  }

  /**
   * changes the values of this.month, this.year, this.totalDays, and this.firstDay to match the 
   * next month's data.
   */
  nextMonth(){
    if(this.month === 11){
      this.year++;
      this.month = 0;
    }
    else{
      this.month++;
    } 
    this.totalDays = this.daysInMonth(this.year, this.month);
    this.firstDay = this.firstDayOfMonth(this.year, this.month);
  }

  /**
   * This method calls for a new instance of the date class with year, month + 1, and 0 as the 
   * parameters representing the year, month, and day respectively. Then calls and returns getDate.
   *
   * @param {number} year the year being viewed
   * @param {number} month the month being viewed
   * @return {number} the total number of day in month
   */
  daysInMonth(year, month){
    let newDate = new Date(year, month + 1, 0);
    return newDate.getDate();
  }

   /**
   * This method calls for a new instance of the date class with year, month, and 1 as the 
   * parameters representing the year, month, and day respectively. Then calls and returns getDay.
   *
   * @param {number} year the year being viewed
   * @param {number} month the month being viewed
   * @return {number} the day of the week for the first day of the month
   */
  firstDayOfMonth(year, month){
    let newDate = new Date(year, month, 1);
    return newDate.getDay();
  }

  /**
   * This method (along with some helper methods) builds my calender 
   * 
   * @param element div element that the calender is rendered insde of
   */
  render(element){
    let monthElem = document.getElementById('month'); 
    let count = 1; //count days visited in current month
    let countNext = 1; //counts days visited in next month
    this.removeCalenderElements();
    monthElem.innerText = this.m[this.month] + " " + this.year;
    this.week = 'week0'

    //console.log(this.currM);

    for(let i = 0 ; i < 6; ++i){
      for(let j = 0; j < 7; ++j){
        const div = document.createElement('div');

        if(i === 0 && j < this.firstDay){
          let prevTotalDays = this.prevMonthDays() + j;
          div.classList.add('prevMonth');
          div.innerHTML = "" + prevTotalDays;
        }
        else if(this.totalDays - count < 0){
          div.classList.add('nextMonth');
          div.innerHTML = "" + countNext;
          countNext++;
        }
        else{
          //div.classList.add("day" + count);
        div.classList.add('currMonth');
        div.innerHTML = "" + count;
        this.week = (count === this.date && this.currMonth === this.month && this.currYear === this.year) ? 'week' + i : this.week;
        this.highlightToday(div, count, this.year, this.month);
        count++;
        }
        div.classList.add('days');
        div.classList.add('week' + i);

        div.addEventListener('click', () => {//               removethis
          console.log(this.month);
          console.log('week' + i);
          this.week = 'week' + i;
          //console.log(div);
          this.highlightClicked(document.querySelectorAll('.week' + i));
        });


        element.appendChild(div);
      }
    }
    //console.log(this.week);
    //console.log(this.currM);
    //console.log(this.month);
    this.highlightClicked(document.querySelectorAll('.' + this.week));


  }

  /**
   * This method get all elements with the class 'prevMonth', 'currMonth', and 'nextMonth'.
   * Check if the HTML Collection is not empty then it calls for the helper method.
   * 
   */
  removeCalenderElements(){
    let prevMonthElem = document.getElementsByClassName('prevMonth');
    let daysElem = document.getElementsByClassName('currMonth');
    let nextMonthElem = document.getElementsByClassName('nextMonth');

    if(prevMonthElem !== null){
      this.removeCalenderElementsHelper(prevMonthElem);   
    }
    if(daysElem !== null){
      this.removeCalenderElementsHelper(daysElem); 
    }
    if(nextMonthElem !== null){
      this.removeCalenderElementsHelper(nextMonthElem);  
    }
  }

  /**
   * This method iterates through the HTML collection and removes all of it DOM elements
   * 
   * @param element HTML collection of DOM Elements
   */
  removeCalenderElementsHelper(element){
    while(element.length > 0){
      element[0].remove();
    }
  }

   /**
   * This method get and return the first day of Previous month that can be seen in the 
   * current monthly view of calendar. If no days of the preious month can be seen in the current monthly view
   * of the calendar then null is returned
   * 
   * @returns {null | number} first day of Previous month that can be seen in the current monthly view of calendar
   */
  prevMonthDays(){
    let prevData = this.prevMonthData(this.year, this.month);
    let prevTotalDays = this.daysInMonth(prevData.year, prevData.month);
    let firstPrevDayAvailable = null;

    if(this.firstDayOfMonth(this.year, this.month) !== 0 ){
      firstPrevDayAvailable = prevTotalDays - this.firstDayOfMonth(this.year, this.month) + 1
    }

    return firstPrevDayAvailable;
  }

  /**
   * This method get the previous month and it year then return an object with this data
   * 
   * @param {number} year  year being viewed calendar
   * @param {number} month month being viewed calendar
   * @returns {{year: {number}, month: {number}}} year: year of previous month, month: previous month
   */
  prevMonthData(year, month){
    let prevData = {year: year, month: month}
    if(this.month === 0){
      prevData.year--;
      prevData.month = 11;
    }
    else{
      prevData.month --;
    }
    return prevData
  }

  /** EDIT THIS FUNCTION MAY NOT ACTUALLY WORK***************************************
   * This method turns the font of the current day of the month to red 
   * 
   * @param elem  HTML collection of DOM Elements   ??????
   * @param {number} count  day of the month 
   * @param {number} year  year being viewed in calendar
   * @param {number} month month being viewed in calendar
   */
  highlightToday(elem, count, year, month){
    //let dNew = new Date();
    //let currYear = dNew.getFullYear();
    //let currMonth = dNew.getMonth();
    
    if((this.date === count) && (year === this.currYear) && (month === this.currMonth)){
      console.log(this.currYear);
      console.log(this.currMonth);

      console.log(count);
      console.log(this.date );

      elem.style.color = 'red';

    }
  }

  /** 
   * This method makes all DOM element in the elem parameter have a light blue backgournd.
   * Changes the backgorund of one week and makes all other weeks have a white background. 
   * 
   * @param elem  HTML collection of DOM Elements - all dom elements of a specific week 
   */
  highlightClicked(elem){
    let days = document.querySelectorAll('.days');

    days.forEach(day => {
      //day.classList.remove('clicked');
      day.style.backgroundColor = 'white';
    });

    elem.forEach( e =>{
      e.style.backgroundColor = 'lightsteelblue';
    });
    //elem.classList.add('clicked');
  }
}