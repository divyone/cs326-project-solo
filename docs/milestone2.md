Team Name - Divyone  
Application Name -  Digital Life Planner

# Team Overview
Members - Divyone Muigai  
Username - Divyone Muigai

## Application Idea
This digital planner will allow you to keep track of all your day to day needs. It will allows you to keep track of what tasks
you have completed along with what task you still need to do. If i am able to then I will try to add different feature to this 
planner such as an expense tracker, water intake chart, or mood chart. 
 
## Functionality
My application will store the data of all tasks except those deleted. If i am able to add expense tracker, water intake chart, 
or mood chart then I would like to store the daily data and display it in some way through the server. The main planner part will 
save the data for the entire year and have the option to reset it at anytime through a button. It will also have a yearly view 
which shows the user their top 5 event for a month they choose.

## Data Interations
-For the yearly view portion, when you click on a month it will display the top 5 events for that month. The user will alse have
the option to edit the events, any edits will be saved to the local storage.

-For the weekly planner portion, there will be any interactive calendar to navigate which week you want to add task to. The
calendar will alway open to the current week and display the days sunday through saturaday. When the user click on a differnt 
week the saved data (if any) will display. The user is able to add different task to each day and check off a task to represnt
its completion.

-For the expense tracker/ water intake chart/ mood chart, this will save data through the server instead of local storage.

## html documentation
There are three button displayed at the top of my application, labeled 'My Year', 'My Month', and 'Reset Planner'. There is a
div element with the id 'myYear'. This is where the yearly overview is dispalyed. This yearly overview contains a div element 
with the id 'year', this is where the clickable months are displayed that trigger the top events for the month to be shown. 
The top event for the month are represented by a the div with the id 'topYear'. Our next major div parent is the one with 
the id 'myMonth'. This is where the weekly planner and calendar are displayed. The calender is render within the div element 
with the id 'calendar'. Some of the calendar div elements that always stay constant are created in this html doc 
(ex. the label for the days of the week). The rest of the calendar div elements are rendered in a javascript file. The other 
div elements within the myMonth element represent the area where you can type your task for each day.

<img width="1440" alt="Screen Shot 2022-07-23 at 2 00 12 AM" src="https://user-images.githubusercontent.com/106116264/180592717-390977e9-7d78-4b56-b3e0-9ea573b4cabd.png">
<img width="1440" alt="Screen Shot 2022-07-23 at 2 00 31 AM" src="https://user-images.githubusercontent.com/106116264/180592731-58e9d802-bcb9-4327-82fc-761e77689c3a.png">

## CSS documentaion
CSS was used to help make my application more user friendly and to display my html elements in grids. The yearly overview
contains two grids one that is used to display the months of the year and another which is used to show the top events occuring
in a specified month. The grids displaying the months in the yearly overview also utilize hover to help let the user know 
they can click on the months. Another area where grids where used was in my weekly planner. I used one larger 3 by 3 grid
to represent this. In the first portion of this grid i displayed the calendar and for the rest of the grid areas I used it to 
show the tasks for each day of a specified week. For the calendar previous mention it was made using a css grid to get it to 
look like a normal calendar.

<img width="1440" alt="Screen Shot 2022-07-23 at 2 00 43 AM" src="https://user-images.githubusercontent.com/106116264/180593811-eb138cc2-1580-4adb-ab2c-47a372aef81d.png">
<img width="1440" alt="Screen Shot 2022-07-23 at 2 00 52 AM" src="https://user-images.githubusercontent.com/106116264/180593823-e86eaa41-3146-443b-9dd7-7834e23b6655.png">
<img width="1440" alt="Screen Shot 2022-07-23 at 2 01 01 AM" src="https://user-images.githubusercontent.com/106116264/180593828-9d697483-a20f-4006-8f54-c438d5e5aaa4.png">
<img width="1440" alt="Screen Shot 2022-07-23 at 2 01 10 AM" src="https://user-images.githubusercontent.com/106116264/180593837-87d4dbfd-2903-445b-baa6-d13f4026639b.png">
<img width="1440" alt="Screen Shot 2022-07-23 at 2 01 17 AM" src="https://user-images.githubusercontent.com/106116264/180593838-492fa66a-f4a2-4ee3-a03e-6998996278b4.png">

## Video of application running
https://www.loom.com/share/9be2ecd3a55049f99d33b63633fa07af
