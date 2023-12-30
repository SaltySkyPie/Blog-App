import { config } from 'dotenv'
import { DataSource } from 'typeorm'

config()

export default new DataSource({
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
})
