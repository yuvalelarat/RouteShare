import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../models/user.js";
import dotenv from "dotenv";

dotenv.config();

const dataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
  synchronize: true,
  entities: [User],
});

export default dataSource;
