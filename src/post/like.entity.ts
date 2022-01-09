import { Users } from '../user/user.entity';
import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Posts } from './posts.entity';

@Entity()
export class Likes extends BaseEntity {
    @PrimaryColumn()
    id: string;

    @Column()
    created_at: Date;

    @ManyToOne(() => Users, (user) => user.likes, {
        eager: false,
        onDelete: 'CASCADE',
    })
    user: Users;

    @ManyToOne(() => Posts, (post) => post.likes, {
        eager: false,
        onDelete: 'CASCADE',
    })
    post: Posts;
}
