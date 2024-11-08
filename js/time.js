function updateTime() {
    
    const now = new Date();
    
    const hour = now.getHours();
    const minute = now.getMinutes();
    const time = hour + ":" + minute;
    
    document.getElementById("time").innerHTML = time;
}
document.body.onload = updateTime;
setInterval(updateTime,1000)