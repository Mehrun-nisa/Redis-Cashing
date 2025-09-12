import { Controller, Get } from '@nestjs/common';
import { RedisService } from './redis.service';

@Controller('redis')
export class RedisController {

    constructor(private readonly redisService: RedisService) { }
    @Get('redis-user-seq')
    async getUsersBySeq(){
        return this.redisService.getRedisUsersBySeq();
    }

    @Get('redis-user-knex')
    async getUsersByKnex(){
        return this.redisService.getRedisUsersByKnex();
    }

}
