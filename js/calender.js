function daysBtns() {
    const tdy = new Date();
    //get Month
    const monthNames = ["January","February","March","April",
        "May","June","July","August","September","October",
        "November","December"];
    const tdyMonth = monthNames[tdy.getMonth()]; //tdy.getMonth return num
    //                                           //exp:February then ret 1
    //get last day number of the month
    let febDayNumber;
    if(tdy.getFullYear()%4 === 0) {//is leap year
        febDayNumber = 29;
    } else {
        febDayNumber = 28;
    }
    const lastDayNumbers = [31,febDayNumber,31,30,31,30,31,31,30,31,30,31];
    const lastDayNumber = lastDayNumbers[tdy.getMonth()];
    //
    const setFirstOfMonth = new Date(`${tdyMonth} 01, 
        ${tdy.getFullYear()} 00:00:00`);
    const firstDayOfMonth = setFirstOfMonth.getDay(); //in int
    for(let i = 1; i <= lastDayNumber; i++) {
        const btn = document.createElement("button");
        const content = document.createTextNode(i);
        btn.appendChild(content);
        btn.id = `btn${i}`;
        //set first button into correct day aka column
        if(i === 1) {
            btn.style = `grid-column:${firstDayOfMonth}`
        }
        //
        const existing = document.querySelector("#calender");
        existing.appendChild(btn);
    }
}

document.body.onload = daysBtns;