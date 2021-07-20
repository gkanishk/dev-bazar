import { 
    PrimaryGeneratedColumn, 
    Column, 
    UpdateDateColumn, 
    CreateDateColumn, 
    Entity,
    OneToOne
} from 'typeorm';

import {ProductsEntity} from "./Products.entity";
import { UserEntity } from './User.entity';

@Entity()
export class CartEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('jsonb')
    cartItems: { item: ProductsEntity, count: number }[];

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createDateTime: Date;

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    lastChangedDateTime: Date;

    @OneToOne(() => UserEntity, (user: UserEntity) => user.cart)
    public user: UserEntity;
}