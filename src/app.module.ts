import { Module } from '@nestjs/common';
import { ReadingsModule } from './readings/readings.module';
import { MqttModule } from './mqtt/mqtt.module';

@Module({
  imports: [ReadingsModule, MqttModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
