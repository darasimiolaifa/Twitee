import { IsNotEmpty } from 'class-validator';

export class CreatePostDTO {
    @IsNotEmpty()
    post: string;
}
