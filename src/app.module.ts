import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import DatabaseConfigOptions from './database/database.config';
import { SeederModule } from './database/seeders/seeder.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(DatabaseConfigOptions),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    SeederModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
