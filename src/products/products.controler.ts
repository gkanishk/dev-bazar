import { Body, Controller, Get, Post, Request, UnauthorizedException } from '@nestjs/common';
import { ProductsService } from './products.service';
import {response, products} from "../utills/interfaces";
import { ApiBody, ApiTags } from '@nestjs/swagger';

@Controller('products')
export class ProductsControler {
  constructor(private serv: ProductsService) { }

  @Get()
  @ApiTags('products')
  public async getAll():Promise<response> {
    return await this.serv.getAll();
  }

  @Post("addProduct")
  @ApiTags('products')
  @ApiBody({
      schema:{
          example:  {
                    "password" : "password",
                    "product" : {
                        "name": "White Tshirt",
                        "category": "clotihng",
                        "price": 5999,
                        "attributes": {
                            "img": "https://rukminim1.flixcart.com/image/533/640/kph8h3k0/t-shirt/g/i/n/xxl-lykpcslp607320-louis-philippe-sport-original-imag3p8rr6gwrcxu.jpeg?q=50",
                            "sizes": [
                                "s",
                                "m",
                                "l",
                                "xl"
                            ]
                        },
                        "desc": "Men's white t-shirt",
                        "discount": 20,
                        "quantity": 2,
                        "createDateTime": "2021-07-18T15:20:50.123Z",
                        "lastChangedDateTime": "2021-07-18T15:20:50.123Z"
                    }
                }
        }
  })
  async createProduct(@Body() product:{password: string,product:products}):Promise<response> {
      if(product.password===process.env.API_PASSWORD)
      return await this.serv.addProduct(product.product);
      throw new UnauthorizedException();
  }

  @Post("update")
  @ApiTags('products')
  @ApiBody({
    schema:{
        example: {
          "id":"15dbca0d-d8c3-40bf-95f7-a2c3acf5a107",
          "password" : "password",
          "product": {
                  "name": "White Tshirt",
                  "category": "clotihng",
                  "price": 5999,
                  "attributes": {
                      "img": "https://rukminim1.flixcart.com/image/533/640/kph8h3k0/t-shirt/g/i/n/xxl-lykpcslp607320-louis-philippe-sport-original-imag3p8rr6gwrcxu.jpeg?q=50",
                      "sizes": [
                          "s",
                          "m",
                          "l",
                          "xl"
                      ]
                  },
                  "desc": "Men's white t-shirt",
                  "discount": 20,
                  "quantity": 2,
                  "createDateTime": "2021-07-18T15:20:50.123Z",
                  "lastChangedDateTime": "2021-07-18T15:20:50.123Z"
              }
      }
    }
})
  async updateProduct(@Body() productData:{id:string,password:string,product:products}):Promise<response>{
    if(productData.password===process.env.API_PASSWORD)
      return await this.serv.update(productData.id,productData.product);
    throw new UnauthorizedException();
  }
}