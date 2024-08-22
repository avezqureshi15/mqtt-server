import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { connect, MqttClient } from 'mqtt';

@Injectable()
export class MqttService implements OnModuleInit, OnModuleDestroy {
    private client: MqttClient;

    onModuleInit() {
        this.client = connect('mqtt://172.232.106.61'); // Use the specified MQTT broker URL

        this.client.on('connect', () => {
            console.log('Connected to MQTT broker');
            this.client.subscribe('energy_meter_readings', (err) => {
                if (err) {
                    console.error('Failed to subscribe to topic:', err);
                }
            });
        });

        this.client.on('message', (topic: string, message: Buffer) => {
            console.log('Message received:', topic, message.toString());
        });
    }

    onModuleDestroy() {
        this.client.end();
    }

    getClient() {
        return this.client;
    }
}
