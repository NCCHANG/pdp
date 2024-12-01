function getLastDateOfMonth(month,year) {
    //get last day number of the month
    let febLastDate;
    if(year%4 === 0) {//is leap year
        febLastDate = 29;
    } else {
        febLastDate = 28;
    }
    const lastDates = [31,febLastDate,31,30,31,30,31,31,30,31,30,31]; //index 0 is January
    const lastDate = lastDates[month]; //get this month last date
    return lastDate;
}

function daysBtns() {
    const tdy = new Date();
    //get date
    tdyDate = tdy.getDate();
    //get Month
    const monthNames = ["January","February","March","April",
        "May","June","July","August","September","October",
        "November","December"];
    const tdyMonth = monthNames[tdy.getMonth()]; //tdy.getMonth return num
                                                 //exp:February then ret 1
    
    const lastDate = getLastDateOfMonth(tdy.getMonth(),tdy.getFullYear());

    const setFirstOfMonth = new Date(`${tdyMonth} 01, 
        ${tdy.getFullYear()} 00:00:00`);
    const firstDayOfMonth = setFirstOfMonth.getDay(); //in int
    for(let i = 1; i <= lastDate; i++) {
        const btn = document.createElement("button");
        const divBtnContent = document.createElement("div");
        const pTask = document.createElement("p");
        const pDate = document.createElement("p");
        divBtnContent.className = "btnContent";
        
        const date = document.createTextNode(i);
        const task = document.createTextNode("idk man");
        pTask.appendChild(task);
        pDate.appendChild(date);
        divBtnContent.appendChild(pTask);
        divBtnContent.appendChild(pDate);
        btn.appendChild(divBtnContent);
        btn.id = `btn${i}`;

        //STYLE
        const btnStyle = "border-width:1px;";
        btn.style = btnStyle;
        //set first button into correct day aka column
        //somehow borderwidth will get replaced by grid column
        //so need to type one more time
        if (i === 1) {
            btn.style = `grid-column: ${firstDayOfMonth};
            ${btnStyle}`
        }
        if (i == tdyDate) { //highlight current date
            btn.style = `background-color: #6d7897;${btnStyle}`;
        }
        //

        const existing = document.querySelector("#calender");
        existing.appendChild(btn);
    }
}

document.body.onload = daysBtns;