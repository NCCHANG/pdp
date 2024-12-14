let tdy = new Date();
function startDateCurrentWeek(){ //monday
    const startDate = new Date();
    while(startDate.getDay() != 1) {
        startDate.setDate(startDate.getDate() -1);
    }
    return startDate;
}
function endDateCurrentWeek(){ //monday
    const endDate = new Date();
    while(endDate.getDay() != 0) {
        endDate.setDate(endDate.getDate() + 1);
    }
    return endDate;
}
const h1WeekRange = document.getElementById("weekRange");
const startDate = startDateCurrentWeek();
const endDate = endDateCurrentWeek();
h1WeekRange.textContent = " Weeks " + startDate.getDate() + '/' + startDate.getMonth() + " - " + endDate.getDate() + '/' + endDate.getMonth();