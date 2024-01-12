import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'
import { join } from 'path'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ArticleModule } from './article/article.module'
import { AuthModule } from './auth/auth.module'
import { AccessTokenAuthGuard } from './auth/guards/access-token.guard'
import { CommentModule } from './comment/comment.module'
import { UserModule } from './user/user.module'
import { VoteModule } from './vote/vote.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: process.env.GRAPHQL_PLAYGROUND == 'true',
      introspection: process.env.GRAPHQL_PLAYGROUND == 'true',
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({ req }: { req: Request }) => ({ req }),
      sortSchema: true,
    }),
    TypeOrmModule.forRoot({
      type: (process.env.TYPEORM_CONNECTION ?? 'mysql') as any,
      host: process.env.TYPEORM_HOST,
      port: Number(process.env.TYPEORM_PORT),
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: process.env.TYPEORM_ENTITIES ? process.env.TYPEORM_ENTITIES.split(',') : [],
      migrationsTableName: process.env.TYPEORM_MIGRATIONS_TABLE_NAME,
      migrations: process.env.TYPEORM_MIGRATIONS ? process.env.TYPEORM_MIGRATIONS.split(',') : [],
      migrationsRun: process.env.TYPEORM_MIGRATIONS_RUN?.toLowerCase().includes('true'),
      logging: 'all',
      synchronize: false,
    }),
    ArticleModule,
    UserModule,
    AuthModule,
    CommentModule,
    VoteModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,

    {
      provide: APP_GUARD,
      useClass: AccessTokenAuthGuard,
    },
  ],
})
export class AppModule {}
