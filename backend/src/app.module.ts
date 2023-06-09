import { MikroOrmModule } from '@mikro-orm/nestjs';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guard/jwt-auth.guard';
import { DevModule } from './dev/dev.module';
import { UserModule } from './user/user.module';
import { SourceModule } from './source/source.module';
import { RecipeModule } from './recipe/recipe.module';

@Module({
  imports: [
    MikroOrmModule.forRoot({
      entities: ['./dist/entities'],
      entitiesTs: ['./src/entities'],
      clientUrl: 'postgresql://postgres:postgres@localhost:10432/foodprint',
      type: 'postgresql',
      metadataProvider: TsMorphMetadataProvider,
      // debug: true,
    }),
    AuthModule,
    UserModule,
    RecipeModule,
    DevModule,
    SourceModule,
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
