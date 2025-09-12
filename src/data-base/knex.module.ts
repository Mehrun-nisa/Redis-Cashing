import { Module } from '@nestjs/common';
import { knexProvider } from './knex.providers';

@Module({
  providers: [...knexProvider],
  exports: [...knexProvider], 
})
export class KnexModule {}