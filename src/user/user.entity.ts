import { Comments } from '../comment/comment.entity';
import { Likes } from '../post/like.entity';
import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Posts } from '../post/posts.entity';

@Entity()
export class Users extends BaseEntity {
    @PrimaryColumn()
    id: string;

    @Column()
    email: string;

    @Column({
        select: false,
    })
    password: string;

    @Column()
    name: string;

    @Column()
    created_at: Date;

    @OneToMany(() => Posts, (post) => post.user, {
        eager: false,
        onDelete: 'CASCADE',
    })
    posts: Posts[];

    @OneToMany(() => Comments, (comment) => comment.user, {
        eager: false,
        onDelete: 'CASCADE',
    })
    comments: Comments[];

    @OneToMany(() => Likes, (like) => like.user, {
        eager: false,
        onDelete: 'CASCADE',
    })
    likes: Likes[];
}
