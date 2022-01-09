import { Injectable } from '@nestjs/common';
import { Users } from 'src/user/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import * as uuid from 'uuid';
import { LikePostDTO } from './like-post.dto';
import { Likes } from './like.entity';
import { Posts } from './posts.entity';

@Injectable()
@EntityRepository(Likes)
export class LikeRepository extends Repository<Likes> {
    async likePost(post: Posts, user: Users) {
        const newLike = new Likes();

        newLike.id = uuid.v4();
        newLike.user = user;
        newLike.created_at = new Date();
        newLike.post = post;

        await this.save(newLike);

        return await this.findOne({ id: newLike.id }, { relations: ['user']});
    }

    async unlikePost(likeId: string) {
        return await this.delete({ id: likeId });
    }
}