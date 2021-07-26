import { BadRequestException, Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../model/User.entity';
import { response, userDetails } from '../utills/interfaces';
import { Repository } from 'typeorm';
import { AuthService } from '../auth/auth.service';
import * as bcrypt from "bcrypt";
import { CartEntity } from '../model/Cart.entity';
import { WishListEntity } from '../model/WishList.entity';
import { ProductsEntity } from '../model/Products.entity';
const { v4: uuidv4 } = require('uuid');

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
        @InjectRepository(CartEntity) private cartRepo: Repository<CartEntity>,
        @InjectRepository(WishListEntity) private wishListRepo: Repository<WishListEntity>,
        @InjectRepository(ProductsEntity) private productRepo: Repository<ProductsEntity>,
        private authService: AuthService
        ) { }

    async signUp(user:userDetails):Promise<response>{
        const checkUser = await this.userRepo.findOne({email:user.email});
        if(checkUser)
        throw new BadRequestException("User exists with provided email");
        const userEntity = new UserEntity();
        const cart= new CartEntity();
        cart.cartItems=[];
        cart.user=userEntity;
        await this.cartRepo.save(cart);
        const wishList = new WishListEntity();
        wishList.wishListems=[];
        wishList.user=userEntity;
        await this.wishListRepo.save(wishList);
        userEntity.id=uuidv4();
        userEntity.email=user.email;
        userEntity.name=user.name;
        userEntity.password=user.password;
        userEntity.wishList= wishList;
        userEntity.cart=cart;
        await this.userRepo.save(userEntity);
        const accessToken = await this.authService.createAccessToken(userEntity);
        return {
            statusCode:200,
            response: {
                accessToken,
                user: {
                    email: user.email,
                    name: user.name
                }
            },
            message: "Sign Up successfull!!"
        }

    }

    async login(user:{email:string,password:string}):Promise<response>{
        const findUser = await this.userRepo.findOne({email:user.email});
        if(findUser){
            const passwordCheck = await bcrypt.compare(user.password, findUser.password);
            if(passwordCheck){
                const accessToken = await this.authService.createAccessToken(findUser);
                return {
                    statusCode: 200,
                    response: {
                        accessToken,
                        user: {
                            email: findUser.email,
                            name: findUser.name,
                            cart: findUser.cart.cartItems,
                            wishlist: findUser.wishList.wishListems
                        }
                    },
                    message: "Login Successfull!!"
                }
            }
        }throw new UnauthorizedException("Incorrect user details");
    }

    async getUserCart(userId:string):Promise<response>{
        const findUser = await this.userRepo.findOne({id:userId});
        if(findUser) {
            return {
                statusCode: 200,
                message: "Success",
                response: { cart:findUser.cart }
            }
        }throw new UnauthorizedException("Invalid Credentials");
    }

    async getUserWishList(userId:string):Promise<response>{
        const findUser = await this.userRepo.findOne({id:userId});
        if(findUser) {
            return {
                statusCode: 200,
                message: "Success",
                response: {wishList:findUser.wishList}
            }
        }throw new UnauthorizedException("Invalid Credentials");
    }

    async updateCart(userId:string,cartItems:{productId:string,count: number}[]):Promise<response> {
        const findUser = await this.userRepo.findOne({id:userId});
        if(findUser){
            let cart=[];
            cartItems.forEach(async ({productId,count})=>{
                const product = await this.productRepo.findOne({id:productId});
                if(product) {
                    cart.push({item:product,count:count})
                }
            })
            findUser.cart.cartItems=cart;
            await this.userRepo.save(findUser);
            return {
                statusCode: 200,
                message: "Success",
                response: {cart:cartItems}
            }
        }throw new UnauthorizedException("Invalid Credentials");
    }

    async updateWishList(userId:string,wishListItems:{productId:string}[]):Promise<response> {
        const findUser = await this.userRepo.findOne({id:userId});
        if(findUser){
            let wishList=[];
            wishListItems.forEach(async ({productId})=>{
                const product = await this.productRepo.findOne({id:productId});
                if(product) {
                    wishList.push({item:product})
                }
            })
            findUser.wishList.wishListems=wishList;
            await this.userRepo.save(findUser);
            return {
                statusCode: 200,
                message: "Success",
                response: {wishList:wishListItems}
            }
        }throw new UnauthorizedException("Invalid Credentials");
    }

    async addToWishList(userId: string,wishListItem:{productId:string}):Promise<response> {
        const findUser = await this.userRepo.findOne({id:userId});
        if(findUser){
            const wishListItems = findUser.wishList.wishListems;
            const findItem = wishListItems.find(({item:{id}})=>id===wishListItem.productId);
            if(findItem){
                throw new UnprocessableEntityException("Item already exists");
            }
            const product = await this.productRepo.findOne({id:wishListItem.productId});
            if(product){
                findUser.wishList.wishListems.push({item:product});
                await this.userRepo.save(findUser);
                return {
                    statusCode: 200,
                    message: "Success",
                    response: {
                        wishList: findUser.wishList.wishListems
                    }
                }
            }throw new UnprocessableEntityException("Product with given id doesn't exists"); 
        }throw new UnauthorizedException("Invalid Credentials");
    }

    async addToCart(userId: string,wishListItem:{productId:string}):Promise<response> {
        const findUser = await this.userRepo.findOne({id:userId});
        if(findUser){
            const cartItems = findUser.cart.cartItems;
            const findItem = cartItems.find(({item:{id}})=>id===wishListItem.productId);
            if(findItem){
                throw new UnprocessableEntityException("Item already exists");
            }
            const product = await this.productRepo.findOne({id:wishListItem.productId});
            if(product){
                findUser.cart.cartItems.push({item:product,count: 1});
                await this.userRepo.save(findUser);
                return {
                    statusCode: 200,
                    message: "Success",
                    response: {
                        wishList: findUser.cart.cartItems
                    }
                }
            }throw new UnprocessableEntityException("Product with given id doesn't exists");
        }throw new UnauthorizedException("Invalid Credentials");
    }
}
