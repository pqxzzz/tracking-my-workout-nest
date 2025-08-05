import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
import { typeOrmConfig } from './config/typeorm.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const dataSource = new DataSource(typeOrmConfig);

  app.enableCors({
    origin: 'http://localhost:3001', // ou "*", se estiver testando
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    credentials: true,
  });

  try {
    await dataSource.initialize();
    console.log('✅ Connected to the database!');
  } catch (error) {
    console.error('❌ Failed to connect to the database:', error);
  }

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
