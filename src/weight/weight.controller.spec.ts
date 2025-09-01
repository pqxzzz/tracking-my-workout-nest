import { Test, TestingModule } from '@nestjs/testing';
import { WeightController } from './weight.controller';
import { WeightService } from './weight.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Weight } from './entities/weight.entity';
import { User } from 'src/users/user.entity';

describe('WeightController', () => {
  let controller: WeightController;

  //mock do repositorio de Weight
  const mockWeightRepo = {
    find: jest.fn().mockResolvedValue([
      { id: 1, weight: 70, createdAt: new Date('2025-08-21') },
      { id: 1, weight: 70, createdAt: new Date('2025-08-21') },
    ]),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  // mock do respo de user
  const mockUserRepo = {
    findOneBy: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeightController],
      providers: [
        WeightService,
        {
          provide: getRepositoryToken(Weight),
          useValue: mockWeightRepo,
        },
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepo,
        },
      ],
    }).compile();

    controller = module.get<WeightController>(WeightController);
  });

  it('GET:deve retornar a lista de pesos do usuario', async () => {
    const fakeRequest = { user: { sub: 'user123' } };

    const result = await controller.getUsersWeights(fakeRequest);

    expect(result).toHaveLength(2);

    // Verifica se o find foi chamado com os parametros corretos
    expect(mockWeightRepo.find).toHaveBeenCalledWith({
      where: { user: { id: 'user123' } },
      order: { createdAt: 'DESC' },
    });
  });

  it('POST: deve criar um novo registro de weight', async () => {
    const fakeRequest = { user: { sub: 'user123' } };
    const createWeightDto = { weight: 82 };

    //mocks para simular service
    mockUserRepo.findOneBy.mockResolvedValue({ id: 'user123' });
    mockWeightRepo.findOne.mockResolvedValue(null);
    mockWeightRepo.create.mockReturnValue({
      ...createWeightDto,
      user: { id: 'user123' },
    });
    mockWeightRepo.save.mockResolvedValue({
      id: 3,
      ...createWeightDto,
      user: { id: 'user123' },
    });

    const result = await controller.create(createWeightDto, fakeRequest);
    expect(result.weight).toBe(82);
    expect(mockWeightRepo.save).toHaveBeenCalled();
  });
});
