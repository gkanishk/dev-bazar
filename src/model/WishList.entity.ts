import { 
    PrimaryGeneratedColumn, 
    Column, 
    UpdateDateColumn, 
    CreateDateColumn 
} from 'typeorm';

import {ProductsEntity} from "./Products.entity";

export abstract class WishListEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('jsonb')
    wishListems: { item: ProductsEntity }[];

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createDateTime: Date;

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    lastChangedDateTime: Date;
}