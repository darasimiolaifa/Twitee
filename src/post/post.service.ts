import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CommentService } from 'src/comment/comment.service';
import { Users } from 'src/user/user.entity';
import { Connection } from 'typeorm';
import { CreatePostDTO } from './create-post.dto';
import { LikePostDTO } from './like-post.dto';
import { LikeRepository } from './like.repository';
import { PostRepository } from './post.repository';

@Injectable()
export class PostService {
    private readonly postRepository: PostRepository;
    private readonly likeRepository: LikeRepository;
    
    constructor(
        private readonly connection: Connection,
        private readonly commentService: CommentService,
    ) {
        this.postRepository = this.connection.getCustomRepository(PostRepository);
        this.likeRepository = this.connection.getCustomRepository(LikeRepository);
    }

    async createPost(createPostDTO: CreatePostDTO, user: Users) {
        const { post } = createPostDTO;
        if(post.trim() === '')
            throw new BadRequestException('The post field cannot be empty.');
            
        const newPost = await this.postRepository.createPost(createPostDTO, user);

        return newPost;
    }

    async reactToPost(likePostDTO: LikePostDTO, user: Users) {
        const { postId } = likePostDTO;
        const existingPost = await this.postRepository.findOne({ id: postId }, { relations: ['user'] });

        if(!existingPost) throw new BadRequestException('Post does not exist.');

        const existingLike = await this.likeRepository.findOne({
            post: existingPost,
            user,
        });

        if (!existingLike)
            await this.likeRepository.likePost(existingPost, user);
        else await this.likeRepository.unlikePost(existingLike.id);

        return this.postRepository.fetchSinglePost(postId);
    }

    async deletePost(deletePostDTO: LikePostDTO, user: Users) {
        const { postId } = deletePostDTO;
        const existingPost = await this.postRepository.findOne({ id: postId }, { relations: ['user'] });

        if (!existingPost) throw new BadRequestException('Post does not exist.');
        if (existingPost.user.id !== user.id)
            throw new UnauthorizedException('You do not have permision to delete this post.');
        
        const likes = await this.likeRepository.find({ post: existingPost });
        await this.likeRepository.remove(likes);

        const comments = await this.commentService.findAllCommentsByCondition({ post: existingPost });
        await this.commentService.deletePostComments(comments);

        await this.postRepository.delete({ id: postId });

        return await this.fetchPosts();
    }

    async fetchPosts() {
        return await this.postRepository.fetchPosts();
    }

    async fetchSinglePost(id: string) {
        return await this.postRepository.fetchSinglePost(id);
    }
}
