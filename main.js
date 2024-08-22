const mqtt = require('mqtt');
const WebSocket = require('ws');

// MQTT configuration
const mqttUrl = 'mqtt://192.168.250.200:1883';
const mqttTopic = 'energy_meter_readings'; // Replace with your topic

// WebSocket configuration
const wsPort = 8800; // Port for WebSocket server

// Create MQTT client
const mqttClient = mqtt.connect(mqttUrl);

// Create WebSocket server
const wss = new WebSocket.Server({ port: wsPort });

// Handle MQTT client connection
mqttClient.on('connect', () => {
    console.log('Connected to MQTT broker');
    mqttClient.subscribe(mqttTopic, (err) => {
        if (err) {
            console.error(`Failed to subscribe to topic ${mqttTopic}`, err);
        } else {
            console.log(`Subscribed to ${mqttTopic}`);
        }
    });
});

// Handle MQTT messages
mqttClient.on('message', (topic, message) => {
    if (topic === mqttTopic) {
        console.log(`Message received on topic ${topic}: ${message.toString()}`);
        // Broadcast message to all connected WebSocket clients with event name 'reading'
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({
                    event: 'reading',
                    data: message.toString()
                }));
            }
        });
    }
});

// Handle WebSocket connections
wss.on('connection', (ws) => {
    console.log('WebSocket client connected');

    ws.on('message', (message) => {
        console.log('Received from client:', message);
    });

    ws.on('close', () => {
        console.log('WebSocket client disconnected');
    });

    ws.on('error', (error) => {
        console.error('WebSocket error:', error);
    });
});

console.log(`WebSocket server listening on ws://localhost:${wsPort}`);
