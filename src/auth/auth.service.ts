import { InjectQueue } from '@nestjs/bull';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync, hashSync } from 'bcrypt';
import { Queue } from 'bull';
import { Users } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { MAIL_QUEUE, SEND_MAIL } from 'src/utils/constants';
import { AuthDTO } from './auth.dto';
import { RegistrationResponse } from './registrationResponse.interface';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,

        @InjectQueue(MAIL_QUEUE)
        private readonly mailQueue: Queue,
    ) {}

    async register({ email, password }: AuthDTO): Promise<RegistrationResponse> {
        const sanitizedEmail = email.trim();
        const sanitizedPassword = password.trim();

        if(!this.validateEmail(sanitizedEmail)) throw new BadRequestException('Invalid email.');

        if(sanitizedPassword.length < 8)
            throw new BadRequestException('Password must not be shorter than 8 characters.');

        if(!this.validatePassword(sanitizedPassword)) {
            throw new BadRequestException(
                'Password must contain at least one each of an uppercase letter, a lowercase letter, a numeric digit, and a special character.'
            );
        }

        if(await this.userService.findOne({ email: sanitizedEmail }))
            throw new BadRequestException('User already exists.');

        const user = await this.userService.createUser({
            name: this.extractNameFromEmail(sanitizedEmail),
            email,
            password: hashSync(sanitizedPassword, 10),
        });

        delete user.password;

        try {
            await this.mailQueue.add(SEND_MAIL, {
                receiver: email.toLowerCase(),
                subject: 'Welcome to Twitee',
                template: 'new-user',
                name: user.name,
                message: `
                <p class="email-content">
                Thanks for signing up on Twitee.
              </p>
    
              <br />
    
              <p class="email-content">
                Start Posting.
              </p>
              <br />`,
            });
        } catch (error) {
            console.log(error);
        }

        return {
            user,
            token: this.jwtService.sign({ sub: user.id }),
        }
    }

    async login({ email, password }: AuthDTO) {
        const sanitizedEmail = email.trim();
        const sanitizedPassword = password.trim();

        const user: Users = await this.userService.findOneForLogin(sanitizedEmail);

        if(user && compareSync(sanitizedPassword, user.password))
            return { token: this.jwtService.sign({ sub: user.id })};
        else throw new BadRequestException('Invalid login credentials.');
    }

    validateEmail(email: string) {
        const emailRegex =
            /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b/;

        return emailRegex.test(email);
    }

    validatePassword(password: string) {
        const validPassword = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        console.log(validPassword.test(password));
        return validPassword.test(password);
    }

    extractNameFromEmail(email: string) {
        const username = email.split('@')[0];
        return username[0].toUpperCase() + username.slice(1);
    }
}
