import { Posts } from '../post/posts.entity';
import { Users } from '../user/user.entity';
import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class Comments extends BaseEntity {
    @PrimaryColumn()
    id: string;

    @Column()
    comment: string;

    @Column()
    created_at: Date;

    @ManyToOne(() => Users, (user) => user.comments, {
        eager: false,
        onDelete: 'CASCADE',
    })
    user: Users;

    @ManyToOne(() => Posts, (post) => post.comments, {
        eager: false,
        onDelete: 'CASCADE',
    })
    post: Posts;
}
