import { IsNotEmpty } from 'class-validator';

export class AuthDTO {
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;
}
