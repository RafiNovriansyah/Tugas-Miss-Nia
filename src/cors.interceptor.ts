import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';  
import { Observable } from 'rxjs';  

@Injectable()  
export class CorsInterceptor implements NestInterceptor {  
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {  
    const request = context.switchToHttp().getRequest();  
    request.headers.origin = request.get('origin');  
    return next.handle();  
  }  
}