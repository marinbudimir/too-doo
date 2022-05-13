import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserController } from './user.controller';
import { JwtStrategy } from './jwt.strategy';
import 'dotenv/config';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity],),
        PassportModule.register({
            defaultStrategy: 'jwt',
        }),
        JwtModule.register({
            secret: process.env.JWT_SECRET_KEY,
            signOptions: {
                expiresIn: "2h"
            }
        })
    ],
    providers: [UserService, JwtStrategy],
    exports: [PassportModule, UserService, JwtModule],
    controllers: [UserController]
})
export class UserModule {}
