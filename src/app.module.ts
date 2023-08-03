import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import DatabaseConfigOptions from './database/database.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(DatabaseConfigOptions),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
