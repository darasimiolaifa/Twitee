import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Request,
    UseGuards,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { CreatePostDTO } from './create-post.dto';
import { LikePostDTO } from './like-post.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService) {}

    @UseGuards(LocalAuthGuard)
    @Post('/create')
    @UsePipes(ValidationPipe)
    async createPost(@Body() createPostDTO: CreatePostDTO, @Request() { user }) {
        return this.postService.createPost(createPostDTO, user);
    }

    @UseGuards(LocalAuthGuard)
    @Put('/:postId/react')
    @UsePipes(ValidationPipe)
    async reactToPost(@Param() likePostDTO: LikePostDTO, @Request() { user }) {
        return this.postService.reactToPost(likePostDTO, user);
    }

    @UseGuards(LocalAuthGuard)
    @Get('/fetch')
    @UsePipes(ValidationPipe)
    async fetchPosts() {
        return await this.postService.fetchPosts();
    }

    @UseGuards(LocalAuthGuard)
    @Get('/fetch/:id')
    @UsePipes(ValidationPipe)
    async fetchSinglePost(@Param() { id }) {
        return await this.postService.fetchSinglePost(id);
    }

    @UseGuards(LocalAuthGuard)
    @Delete('/:postId')
    @UsePipes(ValidationPipe)
    async deletePost(
        @Request() { user },
        @Param() deletePostDTO: LikePostDTO,
    ) {
        return await this.postService.deletePost(deletePostDTO, user);
    }
}
