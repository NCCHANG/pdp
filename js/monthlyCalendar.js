let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth();

const yearlyCalendarContainer = document.getElementById("monthlyCalendarContainer");
const yearDisplay = document.getElementById("monthDisplay");

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const dayNames = ["Sunday", "Monday ", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function generateMonth(year, month) {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const monthDiv = document.createElement("div");
    monthDiv.className = "month";

    // Month title
    const title = document.createElement("h1");
    title.className = "Datedisplay";
    title.textContent = `${monthNames[month]}`;
    yearlyCalendarContainer.appendChild(title);

    // Day names row
    const daysDiv = document.createElement("div");
    daysDiv.className = "days";

    dayNames.forEach(day => {
        const dayNameDiv = document.createElement("div");
        dayNameDiv.className = "day-name";
        dayNameDiv.textContent = day;
        daysDiv.appendChild(dayNameDiv);
    });

    // Empty spaces before the first day of the month
    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement("div");
        emptyCell.className = "day";
        daysDiv.appendChild(emptyCell);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayDiv = document.createElement("div");
        dayDiv.className = "day";
        dayDiv.textContent = day;
        daysDiv.appendChild(dayDiv);
    }

    monthDiv.appendChild(daysDiv);
    return monthDiv;
}

function generateMonthCalendar(year, month) {
    yearlyCalendarContainer.innerHTML = "";

    const monthCalendar = generateMonth(year, month);
    yearlyCalendarContainer.appendChild(monthCalendar);

    yearDisplay.textContent = `${monthNames[month]}`;
}

function changeMonth(offset) {
    currentMonth += offset;

    // Adjust year if month overflows
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    } else if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }

    generateMonthCalendar(currentYear, currentMonth);
}
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
//---------------
// Initialize the calendar
generateMonthCalendar(currentYear, currentMonth);
