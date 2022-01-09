import { IsNotEmpty } from 'class-validator';

export class LikePostDTO {
    @IsNotEmpty()
    postId: string;
}
