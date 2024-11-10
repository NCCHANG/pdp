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
    
    //get last day number of the month
    let febLastDate;
    if(tdy.getFullYear()%4 === 0) {//is leap year
        febLastDate = 29;
    } else {
        febLastDate = 28;
    }
    const lastDates = [31,febLastDate,31,30,31,30,31,31,30,31,30,31];
    const lastDate = lastDates[tdy.getMonth()]; //get this month last date
    

    const setFirstOfMonth = new Date(`${tdyMonth} 01, 
        ${tdy.getFullYear()} 00:00:00`);
    const firstDayOfMonth = setFirstOfMonth.getDay(); //in int
    for(let i = 1; i <= lastDate; i++) {
        const btn = document.createElement("button");
        const content = document.createTextNode(i);
        btn.appendChild(content);
        btn.id = `btn${i}`;

        const btnStyle = "border-width:1px;";
        btn.style = btnStyle;
        //set first button into correct day aka column
        //somehow borderwidth will get replaced by grid column
        //so need to type one more time
        if(i === 1) {
            btn.style = `grid-column: ${firstDayOfMonth};
            ${btnStyle}`
        }
        //
        if (i == tdyDate) { //highlight current date
            btn.style = `background-color: #6d7897;${btnStyle}`;
        }

        const existing = document.querySelector("#calender");
        existing.appendChild(btn);
    }
}

document.body.onload = daysBtns;