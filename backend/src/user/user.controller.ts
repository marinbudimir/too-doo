import { Controller, Post, Body} from '@nestjs/common';
import { UserService } from '@user/user.service';
import { RegisterUserDto } from '@user/dto/register-user.dto';
import { LoginUserDto } from '@user/dto/login-user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('register')
    public async register(@Body() createUserDto: RegisterUserDto): Promise<any> {
        return await this.userService.register(createUserDto);
    }

    @Post('login')
    public async login(@Body() loginUserDto: LoginUserDto): Promise<any>{
        return await this.userService.login(loginUserDto);
    }
}
