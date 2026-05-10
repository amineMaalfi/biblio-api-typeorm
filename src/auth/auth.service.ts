import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import type { LoginDto } from './dto/login.dto';
import type { RegisterDto } from './dto/register.dto';
import type { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  async register(dto: RegisterDto) {
    const email = dto.email.toLowerCase();
    const existing = await this.usersService.findByEmail(email);
    if (existing) {
      throw new ConflictException('Email already registered');
    }
    const passwordHash = await bcrypt.hash(dto.password, 10);
    const librarianEnv = this.config.get<string>('LIBRARIAN_REGISTRATION_SECRET');
    const isLibrarian = Boolean(
      librarianEnv &&
        dto.librarianSecret &&
        dto.librarianSecret === librarianEnv,
    );
    const user = await this.usersService.create({
      fullName: dto.fullName,
      email,
      password: passwordHash,
      isLibrarian,
    });
    return this.issueToken(user.id);
  }

  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email.toLowerCase());
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const ok = await bcrypt.compare(dto.password, user.password);
    if (!ok) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.issueToken(user.id);
  }

  private issueToken(userId: number) {
    const payload: JwtPayload = { sub: userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
