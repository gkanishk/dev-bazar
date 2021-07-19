import { 
    PrimaryGeneratedColumn, 
    Column, 
    UpdateDateColumn, 
    CreateDateColumn,
    OneToOne,
    JoinColumn, 
    Entity,
    BeforeInsert
} from 'typeorm';

import {CartEntity} from "./Cart.entity";
import {WishListEntity} from "./WishList.entity";

import { IsEmail } from "class-validator";
import * as bcrypt from "bcrypt";

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ unique: true })
    @IsEmail()
    email: string;

    @Column()
    password: string;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createDateTime: Date;

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    lastChangedDateTime: Date;

    @OneToOne(() => CartEntity,{
        eager: true,
        cascade: true
    })
    @JoinColumn()
    cart: CartEntity;

    @OneToOne(() => WishListEntity, {eager: true})
    @JoinColumn()
    wishList: WishListEntity;

    @BeforeInsert()
    async setPassword(password: string) {
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(password || this.password, salt);
    }
}