import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions: DataSourceOptions = {
  type: "mysql",
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '123456',
  database: 'warehouse',
  logging: true,
  entities: ['./dist/database/entities/*.entity{ .ts,.js}'],
  migrations: ['./src/database/migrations/*{.ts,.js}'],
  migrationsRun: true,
  synchronize: false
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;