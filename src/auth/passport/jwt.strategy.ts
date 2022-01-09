import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly userService: UserService,
        private readonly configService: ConfigService,    
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
            secretOrKey: configService.get<string>('app.secret'),
        });
    }

    async validate(payload: any) {
        const user = await this.userService.findUserById(payload.sub);

        if (!user) {
			throw new UnauthorizedException({
				message: 'You are not authorized to make this action',
				status: HttpStatus.UNAUTHORIZED,
			});
		}

        return user;
    }
}