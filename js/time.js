function updateTime() {
    // to do: make an options between 12hr and 24 hour
    const now = new Date();
    
    const hour = now.getHours();
    const minute = now.getMinutes();
    let second = now.getSeconds();
    let time;
    if (second < 10) {
        second = "0" + second;
    }
    if(minute<10) {
        time = hour + ":0" + minute +":"+ second;
    } else {
        time = hour + ":" + minute +":"+ second;
    }
    document.querySelector(".time").innerHTML = time;
}
document.body.onload = updateTime;
setInterval(updateTime,1000)