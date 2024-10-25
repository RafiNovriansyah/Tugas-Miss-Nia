import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';  

@Injectable()  
export class CorsGuard implements CanActivate {  
  canActivate(context: ExecutionContext): boolean {  
    const request = context.switchToHttp().getRequest();  
    request.headers.origin = request.get('origin');  
    return true;  
  }  
}