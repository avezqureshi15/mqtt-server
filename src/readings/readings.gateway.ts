import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Injectable } from '@nestjs/common';
import { MqttService } from '../mqtt/mqtt.service';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
@WebSocketGateway({
  cors: {
    origin: 'http://localhost:5173', // Ensure this matches your frontend URL
  },
})
export class ReadingsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly mqttService: MqttService,
    private readonly prisma: PrismaService,
  ) { }

  afterInit(server: Server) {
    console.log('WebSocket Gateway Initialized');
  }

  handleConnection(client: Socket) {
    console.log('Client connected:', client.id);
    client.emit('connectionStatus', 'Connected to server'); // Notify client of successful connection
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);
  }

  @SubscribeMessage('subscribeToReadings')
  async handleSubscribeToReadings(client: Socket, deviceId: number) {
    console.log('Client subscribed to readings for device:', deviceId);

    // Check if the device exists
    try {
      const device = await this.prisma.device.findUnique({
        where: { id: deviceId },
      });

      if (!device) {
        console.error(`Device with id ${deviceId} does not exist.`);
        client.emit('error', `Device with id ${deviceId} does not exist.`);
        return;
      }

      this.mqttService.getClient().on('message', async (topic: string, message: Buffer) => {
        if (topic === 'energy_meter_readings') {
          const data = JSON.parse(message.toString());

          // Assuming data is an array of arrays
          const readings = data.flat();

          console.log('Received readings:', readings);

          for (const reading of readings) {
            if (reading.deviceId === deviceId) {
              console.log('Sending reading to client:', reading);
              client.emit('energy_meter', reading);

              // Save the reading to the database
              try {
                await this.prisma.energyMeterReading.create({
                  data: {
                    deviceId: reading.deviceId,
                    voltageR: reading.voltageR ?? 0,
                    voltageY: reading.voltageY ?? 0,
                    voltageB: reading.voltageB ?? 0,
                    currentR: reading.currentR ?? 0,
                    currentY: reading.currentY ?? 0,
                    currentB: reading.currentB ?? 0,
                    powerFactor: reading.powerFactor ?? 1.0,
                    frequency: reading.frequency ?? 50.0,
                    power: reading.power ?? 0,
                    powerConsumption: reading.powerConsumption ?? 0,
                    kiloVoltAmpere: reading.kiloVoltAmpere ?? 0,
                    kiloVoltAmpereReactive: reading.kiloVoltAmpereReactive ?? 0,
                    kiloVoltAmpereHour: reading.kiloVoltAmpereHour ?? 0,
                    status: reading.status ?? 0,
                    createdAt: new Date(),
                  },
                });
                console.log('Reading saved successfully');
              } catch (error) {
                console.error('Error saving reading:', error);
              }
            }
          }
        }
      });
    } catch (error) {
      console.error('Error handling device subscription:', error);
      client.emit('error', 'Error handling device subscription');
    }
  }
}
