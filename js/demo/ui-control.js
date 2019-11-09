var mqtt;
var reconnectTimeout = 2000;
var host = "broker.hivemq.com";
var port = 8000;

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
  
    MQTTconnect();

}

function onConnect() {
    
    message = new Paho.MQTT.Message("Hello World");
    message.destinationName = "gsf4-servo";
    console.log("connected");
    mqtt.send(message);
}

function MQTTconnect() {
    console.log('...');
    mqtt = new Paho.MQTT.Client(host, port, "clientjs");

    var options = { timeout: 3, onSuccess: onConnect, };

    mqtt.connect(options);
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