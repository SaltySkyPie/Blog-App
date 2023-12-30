import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { join } from 'path'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'
import { ArticleModule } from './article/article.module';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
