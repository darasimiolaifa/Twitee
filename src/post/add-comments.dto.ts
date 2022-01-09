import { IsNotEmpty } from 'class-validator';

export class AddCommentToPostDTO {
    @IsNotEmpty()
    comment: string;
}
