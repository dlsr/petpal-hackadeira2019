var foodBowlPercent = "0";
var updateBowlsTimerSeconds = 2;

$(document).ready(function () {

    $("#sendWater").click(function () {
        sendWater();
    });

    $("#sendFood").click(function () {
        sendFood();
    });

    updateBowlsUI();

});

function sendWater() {
    sendMessageActuator("water");
}

function sendFood() {
    sendMessageActuator("food");
}

function setFoodBowlPercent(value) {
    foodBowlPercent = value;
}

function updateBowlsUI() {
    retrieveBowlsPercent();
    setProgressBarValues();
    setTimeout(function () {
        updateBowlsUI();
    }, updateBowlsTimerSeconds * 1000);
}

function setProgressBarValues() {
    var waterValue = "10%";
    var foodPercent = foodBowlPercent + "%";
    $('#waterProgressBar').width(waterValue);
    $("#waterPercentualText").text(waterValue);

    $('#foodProgressBar').width(foodPercent);
    $("#foodPercentualText").text(foodPercent);

}