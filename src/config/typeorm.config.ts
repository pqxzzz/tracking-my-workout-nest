import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';

export const typeOrmConfig: DataSourceOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: false,
  ssl: isProduction
    ? { rejectUnauthorized: false } // só ativa SSL no RDS
    : false, // desativa SSL no local
  migrationsRun: true,
  migrations: [__dirname + '/../migrations/*.{js,ts}'],
  logging: true,
};

// THIS is what TypeORM CLI expects:
export default new DataSource(typeOrmConfig);
