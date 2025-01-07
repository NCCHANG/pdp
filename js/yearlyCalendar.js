let currentYear = new Date().getFullYear();
console.log(localStorage.getItem("user"))
//TODO
//sign out change localStorage.removeItem(key);
//if !localStorage.getItem("user") back to main page
const yearlyCalendarContainer = document.getElementById("yearlyCalendarContainer");
const yearDisplay = document.getElementById("yearDisplay");
yearDisplay.textContent = new Date().getFullYear();

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function generateMonth(year, month) {
    const firstDay = new Date(year, month, 1).getDay();
    const Month = new Date(year, month + 1, 0).getDate(); //lastday of previous month.

    const monthDiv = document.createElement("div");
    monthDiv.className = "month";

    //month title
    const title = document.createElement("h3");
    title.textContent = monthNames[month];
    monthDiv.appendChild(title);

    //dayss
    const daysDiv = document.createElement("div");
    daysDiv.className = "days";

    // mon, tue, wed
    dayNames.forEach(day => {
        const dayNamesDiv = document.createElement("div");
        dayNamesDiv.className = "day-name";
        dayNamesDiv.textContent = day;
        daysDiv.appendChild(dayNamesDiv);
    })

    //add an empty space before the first day of month
    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement("div");
        emptyCell.className = "day";
        daysDiv.appendChild(emptyCell);
    }

    //add days
    for (let day = 1; day <= Month; day++) {
        const dayDiv = document.createElement("div");
        dayDiv.className = "day";
        dayDiv.textContent = day;
        daysDiv.appendChild(dayDiv);
    }

    monthDiv.appendChild(daysDiv);
    return monthDiv;

}

function generateYearCalendar(year) {
    yearlyCalendarContainer.innerHTML = "";
    for (let month = 0; month < 12; month++) {
        const monthDiv = generateMonth(year, month);
        yearlyCalendarContainer.appendChild(monthDiv);
    }
}

//related to buttons
function changeYear(offset) {  //onclick -1 / +1
    currentYear += offset; // Increment or decrement the year // on click
    yearDisplay.textContent = currentYear;
    generateYearCalendar(currentYear);
}


generateYearCalendar(currentYear);
