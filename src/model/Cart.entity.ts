import { 
    PrimaryGeneratedColumn, 
    Column, 
    UpdateDateColumn, 
    CreateDateColumn 
} from 'typeorm';

import {ProductsEntity} from "./Products.entity";

export abstract class CartEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('jsonb')
    cartItems: { item: ProductsEntity, count: number }[];

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createDateTime: Date;

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    lastChangedDateTime: Date;
}