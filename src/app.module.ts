import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisModule } from './redis/redis.module';
import { SequelizeDatabaseModule } from './data-base/sequelize.module';

@Module({
  imports: [SequelizeDatabaseModule,RedisModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
