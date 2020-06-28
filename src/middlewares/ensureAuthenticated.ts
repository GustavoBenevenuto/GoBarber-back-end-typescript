import { Request, Response, NextFunction } from 'express';
import { verify, decode } from 'jsonwebtoken';
import authConfig from '../config/auth';

interface TokenPayload{
    iat: number;
    exp: number;
    sub: string;
}

export default function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction): void {

    //Validação do Token
    const authHeader = request.headers.authorization;

    if(!authHeader){
        throw new Error('JWT token is missing');
    }

    // Bearer token
    const [, token] = authHeader.split(' ');

    try {
        const decoded = verify(token, authConfig.jwt.scret);

        const { sub } = decoded as TokenPayload;

        request.user = {
            id: sub,
        }

        return next();
    } catch (error) {
        throw new Error('Invalid JWT token');
    }

}