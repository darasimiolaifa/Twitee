import { BadRequestException, Injectable } from '@nestjs/common';
import { AddCommentToPostDTO } from 'src/post/add-comments.dto';
import { PostRepository } from 'src/post/post.repository';
import { Users } from 'src/user/user.entity';
import { Connection } from 'typeorm';
import { Comments } from './comment.entity';
import { CommentRepository } from './comment.repository';

@Injectable()
export class CommentService {

    private readonly commentRepository: CommentRepository;
    private readonly postRepository: PostRepository;
    
    constructor(private readonly connection: Connection) {
        this.commentRepository = this.connection.getCustomRepository(CommentRepository);
        this.postRepository = this.connection.getCustomRepository(PostRepository);
    }

    async commentOnPost(addCommentToPost: AddCommentToPostDTO, postId: string, user: Users) {
        const existingPost = await this.postRepository.findOne({ id: postId });
        if(!existingPost)
            throw new BadRequestException('Post does not exist.');

        const newComment = await this.commentRepository.addCommentToPost(addCommentToPost, existingPost, user);

        return newComment;
    }

    async deletePostComments(comments: Comments[]) {
        return await this.commentRepository.deletePostComments(comments);
    }

    async findAllCommentsByCondition(condition: Record<string, unknown>) {
        if(Object.keys(condition).length > 0)
            return await this.commentRepository.find(condition);
        else return await this.commentRepository.find();
    }
}
