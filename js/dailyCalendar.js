let currentDate = new Date();

const dailyCalendarContainer = document.getElementById("dailyCalendarContainer");
const dateDisplay = document.getElementById("dayDisplay");

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const dayNames = ["Sunday", "Monday ", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

function generateDailyCalendar(date){
    dailyCalendarContainer.innerHTML = ""; // Clear previous content

    // Display the day name and date
    const dayHeader = document.createElement("h1");
    dayHeader.className = "Datedisplay";
    dayHeader.textContent = `${dayNames[date.getDay()]}, ${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    dailyCalendarContainer.appendChild(dayHeader);

    // Add a section for tasks/events
    const tasksContainer = document.createElement("div");
    tasksContainer.className = "tasks-container";
    tasksContainer.innerHTML = ``;
    dailyCalendarContainer.appendChild(tasksContainer);
}

function changeDay(offset) {
    currentDate.setDate(currentDate.getDate() + offset)
   
    generateDayCalendar(currentDate);
}

// Initialize the calendar
generateDayCalendar(currentDate);
