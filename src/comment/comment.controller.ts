import { Controller, Post, Body, Request, UseGuards, UsePipes, ValidationPipe, Param } from '@nestjs/common';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { AddCommentToPostDTO } from 'src/post/add-comments.dto';
import { CommentService } from './comment.service';

@Controller('comment')
export class CommentController {
    constructor(private readonly commentService: CommentService) {}

    @UseGuards(LocalAuthGuard)
    @Post('/:postId/create')
    @UsePipes(ValidationPipe)
    async commentOnPost(
        @Body() commentOnPost: AddCommentToPostDTO,
        @Request() { user },
        @Param() { postId },
    ) {
        return this.commentService.commentOnPost(commentOnPost, postId, user);
    }
}
