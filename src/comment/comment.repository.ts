import { Injectable } from '@nestjs/common';
import { AddCommentToPostDTO } from 'src/post/add-comments.dto';
import { Posts } from 'src/post/posts.entity';
import { Users } from 'src/user/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import * as uuid from 'uuid';
import { Comments } from '../comment/comment.entity';

@Injectable()
@EntityRepository(Comments)
export class CommentRepository extends Repository<Comments> {
    async addCommentToPost(addCommentToPost: AddCommentToPostDTO, post: Posts, user: Users) {
        const newComment = new Comments();

        newComment.id = uuid.v4();
        newComment.comment = addCommentToPost.comment;
        newComment.created_at = new Date();
        newComment.user = user;
        newComment.post = post;

        return await this.save(newComment);
    }

    async deletePostComments(comments: Comments[]) {
        return await this.remove(comments);
    }
}