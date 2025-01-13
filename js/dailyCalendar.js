//init firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getFirestore, collection,getDocs,addDoc,updateDoc,doc,deleteDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBkBwCTHw56P2qs1n_Yl4HVVNhf0wNx1XM",
  authDomain: "project-daily-planner.firebaseapp.com",
  projectId: "project-daily-planner",
  storageBucket: "project-daily-planner.firebasestorage.app",
  messagingSenderId: "341596285306",
  appId: "1:341596285306:web:90197e8c4b3bcc181ecec3",
  measurementId: "G-LDCB4F40NF"
};
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
//-------------

//check if user logged in
if(!localStorage.getItem("user")) {
    alert("Please Log In before using the calendar!");
    window.location.href = "login.html";
}
//--------------

let currentDate = new Date();
const options = { timeZone: 'Asia/Kuala_Lumpur', year: "numeric", month: "long", day: "numeric" }; //display format
const dayDisplay = document.getElementById("dayDisplay");

//sync with tdy or redirect date from month/year
if(sessionStorage.getItem("storageRedirectDate")==currentDate.toLocaleDateString('en-US', options)) { //if redirect date is tdy
    dayDisplay.textContent = currentDate.toLocaleDateString('en-US', options);
    sessionStorage.removeItem("storageRedirectDate");
}
else if(sessionStorage.getItem("storageRedirectDate")) {
    currentDate = new Date(`${sessionStorage.getItem("storageRedirectDate")} 16:00:00`);
    dayDisplay.textContent = sessionStorage.getItem("storageRedirectDate");
    sessionStorage.removeItem("storageRedirectDate");
} else {
 //convert utc to malaysia time
dayDisplay.textContent = currentDate.toLocaleDateString('en-US', options);
}
// Sample tasks (you can replace this with tasks from your data source)
const tasks = [
    { date: "-1", time: "-1", description: "-1", priority:"-1", uid:"-1"},
];

// Function to generate the timeline
function generateTimeline(dayTasks) {
    const timeline = document.getElementById("timeline");
    timeline.innerHTML = ""; // Clear any existing content

    for (let hour = 0; hour < 24; hour++) {
        const formattedHour = `${hour.toString().padStart(2, "0")}:00`;
    
        // Create time slot
        const timeSlot = document.createElement("div");
        timeSlot.className = "time-slot";
    
        const hourLabel = document.createElement("span");
        hourLabel.className = "hour";
        hourLabel.textContent = formattedHour;
        timeSlot.appendChild(hourLabel);
    
        for (let minute = 0; minute < 60; minute += 1) { 
            const formattedTime = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
            const tasksForTime = dayTasks.filter(t => t.time === formattedTime);
      
            tasksForTime.forEach(task => {
              const taskDiv = document.createElement("div");
              taskDiv.className = "task";
              if(task.priority == "high") { //change task description color according to priority
                taskDiv.style.color = "#ff1e00";
              } else if (task.priority == "medium") {
                taskDiv.style.color = "orange";
              } else if (task.priority == "low") {
                taskDiv.style.color = "#5de651";
              }
              taskDiv.textContent = task.description;
              taskDiv.setAttribute("data-uid",task.uid);
              timeSlot.appendChild(taskDiv);
            });
        }
    
        timeline.appendChild(timeSlot);
    }
}
//loader
function hideLoader() {
    const loader = document.querySelector(".loader");
    loader.style.display = "none";
    const loaderContainer = document.getElementById("loaderContainer");
    loaderContainer.style.display = "none";
}
function showLoader() {
    const loader = document.querySelector(".loader");
    loader.style.display = "flex";
    const loaderContainer = document.getElementById("loaderContainer");
    loaderContainer.style.display = "flex";
}
//-----------------------
//manage task
function taskAddEventListener() {
    const tasksDiv = document.getElementsByClassName("task");
    const mainContainer = document.getElementById("dailyCalendarContainer");
    const addTaskBtn = document.getElementById("addTaskButton");
    const updateTaskBtn = document.getElementById("updateTaskButton");
    const manageTaskContainer = document.getElementById("manageTaskContainer");
    for(let i = 0; i < tasksDiv.length; i++) { //loop thru every task in the day
        tasksDiv[i].addEventListener("click", ()=> { //add event listener for every task
            const task = tasks.find(event => tasksDiv[i].getAttribute("data-uid") === event.uid); //get task inside tasks array

            let descriptionDiv = document.getElementById("description");
            descriptionDiv.textContent = `Description: ${task.description}`;
            let startTimeDiv = document.getElementById("startTime");
            startTimeDiv.textContent = `Start Time: ${task.time}`;
            let dateDiv = document.getElementById("date");
            dateDiv.textContent = `Date: ${task.date}`;
            let priorityDiv = document.getElementById("priority");
            priorityDiv.textContent = `Priority: ${task.priority}`;

            mainContainer.classList.add("hide") //hide mainContainer
            addTaskBtn.classList.add("hide") //hide add task button
            manageTaskContainer.classList.remove("hide");//show manage task container
            updateTaskBtn.classList.remove("hide");//show update task button

            //addeventlistener to descriptionDiv, startTimeDiv, dateDiv, priorityDiv
            descriptionDiv.addEventListener("click",()=>{
                const descriptionInput = prompt("Enter New Description");
                if(descriptionInput)
                descriptionDiv.textContent = `Description: ${descriptionInput}`;
            })
            startTimeDiv.addEventListener("click",()=>{
                const startTimeInput = prompt("Enter new task time (HH:MM, 24-hour format):");
                if(startTimeInput)
                startTimeDiv.textContent = `Start Time: ${startTimeInput}`;
            })
            dateDiv.addEventListener("click",()=>{
                const dateInput = prompt("Enter New Date (YYYY-MM-DD)");
                if(dateInput)
                dateDiv.textContent = `Date: ${dateInput}`;
            })
            priorityDiv.addEventListener("click",()=>{
                const priorityInput = prompt("Enter New Priority (high,medium,low)");
                if(priorityInput)
                priorityDiv.textContent = `Priority: ${priorityInput}`;
            })
            //addeventlistener to remove
            document.getElementById("removeTaskButton").addEventListener("click",()=>{
                const taskRef = doc(firestore,"users",localStorage.getItem("user"),"tasks",task.uid);
                deleteDoc(taskRef).then(()=>{alert("Task Deleted");window.location.href = "dailyCalendar.html";});
            })

            // addeventlistener to update
            document.getElementById("updateTaskButton").addEventListener("click",()=>{
                showLoader();
                const taskRef = doc(firestore,"users",localStorage.getItem("user"),"tasks",task.uid);
                updateDoc(taskRef,{
                    Description: descriptionDiv.textContent.substring(13),
                    StartTime: startTimeDiv.textContent.substring(12),
                    date:  dateDiv.textContent.substring(6),
                    priority: priorityDiv.textContent.substring(10)
                }).then(()=>{
                    hideLoader();
                    alert("Update Successfully!");
                    window.location.href = "dailyCalendar.html";
                })
            })

        })
    }
}
document.getElementById("close").addEventListener("click",()=> {
    const mainContainer = document.getElementById("dailyCalendarContainer");
    const manageTaskContainer = document.getElementById("manageTaskContainer");
    const addTaskBtn = document.getElementById("addTaskButton");
    const updateTaskBtn = document.getElementById("updateTaskButton");
    mainContainer.classList.remove("hide"); //show mainContainer
    addTaskBtn.classList.remove("hide"); //show add task button
    manageTaskContainer.classList.add("hide"); //hide manageTaskContainer
    updateTaskBtn.classList.add("hide");
})
//----------------------------
function changeDay(offset) {
    currentDate.setDate(currentDate.getDate() + offset);
    dayDisplay.textContent = currentDate.toLocaleDateString(undefined, options);

    // Clear and regenerate the timeline for the new date
    const formattedDate = currentDate.toISOString().split("T")[0];
    const dayTasks = tasks.filter(t => t.date === formattedDate); // Filter tasks by current date
    generateTimeline(dayTasks); // Pass filtered tasks to the timeline
    taskAddEventListener();
}
//add eventlistener for left and right arrow change day
document.getElementById("prevDay").addEventListener("click",()=>{
    changeDay(-1);
})
document.getElementById("nextDay").addEventListener("click",()=>{
    changeDay(1);
})
//----------------
document.getElementById("addTaskButton").addEventListener("click", () => {
    const taskTime = prompt("Enter task time (HH:MM, 24-hour format):");
    const taskDescription = prompt("Enter task description:");
    const priority = prompt("Priority: (high,medium,low)");
    const taskDate = currentDate.toISOString().split("T")[0];

    if (taskTime && taskDescription) {
        const taskCol = collection(firestore,"users",localStorage.getItem("user"),"tasks");
        addDoc(taskCol, {
            Description:taskDescription,
            StartTime:taskTime,
            date:taskDate,
            priority:priority,
        }).then((docRef) => {
            location.reload();
          })
    } else {
        alert("Both time and description are required!");
    }
});

//drop down bar
document.querySelector(".iconBorder").addEventListener("click",displayDropdown);
function displayDropdown() {
    document.querySelector(".profileDropDown").classList.toggle("showProfileDropDown");
    document.querySelector(".email").innerHTML = `Email => ${localStorage.getItem("user")}`
    document.querySelector(".iconBorder").classList.toggle("profileSelecting");
    document.querySelector(".mediumBar").classList.toggle("hideMediumBar");
}

document.querySelector(".logout").addEventListener("click",logOut);
function logOut() {
    localStorage.removeItem("user");
    window.location.href = "main.html";
}
//--------------------
// Initialize the timeline for the current date
const formattedDate = currentDate.toISOString().split("T")[0];
//fetch every tasks of user & push to tasks
const colRef = collection(firestore,"users",localStorage.getItem("user"),"tasks");
const getCol = await getDocs(colRef);
getCol.forEach(doc => {
    const data = doc.data();
    tasks.push({date:data.date, time:data.StartTime, description:data.Description, priority:data.priority, uid:doc.id})
})
const dayTasks = tasks.filter(t => t.date === formattedDate); //filter tasks to only today task
generateTimeline(dayTasks);
taskAddEventListener();
hideLoader();
