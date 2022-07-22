export class Year{
  constructor(){
    this.months = ["January", "Febuary", "March", "April",
                    "May", "June", "July", "August", "September", 
                    "October", "November", "December"];

    this.eventIDs = ["e1", "e2", "e3", "e4", "e5"];

    this.events = [];
    if(this.getState() !== null){
      this.events = JSON.parse(this.getState()); 
    }
    else{
      for(let i = 0; i < 12; ++i){
        let x = [null, null, null, null, null];
        this.events.push(x);
      }

    }

    console.log(this.events);
    
  }

   /**
   * This method renders the yearly view insidef of the element parameter
   * 
   * @param element DOM element
   */
  render(element){
    element.innerHTML = '';
    let count = 0;

    for(let i = 0; i < 3; ++i){
      for(let j = 0; j < 4; ++j){
        //console.log(this.months[i][j]);
        const div = document.createElement('div');
        div.setAttribute("id", this.months[count]);
        div.classList.add('year-item');
        div.innerText = this.months[count];

        

        element.appendChild(div);
        count++;
      }
    }
  }


  /**
   * This method renders the Top 5 Evenets inside of the element parameter
   * 
   * @param element DOM element
   */
  top5Render(element){
    element.innerHTML = '';;


    for(let i = 0; i < 5; ++i){
      if(i === 0){
        const div = document.createElement('div');
        div.classList.add('top-title');
        div.innerText = "Top Events";
        element.appendChild(div);
      }
      const input = document.createElement("input");
      input.setAttribute("id", this.eventIDs[i]);
      input.setAttribute("type", "text");
      input.classList.add('top-item');
      element.appendChild(input);
      
    }
  }


  /**
   * This method add an event listen to each month so that when it is clicked the 
   * background color changes and the 
   * 
   */
  monthEvents(){
    let topYearElem = document.getElementById('topYear');
    let yearItemElem = document.getElementsByClassName('year-item');
    this.months.forEach((month, i) =>{
      let monthElem = document.getElementById(month);
      //monthElem.addEventListener('click', () => this.showOrHide('topYear'));
      monthElem.addEventListener('click', () => {
        this.setMonnthEvents(i);
        this.showEvent('topYear');

        //console.log(yearItemElem);

        for(let j = 0; j < 12; ++j){
          topYearElem.classList.remove('m' + j);
          yearItemElem[j].style.backgroundColor = 'white';
        }
        topYearElem.classList.add('m' + i);

        console.log('hi');

        
        //yearItemElem.style.backgroundColor = 'white'
        monthElem.style.backgroundColor = 'lightsteelblue';



        //console.log(window.localStorage);

        //this.saveMonthEvents(i);
      });

    });
  }


  /**
   * This method gets the events array at this.events[index] then stores these into the 
   * corresponding DOM element so the event is displayed
   * 
   * @param {number} index element
   */
  setMonnthEvents(index){
    let eventsForMonth = this.events[index];
    //console.log(eventsForMonth);

    for(let i = 0; i < 5; ++i){
      let element = document.getElementById(this.eventIDs[i]);
      //console.log(element);
      if(eventsForMonth[i] !== null){
        element.value = eventsForMonth[i];
      }
      else{
        element.value = '';
      }

      //console.log(element.value);
      
    }
    
  }

  /**
   * This method gets the top 5 events as an array and saves it to this.event
   * 
   */
  saveMonthEvents(){
    //console.log(this.getCurrEvents());
    let topYearElem = document.getElementById('topYear');

    
    //console.log("hello");

    let topEvents = this.getCurrEvents();
    //console.log(topEvents)

    for(let i = 0; i < 12; ++i){
      if(topYearElem.classList.contains('m' + i)){
        this.events[i] = topEvents;
      }
    }

    //console.log(this.events);
    this.saveState();  
  }

   /**
   * This method returns an array of the top events being for the month being view
   * 
   * @param {Array} 
   */
  getCurrEvents(){
    let arr = [];

    for(let i = 0; i < 5; ++i){
      let element = document.getElementById(this.eventIDs[i]);

      if(element.value === ''){
        arr.push(null);
      }
      else{
        arr.push(element.value);
      } 
    }

    
    return arr;
  }


  /**
   * This method saves this.event to local storage 
   * 
   */
  saveState(){
    window.localStorage.setItem('yearEvents',JSON.stringify(this.events));
  }

  /**
   * This method clears the local storage element yearEvents
   * 
   */
  clearState(){
    window.localStorage.removeItem('yearEvents');

  }

  /**
   * This method gets the local storage element yearEvents
   * 
   */
  getState(){
    return window.localStorage.getItem('yearEvents');
  }



  /**
   * This method shows an element with the id equal to the displayElem parameter
   * if the current display property is none.
   * 
   * @param {string} displayElem id of the element
   */
  showEvent(displayElem){
    let elem = document.getElementById(displayElem);
  
    if(elem.style.display === 'none'){
      elem.style.display = 'grid';
    }
  }

  /**
   * This method hides an element with the id equal to the displayElem parameter 
   * if the current display property is grid.
   * 
   * @param {string} displayElem id of the element
   */
  hideEvent(displayElem){
    let elem = document.getElementById(displayElem);
  
    if(elem.style.display === 'grid'){
      elem.style.display = 'none';
    }
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
      this.hideEvent('topYear');
    }
  }

}