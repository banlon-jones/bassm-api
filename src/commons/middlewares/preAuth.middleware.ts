import { Injectable, NestMiddleware } from '@nestjs/common';
import { firebaseApp } from '../../config/firebaseConfig';
import {Response} from 'express';
import { UserService } from '../../core/user/service/user.service';

@Injectable()
export class PreAuthMiddleware implements NestMiddleware {
  private fbApp;
  constructor(private userService: UserService) {
    this.fbApp = firebaseApp;
  }

  use(req: any, res: Response, next: () => void) {
    // This middleware is used to handle pre-authentication logic
    const token = req.headers.authorization;
    if (!token){
      this.accessDenied(req.originalUrl, res);
    } else {
      try {
        // Verify the token using Firebase Admin SDK
        this.fbApp.auth().verifyIdToken(token.replace('Bearer ', ''))
          .then(async (decodedToken) => {
            // Token is valid, attach user info to request
            req.user = await this.userService.getUserByEmail(decodedToken.email);
            next();
          })
          .catch((error) => {
            // Token is invalid, handle the error
            console.error('Error verifying token:', error);
            this.accessDenied(req.originalUrl, res);
            return;
          });
      }catch (e) {
        this.accessDenied(req.originalUrl, res);
      }
    }
  }

  private accessDenied(url: string, res: Response) {
    console.error(`Access denied for URL: ${url}`);
    res.status(403).json({
      message: 'Access denied',
      url: url
    });
  }
}


