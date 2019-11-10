var mqtt;
var reconnectTimeout = 2;
var host = "broker.hivemq.com";
var port = 443;

var sslFlag = true;

// Actuators
var actuatorFoodTopic = "gsf4-servo";
var actuatorWaterTopic = "gsf4-water_pump";
var currentActuatorTopic = "";

// Sensors
var sensorWaterTopic = "gsf4-water_pot";
var sensorFoodTopic = "lps6-press";

function retrieveBowlsPercent() {
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
    mqtt.subscribe(sensorFoodTopic);
}

function onFailureSensor(message) {
    console.log("Falhou, reconectando...");
    setTimeout(mqttConnectSensor, reconnectTimeout * 1000);
}

function onMessageArrived(msg) {
    setFoodBowlPercent(msg.payloadString);
}