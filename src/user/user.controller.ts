import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    @UseGuards(LocalAuthGuard)
    async fetchUser(@Request() { user }) {
        return user;
    }

}
