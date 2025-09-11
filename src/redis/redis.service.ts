import Redis from 'ioredis';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Knex } from 'knex';
import { User } from './user.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class RedisService {
    private readonly logger = new Logger(RedisService.name);
    constructor(
        @Inject('REDIS_CLIENT') private readonly redis: Redis,
        @InjectModel(User) private userModel: typeof User,
        // @Inject('KNEX_CONNECTION') private knex: Knex,

) {}

    async getRedisUsers() {
        const users = await this.redis.get('users');
        if (users) {
            return users
        } else {
            this.logger.log('Cache miss - fetching from database');
            const dbUsers = await this.userModel.findAll();
            this.logger.log(`Fecthed Data :: ${JSON.stringify(dbUsers)}`);

            // 3. Store in Redis
             await this.redis.set('users', JSON.stringify(dbUsers), 'EX', 30);
            this.logger.log('📦 Users cached in Redis for 30s');
            return dbUsers;
        }
    }
    // async findUsers() {
    //     return this.knex.select('*').from('users');
    // }
}
