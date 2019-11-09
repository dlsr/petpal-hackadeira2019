$(document).ready(function () {

    $("#sendWater").click(function () {
        sendWater();
    });

    $("#sendFood").click(function () {
        sendFood();
    });

    updateBowls();

});

function sendWater() {
    //$('#waterProgressBar').width("50%");
}

function sendFood() {
    //alert('button clicked');
}

function updateBowls() {
    var waterValue = "10%";
    var foodValue = "70%";

    $("#waterPercentualText").text(waterValue);
    $('#waterProgressBar').width(waterValue);

    $('#foodProgressBar').width(foodValue);
    $("#foodPercentualText").text(foodValue);

}