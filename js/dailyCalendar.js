let currentDate = new Date();

const dayDisplay = document.getElementById("dayDisplay");

// Sample tasks (you can replace this with tasks from your data source)
const tasks = [
    //{ time: "09:00", description: "Team Meeting" },
    //{ time: "10:30", description: "Client Call" },
    //{ time: "13:00", description: "Lunch Break" },
    //{ time: "15:00", description: "Project Review" },
];

// Function to generate a time slot
function generateTimeSlot(hour, task = null) {
    const timeSlot = document.createElement("div");
    timeSlot.className = "time-slot";

    // Hour label
    const hourLabel = document.createElement("span");
    hourLabel.className = "hour";
    hourLabel.textContent = hour;
    timeSlot.appendChild(hourLabel);

    // Task (if any)
    if (task) {
        const taskDiv = document.createElement("div");
        taskDiv.className = "task";
        taskDiv.textContent = task;
        timeSlot.appendChild(taskDiv);
    }

    return timeSlot;
}

// Function to generate the timeline
function generateTimeline(tasks) {
    const timeline = document.getElementById("timeline");
    timeline.innerHTML = ""; // Clear any existing content

    // Get tasks for the current date
    const formattedDate = currentDate.toISOString().split("T")[0];
    const dayTasks = tasks.filter(t => t.date === formattedDate);

    // Create time slots for each hour of the day (24-hour format)
    for (let hour = 0; hour < 24; hour++) {
        const formattedHour = `${hour.toString().padStart(2, "0")}:00`;
        const task = tasks.find(t => t.time.startsWith(formattedHour));
        const taskDescription = task ? task.description : null;

        const timeSlot = generateTimeSlot(formattedHour, taskDescription);
        timeline.appendChild(timeSlot);
    }
}

function changeDay(offset) {
    // Update the current date by adding the offset
    currentDate.setDate(currentDate.getDate() + offset);

    // Update the displayed date
    const dayDisplay = document.getElementById("dayDisplay");
    const options = { year: "numeric", month: "long", day: "numeric" };
    dayDisplay.textContent = currentDate.toLocaleDateString(undefined, options);

    // Clear and regenerate the timeline for the new date
    const formattedDate = currentDate.toISOString().split("T")[0];
    const dayTasks = tasks.filter(t => t.date === formattedDate); // Filter tasks by current date
    generateTimeline(dayTasks); // Pass filtered tasks to the timeline
}

document.getElementById("addTaskButton").addEventListener("click", () => {
    const taskTime = prompt("Enter task time (HH:MM, 24-hour format):");
    const taskDescription = prompt("Enter task description:");
    const taskDate = currentDate.toISOString().split("T")[0];

    if (taskTime && taskDescription) {
        tasks.push({ date: taskDate, time: taskTime, description: taskDescription });
        generateTimeline(tasks);
    } else {
        alert("Both time and description are required!");
    }
});

// Initialize the timeline
generateTimeline(tasks);
