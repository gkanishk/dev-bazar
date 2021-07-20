import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsEntity } from '../model/Products.entity';
import { Repository } from 'typeorm';
import {response, products} from "../utills/interfaces";

@Injectable()
export class ProductsService {
  constructor(@InjectRepository(ProductsEntity) private readonly productRepo: Repository<ProductsEntity>) { }

  async getAll():Promise<response> {
        return {
            statusCode: 200,
            response: await this.productRepo.find(),
            message: "Success"
        }
  }

  async addProduct(product: products): Promise<response>{
      try{
        const productEntity=new ProductsEntity();
        productEntity.name=product.name;
        productEntity.desc=product.desc;
        productEntity.discount=product.discount;
        productEntity.price=product.price;
        productEntity.quantity=product.quantity;
        productEntity.attributes=product.attributes;
        productEntity.category=product.category;
        await this.productRepo.save(productEntity);
  
        return {
            statusCode: 200,
            response: productEntity,
            message: "Success"
        }
      }catch(error){
          return{
              statusCode: 400,
              response: error,
              message: error.message
          }
      }
  }

  async update(id:string,data:products): Promise<response> {
      const product = await this.productRepo.findOne(id);
      if(product){
        product.name=data.name;
        product.desc=data.desc;
        product.discount=data.discount;
        product.price=data.price;
        product.quantity=data.quantity;
        product.attributes=data.attributes;
        product.category=data.category;
        await this.productRepo.save(product);
  }else {
      throw new NotFoundException("Product not found with given id");
  }
  return {
      statusCode: 200,
      response: product,
      message: "success"
  }
}


}