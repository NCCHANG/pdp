function updateTime() {
    // to do: make an options between 12hr and 24 hour
    const now = new Date();
    
    const hour = now.getHours();
    const minute = now.getMinutes();
    let time;
    if(minute<10) {
        time = hour + ":0" + minute;
    } else {
        time = hour + ":" + minute;
    }
    document.querySelector(".time").innerHTML = time;
}
document.body.onload = updateTime;
setInterval(updateTime,1000)