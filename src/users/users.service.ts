import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { hashPassword } from '../common/helpers/hash.helper';

@Injectable()
export class UsersService {
  // constructor é uma função que é chamada quando a classe é instanciada
  // e é usada para injetar dependências
  // @InjectRepository é um decorator que injeta o repositório do TypeORM
  // Repository é uma classe que representa um repositório de entidades
  // User é a entidade que representa o usuário
  // private usersRepo é uma propriedade que representa o repositório de usuários
  // e é usada para fazer operações no banco de dados
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
  ) {}

  async create(email: string, plainPassword: string): Promise<User> {
    const hashed = await hashPassword(plainPassword);
    const user = this.usersRepo.create({ email, password: hashed });
    return this.usersRepo.save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepo.findOne({ where: { email } });
  }
}
