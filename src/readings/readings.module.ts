import { Module } from '@nestjs/common';
import { ReadingsGateway } from './readings.gateway';
import { MqttModule } from 'src/mqtt/mqtt.module';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [MqttModule, PrismaModule],
  providers: [ReadingsGateway]
})
export class ReadingsModule { }
