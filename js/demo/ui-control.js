var foodBowlPercent = "0";
var waterBowlPercent = "0";
var updateBowlsTimerSeconds = 5;
var flag = true;

$(document).ready(function () {

    $("#sendWaterButton").click(function () {
        sendWater();
        showButtonsLoading();
    });

    $("#sendFoodButton").click(function () {
        sendFood();
        showButtonsLoading();
    });

    updateBowlsUI();

});

function showButtonsLoading() {
    $(".loading").show();
    $(".actuatorsButtons").hide();
    $(".actuatorsButtons").hide();
}

function showAlertDanger() {
    $(".alert-danger").show();
    $(".actuatorsButtons").hide();
    //$(".actuatorsButtons").hide();
}

function showAlertSuccess() {
    $(".alert-danger").show();
    //$(".actuatorsButtons").hide();
}

function hideButtonsLoading() {
    $(".loading").hide();
    $(".actuatorsButtons").show();
}

function hideSendButtons() {
    $(".sendFoodButton").show();
}

function sendWater() {
    sendMessageActuator("water");
}

function sendFood() {
    sendMessageActuator("food");
}

function setFoodBowlPercent(value) {
    //console.log("Food: " + value);
    foodBowlPercent = value;
}

function setWaterBowlPercent(value) {
    //console.log("Water: " + value);
    waterBowlPercent = value;
}

function updateBowlsUI() {

    if (flag) {
        retrieveBowlsPercent("water");
    } else {
        retrieveBowlsPercent("food");
    }

    flag = !flag;

    setProgressBarValues();
    setTimeout(function () {
        updateBowlsUI();
    }, updateBowlsTimerSeconds * 1000);
}

function setProgressBarValues() {

    var waterValue = parseFloat(waterBowlPercent).toFixed(2) + "%";
    var foodPercent = parseFloat(foodBowlPercent).toFixed(2) + "%";

    $('#waterProgressBar').width(waterValue);
    $("#waterPercentualText").text(waterValue);

    $('#foodProgressBar').width(foodPercent);
    $("#foodPercentualText").text(foodPercent);

}