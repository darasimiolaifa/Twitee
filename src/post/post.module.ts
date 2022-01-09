import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { CommentModule } from 'src/comment/comment.module';
import { CommentService } from 'src/comment/comment.service';

@Module({
  imports: [CommentModule],
  providers: [PostService, CommentService],
  controllers: [PostController],
})
export class PostModule {}
