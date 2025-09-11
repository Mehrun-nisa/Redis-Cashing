import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/redis/user.model';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456789',
      database: 'redis_demo',
      autoLoadModels: true,
      synchronize: true,
      models: [User],
    }),
    SequelizeModule.forFeature([User]), 
  ],
  exports: [SequelizeModule],
})
export class SequelizeDatabaseModule {}
