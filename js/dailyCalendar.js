//init firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getFirestore, collection,getDocs,addDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

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
    { date: "2025-01-11", time: "09:00", description: "Team Meeting" },
    { date: "2025-01-11", time: "09:11", description: "Client Call" },
    { date: "2025-01-11", time: "13:00", description: "Lunch Break" },
    { date: "2025-01-11", time: "15:00", description: "Project Review" },
    { date: "2025-01-12", time: "07:00", description: "Team Meeting" },
    { date: "2025-01-12", time: "07:15", description: "Client Call" },
    { date: "2025-01-12", time: "16:00", description: "Lunch Break" },
    { date: "2025-01-12", time: "18:00", description: "Project Review" },
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
              taskDiv.textContent = task.description;
              timeSlot.appendChild(taskDiv);
            });
        }
    
        timeline.appendChild(timeSlot);
    }
}

function changeDay(offset) {
    currentDate.setDate(currentDate.getDate() + offset);
    dayDisplay.textContent = currentDate.toLocaleDateString(undefined, options);

    // Clear and regenerate the timeline for the new date
    const formattedDate = currentDate.toISOString().split("T")[0];
    const dayTasks = tasks.filter(t => t.date === formattedDate); // Filter tasks by current date
    generateTimeline(dayTasks); // Pass filtered tasks to the timeline
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
    const taskDate = currentDate.toISOString().split("T")[0];

    if (taskTime && taskDescription) {
        const taskCol = collection(firestore,"users",localStorage.getItem("user"),"tasks");
        addDoc(taskCol, {
            Description:taskDescription,
            StartTime:taskTime,
            date:taskDate,
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
    tasks.push({date:data.date, time:data.StartTime, description:data.Description})
})
console.log(currentDate);

const dayTasks = tasks.filter(t => t.date === formattedDate);
generateTimeline(dayTasks);
