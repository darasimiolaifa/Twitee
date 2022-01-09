import { Injectable } from '@nestjs/common';
import { Posts } from 'src/post/posts.entity';
import { Users } from 'src/user/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreatePostDTO } from './create-post.dto';
import * as uuid from 'uuid';

@Injectable()
@EntityRepository(Posts)
export class PostRepository extends Repository<Posts> {
    async createPost(createPostDTO: CreatePostDTO, user: Users) {
        const newPost = new Posts();

        newPost.id = uuid.v4();
        newPost.post = createPostDTO.post.trim();
        newPost.created_at = new Date();
        newPost.user = user;

        return await this.save(newPost);
    }

    async fetchPosts() {
        return await this.find({
            relations:['user', 'likes', 'likes.user', 'comments', 'comments.user']
        });
    }

    async fetchSinglePost(id: string) {
        return await this.findOne(
            { id },
            { relations:['user', 'likes', 'likes.user', 'comments', 'comments.user']
        });
    }

    async deletePost(postId: string) {
        return await this.delete({ id: postId });
    }
}