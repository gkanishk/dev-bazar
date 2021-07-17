import { Injectable, Logger } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';

@Injectable()
export class AuthService {
    private logger = new Logger('AuthService - AuthService');

    async createAccessToken(userDetails:any):Promise<string>{
        this.logger.log("Request for Access-Token");
        return sign({ userid:userDetails.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '7d' });
    }

    async createRefreshToken(userDetails:any):Promise<string>{
        this.logger.log("Request for Refresh-Token");
        return sign({ userid:userDetails.id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '14d' });
    }

    async verifyAccessToken(accessToken:string):Promise<any>{
        this.logger.log('Verify Access Token');
        const decode: any = await verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        if(decode){
            this.logger.log("User id:"+decode.userid);
            return decode;
        }      
    }

    async verifyRefreshToken(refreshToken:string):Promise<any>{
        this.logger.log('Verify Refresh Token');
        const decode: any = await verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        if(decode){
            this.logger.log("User id:"+decode.userid);
            return decode;
        }      
    }

}