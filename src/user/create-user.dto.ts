import { IsNotEmpty } from 'class-validator';
import { AuthDTO } from 'src/auth/auth.dto';

export class CreateUserDTO extends AuthDTO {
    @IsNotEmpty()
    name: string;
}