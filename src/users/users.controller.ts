import { Body, Controller, Post, UseGuards,Request, Get, HttpCode } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/auth.guard';
import { response, userDetails } from 'src/utills/interfaces';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';

@Controller('user')
export class UsersController {
    constructor(private service: UsersService) { }

    @Post("login")
    @ApiTags('user')
    @ApiBody({
        schema: {
        example: {
            "email": "kanishk@hotmail.com",
            "password": "123456"
        },
        },
    })
    @HttpCode(200)
    async login(@Body() user: { email: string; password: string; }):Promise<response> {
        return await this.service.login(user);
    }
    
    @Post("signup")
    @ApiTags('user')
    @ApiBody({
        schema: {
        example: {
            "name": "Kanishk Gupta",
            "email": "kanishk@hotmail.com",
            "password": "123456"
        },
        },
    })
    @HttpCode(200)
    async signup(@Body() user: userDetails):Promise<response> {
        return await this.service.signUp(user);
    }

    @Get("cart")
    @UseGuards(JwtAuthGuard)
    @ApiTags('user')
    @ApiBearerAuth()
    async getUserCart(@Request() req:any):Promise<response> {
        return await this.service.getUserCart(req.user.userId);
    }

    @Get("wishList")
    @UseGuards(JwtAuthGuard)
    @ApiTags('user')
    @ApiBearerAuth()
    async getUserWishList(@Request() req:any):Promise<response> {
        return await this.service.getUserWishList(req.user.userId);
    }

    @Post("updateCart")
    @UseGuards(JwtAuthGuard)
    @ApiTags('user')
    @ApiBearerAuth()
    @ApiBody({
        schema: {
            example: [
                {
                    "productId": "25712c05-0c46-41a9-bd07-92fc44d665fe",
                    "count": 2
                }
        ]
        
        }
    })
    async updateUserCart(@Request() req:any,@Body() cartItems:{productId:string,count: number}[]): Promise<response> {
        return await this.service.updateCart(req.user.userId,cartItems)
    }

    @Post("updateWishList")
    @UseGuards(JwtAuthGuard)
    @ApiTags('user')
    @ApiBearerAuth()
    @ApiBody({
        schema: {
            example: [
                {
                    "productId": "25712c05-0c46-41a9-bd07-92fc44d665fe"
                }
        ]
        
        }
    })
    async updateWishList(@Request() req:any,@Body() wishListItems:{productId:string}[]): Promise<response> {
        return await this.service.updateWishList(req.user.userId,wishListItems)
    }

    @Post("addToCart")
    @UseGuards(JwtAuthGuard)
    @ApiTags('user')
    @ApiBearerAuth()
    @ApiBody({
        schema: {
            example:
                {
                    "productId": "25712c05-0c46-41a9-bd07-92fc44d665fe"
                }
        }
    })
    async addToCart(@Request() req:any,@Body() wishListItem:{productId:string}): Promise<response> {
        return await this.service.addToCart(req.user.userId,wishListItem)
    }

    @Post("addToWishList")
    @UseGuards(JwtAuthGuard)
    @ApiTags('user')
    @ApiBearerAuth()
    @ApiBody({
        schema: {
            example:
                {
                    "productId": "25712c05-0c46-41a9-bd07-92fc44d665fe"
                }
        }
    })
    async addToWishList(@Request() req:any,@Body() wishListItem:{productId:string}): Promise<response> {
        return await this.service.addToWishList(req.user.userId,wishListItem)
    }

}
