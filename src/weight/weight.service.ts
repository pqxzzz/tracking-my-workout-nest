import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateWeightDto } from './dto/create-weight.dto';
import { UpdateWeightDto } from './dto/update-weight.dto';
import { Weight } from './entities/weight.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';

@Injectable()
export class WeightService {
  constructor(
    @InjectRepository(Weight)
    private weightRepo: Repository<Weight>,

    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async create(createWeightDto: CreateWeightDto, userId: string) {
    // TODO: Criar regra que nao permite criar 2 weights em menos de 24h
    const user = await this.userRepo.findOneBy({ id: userId });

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    const weight = this.weightRepo.create({
      ...createWeightDto,
      user,
    });

    return this.weightRepo.save(weight);
  }

  findAll() {
    return `This action returns all weight`;
  }

  async findUserWeights(UserId: string) {
    const userWeights = this.weightRepo.find({
      where: { user: { id: UserId } },
      order: { createdAt: 'DESC' },
    });

    return userWeights;
  }

  update(id: number, updateWeightDto: UpdateWeightDto) {
    return `This action updates a #${id} weight`;
  }

  remove(id: number) {
    return `This action removes a #${id} weight`;
  }
}
