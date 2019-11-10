var foodBowlPercent = "0";

$(document).ready(function () {

    $("#sendWater").click(function () {
        sendWater();
    });

    $("#sendFood").click(function () {
        sendFood();
    });
    //updateBowlsUI();
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
    }, 1000);
}

function setProgressBarValues() {
    var waterValue = "10%";

    $('#waterProgressBar').width(waterValue);
    $("#waterPercentualText").text(waterValue);

    $('#foodProgressBar').width(foodBowlPercent);
    $("#foodPercentualText").text(foodBowlPercent);

}