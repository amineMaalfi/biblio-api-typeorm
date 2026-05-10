import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

export type CreateUserInput = {
  fullName: string;
  email: string;
  password: string;
  isLibrarian?: boolean;
};

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly users: Repository<User>,
  ) {}

  findByEmail(email: string): Promise<User | null> {
    return this.users.findOne({ where: { email: email.toLowerCase() } });
  }

  findById(id: number): Promise<User | null> {
    return this.users.findOne({ where: { id } });
  }

  countLibrarians(): Promise<number> {
    return this.users.count({ where: { isLibrarian: true } });
  }

  async create(data: CreateUserInput): Promise<User> {
    const user = this.users.create({
      fullName: data.fullName,
      email: data.email.toLowerCase(),
      password: data.password,
      isLibrarian: data.isLibrarian ?? false,
    });
    return this.users.save(user);
  }
}
