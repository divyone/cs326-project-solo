export class Week{
  constructor(){
    this.date = new Date();
    this.month = this.date.getMonth();

    this.d = ["Sunday", "Monday", "Tuesday", "Wednesday", 
                "Thursday", "Friday", "Saturday"];

    this.m = ["January","February","March","April","May",
            "June","July","August","September","October",
            "November","December"];

    this.data = {};
    if(window.localStorage.getItem('tasksData') !== null){
      console.log('1')
      this.data = JSON.parse(window.localStorage.getItem('tasksData'));
      console.log(JSON.parse(window.localStorage.getItem('tasksData')));
    }
    else{
      console.log('2')
      this.createData();
    }

  }

  /**
   * Initializes data of every day of the year. Setting daily tasks to null and 
   * the checkbox to false. These initialized day objects are then put inside
   * monthly objects. All of this is stored into the this.data object and in its
   * totality represents the weekly calendar data for every day/week or the year.
   */
  createData(){
    let count = 0; //represent month in number form

    this.m.forEach(month => { //initializes months to this.data
      this.data[month] = null;
    });

    for (const month in this.data) {
      let d = this.createDataDays(count);

      for(const day in d){
        let tasks = this.dataHelper();
        d[day] = tasks; //initializes tasks and check status to day
      }

      this.data[month] = d; //initializes day to the months in this.data
      count++ 
    }
  }

  /**
   * This method initializes the days of ech month to null through an object which is then returned.
   *
   * @param {number} month the month being initialized
   * @return {Object} All days of the month  {{day0: null}, ..., {dayX: null}}
   */
  createDataDays(month){
    let year = this.date.getFullYear();
    let newDate = new Date(year, month + 1, 0);
    let totalDays =  newDate.getDate(); //number of days in month
    let obj = {}

    for(let i = 0; i < totalDays; ++i){
      obj["day" + i] = null;
    }
   return obj;
  }

  /**
   * This method initializes the day so that all tasks for that day are set to null and the 
   * checkboxes are set to false. This is put into and object and returned
   * 
   * @return {Object} {{task0: null, check0: false}, ..., {task6: null, check6: false}}
   */
  dataHelper(){
    let obj = {};

    for(let i = 0; i < 7; ++i){
      obj["task" + i] = null;
      obj["check" + i] = false;
    }
    return obj;
  }

  /**
   * This method renders the weekly planner view by calling the render method on the 
   * DOM elements with the class 'week-item'. It excludes the first DOM element 
   * because that is the calender which is rendered in the calendar class (calendar.js)
   * 
   */
  renderWeek(){
    let elems = document.getElementsByClassName("week-item");
    for(let i = 1; i < elems.length; i++)
    {
      this.render(elems[i]);
    }
  }

  /**
   * This method renders a day of the weekly planner. This method does NOT input the
   * stored data when rendering (this is done in the display week method below)
   * 
   * @param element DOM Element- represents day ex dom element for Sunday
   */
  render(element){
    let count = 0;

    for(let i = 0; i < 7; ++i){
      const divmain = document.createElement('div');
      divmain.classList.add('tasks');

      const input1 = document.createElement('input');
      input1.setAttribute("type", "checkbox");
      input1.classList.add('check' + i);
      input1.classList.add('check');

      const input2 = document.createElement('input');
      input2.setAttribute("type", "text");
      input2.classList.add('toDo');
      input2.classList.add('task');

      divmain.appendChild(input1);
      divmain.appendChild(input2);
      element.appendChild(divmain)
      count++;
    }
  }

  /**
   * This method inputs the stored data of the tasks and checkboxes into 
   * the weekly planner view 
   * 
   * @param {number} mnth the month being viewed
   * @param {number} week the week being viewed
   */
  displayWeek(mnth, week){  
    let currMonth = this.data[this.m[mnth]];
    let prevMonth = null;
    let nextMonth = null;
    let weekElem = document.getElementsByClassName(week);
    let daysElem = document.getElementsByClassName("week-item");

    //get data for next and previous month
    if(mnth === 0){
      prevMonth = this.data[this.m[11]];
      nextMonth = this.data[this.m[mnth + 1]];
    }
    else if(mnth === 11){
      prevMonth = this.data[this.m[mnth - 1]];
      nextMonth = this.data[this.m[0]];
    }
    else{
      prevMonth = this.data[this.m[mnth - 1]];
      nextMonth = this.data[this.m[mnth + 1]];
    }

    for(let i = 1; i < daysElem.length; i++){
      let dayCal = weekElem[i -1]; //day of the week on month calander
      let dayWeek = daysElem[i]; //day of the week on weekly calander
      let taskForDay = dayWeek.querySelectorAll('.tasks');
      let day = Number(dayCal.innerText); //date of calender day

      for(let j = 0; j < 7; j++){
        let task = 0;
        let isChecked = 0;

        //Get data for day in the correct month
        if(dayCal.classList.contains('prevMonth')){
          let prevDayData = prevMonth['day' + (day -1)];
          task = prevDayData["task" + j];
          isChecked = prevDayData["check" + j];
        }

        if(dayCal.classList.contains('currMonth')){
          let currDayData = currMonth['day' + (day -1)];
          task = currDayData["task" + j];
          isChecked = currDayData["check" + j];
        }

        if(dayCal.classList.contains('nextMonth')){
          let nextDayData = nextMonth['day' + (day -1)];
          task = nextDayData["task" + j]; 
          isChecked = nextDayData["check" + j];
        }
          
        //set task to correct saved value
        if(task === null){
          taskForDay[j].childNodes[1].value = "";
        }
        else if(task === 0 || isChecked === 0){
          console.log("ERROR")
        }
        else{
          taskForDay[j].childNodes[1].value = task;
        }
        taskForDay[j].childNodes[0].checked = isChecked; //set checkbox to correct saved setting
      }
    }
  }

  /**
   * This method saves the data of a day in the weekly planner to this.data, for every 
   * tasks it saves whether it is checked and the corresponding textbox value  
   * 
   * @param {number} mnth the month being viewed
   * @param {number} week the week being viewed
   * @param element DOM Element- represents day ex.dom element for Sunday
   */
  saveData(mnth, week, elem){
    let currMonth = this.data[this.m[mnth]];
    let prevMonth = null;
    let nextMonth = null;
    let weekElem = document.getElementsByClassName(week);
    let daysElem = document.getElementsByClassName("week-item");

    //get data for next and previous month
    if(mnth === 0){
      prevMonth = this.data[this.m[11]];
      nextMonth = this.data[this.m[mnth + 1]];
    }
    else if(mnth === 11){
      prevMonth = this.data[this.m[mnth - 1]];
      nextMonth = this.data[this.m[0]];
    }
    else{
      prevMonth = this.data[this.m[mnth - 1]];
      nextMonth = this.data[this.m[mnth + 1]];
    }

    for(let i = 1; i < daysElem.length; i++){
      let dayCal = weekElem[i -1]; //day of the week on month calander
      let dayWeek = daysElem[i]; //day of the week on weekly planner

      if(elem.id === dayWeek.id){ //get correct day of week which has been edited
        let taskForDay = dayWeek.querySelectorAll('.tasks');
        let day = Number(dayCal.innerText)

        //Store data for day in the correct month
        for(let j = 0; j < 7; j++){
          if(dayCal.classList.contains('prevMonth')){
            let prevDayData = prevMonth['day' + (day -1)];
            let taskX = taskForDay[j].childNodes[1].value;
            let isChecked = taskForDay[j].childNodes[0].checked;

            prevDayData["task" + j] = taskX;
            prevDayData["check" + j] = isChecked;
          }

          if(dayCal.classList.contains('currMonth')){
            let currDayData = currMonth['day' + (day -1)];
            let taskX = taskForDay[j].childNodes[1].value;
            let isChecked = taskForDay[j].childNodes[0].checked;

            currDayData["task" + j] = taskX;
            currDayData["check" + j] = isChecked;
          }
          if(dayCal.classList.contains('nextMonth')){
            let nextDayData = nextMonth['day' + (day -1)];
            let taskX = taskForDay[j].childNodes[1].value;
            let isChecked = taskForDay[j].childNodes[0].checked;

            nextDayData["task" + j] = taskX;
            nextDayData["check" + j] = isChecked;  
          }
        }

        this.saveToStorage();
      }
    }
  }

  /**
   * This method saves this.data to local storage 
   * 
   */
  saveToStorage(){
    window.localStorage.setItem('tasksData', JSON.stringify(this.data));
    console.log(JSON.parse(window.localStorage.getItem('tasksData')));
  }


  /**
   * This method changes the display property for an element with the id equal to the 
   * displayElem parameter. This Functionality is used to hide and display a DOM element
   * 
   * @param {string} displayElem id of the element
   */
  showOrHide(displayElem){
    let elem = document.getElementById(displayElem);
  
    if(elem.style.display === 'none'){
      elem.style.display = 'grid';
    }
    else{
      elem.style.display = 'none';
    }
  }
}
