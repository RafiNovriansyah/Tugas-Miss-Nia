import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';  
import { ConfigModule } from '@nestjs/config';  
import { TypeOrmModule } from '@nestjs/typeorm';  
import { TasksModule } from './tasks/tasks.module';  
import { CorsGuard } from './cors.guard';
import { CorsInterceptor } from './cors.interceptor';  

@Module({  
  imports: [  
    ConfigModule.forRoot(),  
    TypeOrmModule.forRoot({  
      type: 'mysql',  
      host: process.env.DATABASE_HOST,  
      port: parseInt(process.env.DATABASE_PORT),  
      username: process.env.DATABASE_USERNAME,  
      password: process.env.DATABASE_PASSWORD,  
      database: process.env.DATABASE_NAME,  
      autoLoadEntities: true,  
      synchronize: false,  
    }),  
    TasksModule,  
  ],  
  providers: [CorsGuard, CorsInterceptor],  
})  
export class AppModule implements NestModule {  
  configure(consumer: MiddlewareConsumer) {  
    consumer  
      .apply((req, res, next) => {  
        res.header('Access-Control-Allow-Origin', 'http://localhost:5173');  
        res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');  
        res.header('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization');  
        res.header('Access-Control-Allow-Credentials', 'true');  
        if (req.method === 'OPTIONS') {  
          res.sendStatus(200);  
        } else {  
          next();  
        }  
      })  
      .forRoutes('*');  
  }  
} 