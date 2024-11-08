function updateTime() {
    // to do: make an options between 12hr and 24 hour
    const now = new Date();
    
    const hour = now.getHours();
    const minute = now.getMinutes();
    const time = hour + ":" + minute;
    
    document.getElementById("time").innerHTML = time;
}
document.body.onload = updateTime;
setInterval(updateTime,1000)