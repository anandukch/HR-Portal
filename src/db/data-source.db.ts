import "reflect-metadata";
import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { NODE_ENV } from "../utils/constants";


const dataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5434,
    database: "migration-test",
    username: "test",
    password: "test",
    extra: { max: 5, min: 2 },
    synchronize: false,
    logging: true,
    namingStrategy: new SnakeNamingStrategy(),
    entities: NODE_ENV == "dev" ? ["src/entity/*.ts"] : ["dist/entity/*.js"],
    migrations: ["dist/db/migrations/*.js"],
});

export default dataSource;
