import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { TenantModule } from './tenants/module/tenant.module';
import { AuthModule } from './auth/module/auth.module';
import { LoggerMiddleware } from './middleware/logger.middlerware';

@Module({
  imports: [
    TenantModule,
    ApiModule,
    AuthModule
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');  
  }
}
