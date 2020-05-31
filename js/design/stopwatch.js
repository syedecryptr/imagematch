var timeBegan = null
    , timeStopped = null
    , stoppedDuration = 0
    , started = null;

function start_clock() {
    if (timeBegan === null) {
        timeBegan = new Date();
    }

    if (timeStopped !== null) {
        stoppedDuration += (new Date() - timeStopped);
    }
    console.log(stoppedDuration);

    started = setInterval(clockRunning, 1);	
}

function stop_clock() {
    timeStopped = new Date();
    clearInterval(started);
}
 
// function reset() {
//     clearInterval(started);
//     stoppedDuration = 0;
//     timeBegan = null;
//     timeStopped = null;
//     document.getElementById("display-area").innerHTML = "00:00:00.000";
// }

function clockRunning(){
    var currentTime = new Date()
        , timeElapsed = new Date(currentTime - timeBegan - stoppedDuration)
        , hour = timeElapsed.getUTCHours()
        , min = timeElapsed.getUTCMinutes()
        , sec = timeElapsed.getUTCSeconds()
        , ms = timeElapsed.getUTCMilliseconds()
        , hour_string = (hour > 9 ? hour : "0" + hour)
        , min_string = (min > 9 ? min : "0" + min)
        , sec_string = (sec > 9 ? sec : "0" + sec)
        , ms_string = (ms > 99 ? ms : ms > 9 ? "0" + ms : "00" + ms)
        document.getElementById("millisecond").innerHTML=ms_string;
        document.getElementById("second").innerHTML=sec_string;
        document.getElementById("minute").innerHTML=min_string;
};
