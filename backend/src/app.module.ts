import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { RecipeModule } from './recipe/recipe.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guard/jwt-auth.guard';

@Module({
  imports: [
    MikroOrmModule.forRoot({
      entities: ['./dist/entities'],
      entitiesTs: ['./src/entities'],
      clientUrl: 'postgresql://postgres:postgres@localhost:10432/foodprint',
      type: 'postgresql',
      metadataProvider: TsMorphMetadataProvider,
    }),
    AuthModule,
    UserModule,
    RecipeModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
