var mqtt;
var reconnectTimeout = 2;
var host = "broker.hivemq.com";
var port = 8000;

var sslFlag = false;

// Actuators
var actuatorFoodTopic = "gsf4-servo";
var actuatorWaterTopic = "gsf4-water_pump";
var currentActuatorTopic = "";

// Sensors
var sensorWaterTopic = "gsf4-water_pot";
var sensorFoodTopic = "lps6-press";
var currentType = "";

function retrieveBowlsPercent(type) {
    //console.log(type);
    if (type == "food") {
        currentType = sensorFoodTopic;
    } else {
        currentType = sensorWaterTopic;
    }

    mqttConnectSensor();
}

function sendMessageActuator(topic) {
    currentActuatorTopic = topic == "food" ? actuatorFoodTopic : actuatorWaterTopic;
    mqttConnectActuator();
}

function mqttConnectActuator() {
    mqtt = new Paho.MQTT.Client(host, port, "clientjs");
    var options = { useSSL: sslFlag, timeout: 3, onSuccess: onConnectActuator };
    mqtt.connect(options);
}

function onConnectActuator() {
    message = new Paho.MQTT.Message("Hello World");
    message.destinationName = currentActuatorTopic;
    console.log("Connected Actuator: " + currentActuatorTopic);
    //hideButtonsLoading();
    mqtt.send(message);
}

function mqttConnectSensor() {
    mqtt = new Paho.MQTT.Client(host, port, "clientjs");
    var options = { useSSL: sslFlag, timeout: 3, onSuccess: onConnectSensor, onFailure: onFailureSensor };
    mqtt.onMessageArrived = onMessageArrived;
    mqtt.connect(options);
}

function onConnectSensor() {
    message = new Paho.MQTT.Message("Hello World");
    console.log("Connected Sensor");
    hideButtonsLoading();
    mqtt.subscribe(currentType);
}

function onFailureSensor(message) {

    //alert("Falhou");
    //showAlertDanger();
    console.log("Restabelecendo conexão...");
    setTimeout(mqttConnectSensor, reconnectTimeout * 1000);
}

function onMessageArrived(msg) {
    //console.log(currentType);
    if (currentType == sensorFoodTopic) {
        setFoodBowlPercent(msg.payloadString);
    } else {
        setWaterBowlPercent(msg.payloadString);
    }
}