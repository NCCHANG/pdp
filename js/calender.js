function thirtyFiveBtn() {
    for(let i = 1; i <= 35; i++) {
        const btn = document.createElement("button");
        const content = document.createTextNode(i);
        btn.appendChild(content);
        btn.id = `btn${i}`;
        const existing = document.querySelector("#calender");
        existing.appendChild(btn);
    }
}

document.body.onload = thirtyFiveBtn;