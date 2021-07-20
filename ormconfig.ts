// import { ConnectionOptions } from 'typeorm';
// require('dotenv').config();
// const connectionOptions: ConnectionOptions = {
//   type: 'postgres',
//   host: process.env.POSTGRES_HOST,
//   port: Number.parseInt(process.env.POSTGRES_PORT, 10),
//   username: process.env.POSTGRES_USER,
//   password: process.env.POSTGRES_PASSWORD,
//   database: process.env.POSTGRES_DATABASE,
//   synchronize: true,
//   migrationsTableName: 'custom_migration_table',
//   migrations: ['src/migrations/*{.ts,.js}'],
//   migrationsRun: true,
//   cli: {
//     migrationsDir: 'src/migrations',
//   },
// };

// export = connectionOptions;
console.log(__dirname);
const env = require('dotenv')
env.config()

const isProd = process.env.MODE === 'production'
const entitiesExtension = isProd ? 'js' : 'ts'
const entitiesDir = isProd ? 'dist' : 'src'
const migrationsDir = isProd ? 'dist/migration/*.js' : 'src/migration/*.ts'

module.exports = {
  type: "postgres",
  entities: [
    `${__dirname}/${entitiesDir}/**/*.entity.${entitiesExtension}`
  ],
  url: process.env.DATABASE_URL,
  migrations: [migrationsDir],
  cli: {
    migrationsDir: 'src/migration'
  }
}