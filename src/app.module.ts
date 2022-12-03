import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
// import { DatabaseModule } from './database/database.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    // DatabaseModule,
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    AuthModule,
    ProductsModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
