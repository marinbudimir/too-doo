import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from '@user/dto/user.dto';
import { UserEntity } from '@user/user.entity';
import { toUserDto } from '@shared/mapper';
import { LoginUserDto } from '@user/dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { RegisterUserDto } from '@user/dto/register-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
    constructor(
        private readonly jwtService: JwtService,
        @InjectRepository(UserEntity)
        private readonly userRepo: Repository<UserEntity>
    ) {}

    async findOne(options?: object): Promise<UserDto> {
        const user = await this.userRepo.findOne(options);
        if(!user) {
            throw new HttpException("User doesn't exist", HttpStatus.BAD_REQUEST);
        }
        return toUserDto(user);
    }

    async register(userDto: RegisterUserDto): Promise<UserDto> {
        const { name, email, password } = userDto;
        const userAlreadyExist = await this.userRepo.findOne({ where: { email } });
        if (userAlreadyExist) {
            throw new HttpException("User already exists", HttpStatus.BAD_REQUEST);
        }

        const user: UserEntity = this.userRepo.create({ name, email, password });
        await this.userRepo.save(user);
    
        return toUserDto(user);
    }

    async login(loginUserDto: LoginUserDto): Promise<any> {
        const { email, password} = loginUserDto;
        const user = await this.userRepo.findOne({ where: { email } });
        if (!user) {
            throw new HttpException("You have entered an invalid email address or password", HttpStatus.UNAUTHORIZED);
        }
        
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            throw new HttpException("You have entered an invalid email address or password", HttpStatus.UNAUTHORIZED);
        }

        const payload = { email: user.email };
        return {
            token: this.jwtService.sign(payload)
        }
    }

    async validate(email: any): Promise<UserDto> {
        const user = await this.userRepo.findOne({ where: { email } });
        if (!user) {
            throw new HttpException("Authentification failed", HttpStatus.UNAUTHORIZED);
        }
        return user;
    }
}
