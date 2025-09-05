import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const typeOrmConfig: DataSourceOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: false,
  ssl: {
	  rejectUnauthorized: false,
  },
  migrationsRun: true,
  migrations: [__dirname + '/../migrations/*.{js,ts}'],
  logging: true,
};

// THIS is what TypeORM CLI expects:
export default new DataSource(typeOrmConfig);
