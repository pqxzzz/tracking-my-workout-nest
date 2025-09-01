import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const dataSource = new DataSource(typeOrmConfig);

  app.enableCors({
    origin: 'http://localhost:3001', // ou "*", se estiver testando
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    credentials: true,
  });

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // app.useGlobalPipes(          // VALIDA O DTO ANTES QUE CHEGUE NA CONTROLLER
  //   new ValidationPipe({
  //     whitelist: true, //remove extra fields
  //     forbidNonWhitelisted: true, // lanca erro se houver campos extras,
  //   }),
  // );

  try {
    await dataSource.initialize();
    console.log('✅ Connected to the database!');
  } catch (error) {
    console.error('❌ Failed to connect to the database:', error);
  }

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
