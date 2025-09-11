// redis.module.ts
import { Global, Module } from '@nestjs/common';
import Redis from 'ioredis';
import { RedisService } from './redis.service';
import { RedisController } from './redis.controller';
import { SequelizeDatabaseModule } from 'src/data-base/sequelize.module';

@Global() // makes Redis available across the app without re-import
@Module({
  imports: [SequelizeDatabaseModule],
  controllers: [RedisController],
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useFactory: () => {
        return new Redis({
          host: 'localhost',
          port: 6379,
        });
      },
    },
    RedisService,
  ],
  exports: ['REDIS_CLIENT'],
})
export class RedisModule {}
