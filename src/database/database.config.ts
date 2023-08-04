import { DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const DatabaseConfigOptions: DataSourceOptions = {
  type: 'mssql',
  host: 'db',
  entities: ['dist/database/entities/*.entity.js'],
  synchronize: true,
  migrations: ['dist/database/migrations/*.js'],
  migrationsTableName: 'migrations',
  port: 1433,
  username: process.env.MSSQL_USERNAME,
  password: process.env.MSSQL_SA_PASSWORD,
  options: {
    trustServerCertificate: true,
  },
};

export default DatabaseConfigOptions;
