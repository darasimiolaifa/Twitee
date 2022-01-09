import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthDTO } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/register')
    @UsePipes(ValidationPipe)
    async register(@Body() authDTO: AuthDTO) {
        return await this.authService.register(authDTO);
    }

    @Post('/login')
    @UsePipes(ValidationPipe)
    async login(@Body() authDTO: AuthDTO) {
        return await this.authService.login(authDTO);
    }
}
