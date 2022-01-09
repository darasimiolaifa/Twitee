import { Users } from '../user/user.entity';
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { Comments } from '../comment/comment.entity';
import { Likes } from './like.entity';

@Entity()
export class Posts extends BaseEntity {
    @PrimaryColumn()
    id: string;

    @Column()
    post: string;

    @Column()
    created_at: Date;

    @OneToMany(() => Comments, (comments) => comments.post, {
        eager: false,
        onDelete: 'CASCADE',
    })
    comments: Comments[];

    @ManyToOne(() => Users, (user) => user.posts, {
        eager: false,
        onDelete: 'CASCADE',
    })
    user: Users;

    @OneToMany(() => Likes, (likes) => likes.post, {
        eager: false,
        onDelete: 'CASCADE',
    })
    likes: Likes[];
}