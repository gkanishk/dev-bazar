console.log(__dirname);
const env = require('dotenv')
env.config()

const isProd = process.env.MODE === 'production'
const entitiesExtension = isProd ? 'js' : 'ts'
const entitiesDir = 'src';
const migrationsDir = isProd ? 'src/migration/*.js' : 'src/migration/*.ts';

module.exports = {
  type: "postgres",
  entities: [
    `${__dirname}/${entitiesDir}/**/*.entity.${entitiesExtension}`
  ],
  url: process.env.DATABASE_URL,
  migrations: [migrationsDir],
  migrationsRun: true,
  synchronize: true,
  cli: {
    migrationsDir: 'src/migration'
  },
  ssl: isProd?{
    rejectUnauthorized: false
  }:false
}