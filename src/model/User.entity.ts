import { 
    PrimaryGeneratedColumn, 
    Column, 
    UpdateDateColumn, 
    CreateDateColumn,
    OneToOne,
    JoinColumn 
} from 'typeorm';

import {CartEntity} from "./Cart.entity";
import {WishListEntity} from "./WishList.entity";

import { IsEmail } from "class-validator";

export abstract class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'string'})
    name: string;

    @Column({ type: 'string', unique: true })
    @IsEmail()
    email: string;

    @Column({ type: 'string' })
    password: string;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createDateTime: Date;

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    lastChangedDateTime: Date;

    @OneToOne(() => CartEntity)
    @JoinColumn()
    cart: CartEntity;

    @OneToOne(() => WishListEntity)
    @JoinColumn()
    wishList: WishListEntity;
}