import * as request from 'supertest'; // 1. Importa o supertest para simular requisições HTTP
import { Test, TestingModule } from '@nestjs/testing'; // 2. Utilitários do NestJS para criar o app de teste
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../src/app.module'; // 3. Importa o módulo principal da aplicação
import { DataSource } from 'typeorm';

describe('Users (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;

  beforeAll(async () => {
    // 4. Cria o módulo de teste e inicializa o app
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe()); // 5. Usa validação global igual ao app real
    await app.init();
    dataSource = app.get(DataSource); // 1. Get the TypeORM DataSource instance
  });

  beforeEach(async () => {
    // 2. Clean the users table before each test
    await dataSource.getRepository('User').clear();
  });

  afterAll(async () => {
    // 6. Fecha o app após os testes
    await app.close();
  });

  it('should register a new user', async () => {
    // 1. Defines the new user's data
    const userData = {
      email: 'test@example.com',
      password: 'securePassword123',
    };

    // 2. Sends a POST request to /users/register
    const response = await request(app.getHttpServer())
      .post('/users/register')
      .send(userData)
      .expect(201); // 3. Expects status 201 (Created)

    // 4. Checks if the response body contains the expected fields
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('email', userData.email);
    expect(response.body).toHaveProperty('isEmailConfirmed', false);
    expect(response.body).toHaveProperty('confirmationToken');
  });

  it('deve confirmar o email do usuário', async () => {
    // 1. Registra um novo usuário e pega o token
    const userData = {
      email: 'confirmar@example.com',
      password: 'senhaSegura123',
    };
    const registerRes = await request(app.getHttpServer())
      .post('/users/register')
      .send(userData)
      .expect(201);

    const token = registerRes.body.confirmationToken;

    // 2. Faz a requisição POST para /users/confirm-email com o token
    const confirmRes = await request(app.getHttpServer())
      .post('/users/confirm-email')
      .send({ token })
      .expect(201);

    // 3. Verifica a mensagem de sucesso
    expect(confirmRes.body).toHaveProperty(
      'message',
      'Email confirmed successfully',
    );
  });

  it('deve fazer login e retornar um JWT', async () => {
    // 1. Registra e confirma o usuário
    const userData = {
      email: 'login@example.com',
      password: 'senhaSegura123',
    };
    const registerRes = await request(app.getHttpServer())
      .post('/users/register')
      .send(userData)
      .expect(201);

    const token = registerRes.body.confirmationToken;

    await request(app.getHttpServer())
      .post('/users/confirm-email')
      .send({ token })
      .expect(201);

    // 2. Faz login
    const loginRes = await request(app.getHttpServer())
      .post('/auth/login')
      .send(userData)
      .expect(201);

    // 3. Verifica se o token JWT foi retornado
    expect(loginRes.body).toHaveProperty('access_token');
    expect(typeof loginRes.body.access_token).toBe('string');
  });
});
