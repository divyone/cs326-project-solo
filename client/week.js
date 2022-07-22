export class Week{
  constructor(){
    this.date = new Date();
    this.month = this.date.getMonth();

    this.d = ["Sunday", "Monday", "Tuesday", "Wednesday", 
                "Thursday", "Friday", "Saturday"];

    this.m = ["January","February","March","April","May",
            "June","July","August","September","October",
            "November","December"];

    this.data = {}
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
    this.m.forEach(month => (
      this.data[month] = null
    ));
    let count = 0
    for (const month in this.data) {
      let d = this.createDataDays(count);

      //console.log(month);

      for(const day in d){
        let tasks = this.dataHelper();

        d[day] = tasks;
      }

      this.data[month] = d;
      count++ 
    }

   console.log(this.data);
   //console.log(this.data[2]);
  }

  /**
   * This method initializes the days of ech month to null through an object which is then returned.
   *
   * @param {number} month the month being initialized
   * @return {Object} All days of the month  {{day0: null}, ..., {dayX: null}}
   */
  createDataDays(month){
    let year = this.date.getFullYear();
    //console.log(month);
    let newDate = new Date(year, month + 1, 0);
    //console.log(newDate.getDate())
    let totalDays =  newDate.getDate(); //number of days in month
    let obj = {}

    for(let i = 0; i < totalDays; ++i){
      obj["day" + i] = null
    }
   // console.log(obj);
   return obj;
  }

  /**
   * This method initializes the day so that all tasks for that day are set to null and the 
   * checkboxes are set to false. This is put into and object and returned
   * 
   * @return {Object} {{task0: null, check0: false}, ..., {task6: null, check6: false}}
   */
  dataHelper(){
    let obj = {}

    for(let i = 0; i < 7; ++i){
      //let arr = [null, null, null, null, null, null, null];
      obj["task" + i] = null;
      obj["check" + i] = false
    }

   // console.log(obj);
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
      //console.log(elems[i]);
    }
  }

  /**
   * This method renders a day of the weekly planner. This method does NOT input the
   * stored data when rendering (this is done in the display week method below)
   * 
   * @param element DOM Element- represents day ex dom element for Sunday
   */
  render(element){
    //element.innerHTML = '';
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
      //input2.classList.add('task' + i);
      input2.classList.add('task');
      //input2.value = count;


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

    console.log(weekElem);
    console.log(daysElem);


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

    console.log("currMonth");
    console.log(currMonth);
    console.log("prevMonth");
    console.log(prevMonth);
    console.log("nextMonth");
    console.log(nextMonth);

    /*console.log(this.m[mnth]);
    console.log(this.m[mnth - 1]);
    console.log(this.m[mnth + 1]); */
    //console.log(weekElem); // get elements from week

    //console.log(elem)

    //console.log(mnth)
    //console.log(week)

    //console.log(currMonth);


    for(let i = 1; i < daysElem.length; i++) // make dayelelm.lenght
    {
      let dayCal = weekElem[i -1];
      let dayWeek = daysElem[i];

      //if(elem.id === dayWeek.id){
        //console.log(dayCal);
        //console.log(dayWeek);
        //console.log("1111111111111111111111")


        let taskForDay = dayWeek.querySelectorAll('.tasks');
        //console.log(taskForDay);

        let day = Number(dayCal.innerText)
        //console.log(day);


        for(let j = 0; j < 7; j++){
          //let day = Number(dayCal.innerText)
          let task = 0;
          let isChecked = 0;
          if(dayCal.classList.contains('prevMonth')){
            let prevDayData = prevMonth['day' + (day -1)];
            //console.log(prevDayData);
            task = prevDayData["task" + j];

            isChecked = prevDayData["check" + j];

          }
          if(dayCal.classList.contains('currMonth')){
            //console.log('day' + (day -1))
            let currDayData = currMonth['day' + (day -1)];
            //console.log(currDayData);
            task = currDayData["task" + j];
            //console.log(currDayData);


            isChecked = currDayData["check" + j];

            //taskForDay[j].childNodes[1].value;

            //currDayData["task" + j] = taskX;
            //console.log(currDayData);
            //console.log(taskForDay[j]);
            //console.log(taskForDay[j].childNodes);
            //console.log(taskForDay[j].childNodes[1].value);
            
          }
          if(dayCal.classList.contains('nextMonth')){
            let nextDayData = nextMonth['day' + (day -1)];
            //console.log(nextDayData);
            task = nextDayData["task" + j]; 

            isChecked = nextDayData["check" + j];
          }
          //console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&")
          //console.log(task)

          //console.log(isChecked);

          if(task === null){
            //console.log("bHHHHHHHHHHHHHHHHHHH")
            //console.log(taskForDay[j].childNodes[1]);
            //console.log(task)
            taskForDay[j].childNodes[1].value = "";
          }
          else if(task === 0 || isChecked === 0){
            console.log("ERROR")
          }
          else{
            //console.log("AHHHHHHHHHHHHHHHHHHH")
            //console.log(taskForDay[j].childNodes[1]);
            //console.log(task)
            //console.log('1');
            taskForDay[j].childNodes[1].value = task;

          }
          taskForDay[j].childNodes[0].checked = isChecked;
          //console.log(isChecked);
          //console.log(taskForDay[j].childNodes[0].checked);
  
        }
        //console.log(currMonth);
        //console.log(this.data);
      
    }
    console.log(this.data);




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

    /*console.log(this.m[mnth]);
    console.log(this.m[mnth - 1]);
    console.log(this.m[mnth + 1]); */
    //console.log(weekElem); // get elements from week

    //console.log(elem)
    //console.log(mnth)
    //console.log(week)

    //console.log(currMonth);


    for(let i = 1; i < daysElem.length; i++)  // make dayelelm.lenght
    {
      let dayCal = weekElem[i -1];
      let dayWeek = daysElem[i];

      if(elem.id === dayWeek.id){
        //console.log(dayCal);
        //console.log(dayWeek);


        let taskForDay = dayWeek.querySelectorAll('.tasks');
        //console.log(taskForDay);

        let day = Number(dayCal.innerText)
        


        for(let j = 0; j < 7; j++){
          //let day = Number(dayCal.innerText)
          //console.log(day);
          if(dayCal.classList.contains('prevMonth')){
            //console.log(prevMonth);
            //console.log(taskForDay[j]);
            let prevDayData = prevMonth['day' + (day -1)];
            let taskX = taskForDay[j].childNodes[1].value;
            prevDayData["task" + j] = taskX;

            let isChecked = taskForDay[j].childNodes[0].checked
            prevDayData["check" + j] = isChecked;

          }
          if(dayCal.classList.contains('currMonth')){
            let currDayData = currMonth['day' + (day -1)];
            let taskX = taskForDay[j].childNodes[1].value;
            currDayData["task" + j] = taskX;

            let isChecked = taskForDay[j].childNodes[0].checked
            currDayData["check" + j] = isChecked;

            //console.log(currDayData);
            //console.log(taskForDay[j]);
            //console.log(taskForDay[j].childNodes);
            //console.log(taskForDay[j].childNodes[1].value);
            
          }
          if(dayCal.classList.contains('nextMonth')){
            let nextDayData = nextMonth['day' + (day -1)];
            let taskX = taskForDay[j].childNodes[1].value;
            nextDayData["task" + j] = taskX;

            let isChecked = taskForDay[j].childNodes[0].checked
            nextDayData["check" + j] = isChecked;
            
          }
  
        }
        console.log("******************************")
        console.log(currMonth);
        console.log(nextMonth);
        console.log(prevMonth);
        console.log(this.data);
        console.log("******************************")
        this.saveToStorage();

      }
    }
    

  }

  /**
   * This method saves this.data to local storage 
   * 
   */
  saveToStorage(){
    //console.log(JSON.stringify(this.data))
    window.localStorage.setItem('tasksData', JSON.stringify(this.data));
    console.log(JSON.parse(window.localStorage.getItem('tasksData')));
  }
  //float;
  //height: 630; width: 450;


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
