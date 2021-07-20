import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {UsersService} from "./users.service";
import { UsersController} from "./users.controller";
import { UserEntity } from '../model/User.entity';
import { CartEntity } from '../model/Cart.entity';
import { WishListEntity } from '../model/WishList.entity';
import { AuthModule } from '../auth/auth.module';
import { ProductsEntity } from '../model/Products.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity,CartEntity,WishListEntity,ProductsEntity]),
    AuthModule
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: []
})
export class UsersModule { }