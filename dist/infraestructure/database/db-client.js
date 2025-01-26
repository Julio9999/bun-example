// import { PrismaClient } from '@prisma/client'
import { SQL } from "bun";
// const dbClient = new PrismaClient()
const dbClient = new SQL({
    url: "postgres://user:pass@localhost:5432/dbname",
    host: "localhost",
    port: 5432,
    database: "tasks",
    username: "postgres",
    password: "postgres",
    max: 20,
    idleTimeout: 30,
    maxLifetime: 0,
    connectionTimeout: 30,
    bigint: false,
    adapter: "",
    tls: false,
    onconnect: (client) => console.log('connected'),
    onclose: (client) => console.log('cerrado')
});
export { dbClient };
