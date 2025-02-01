import { SQL } from "bun";
let dbClient;
const createDBClient = () => {
    return new SQL({
        url: "postgres://user:pass@localhost:5432/dbname",
        host: "localhost",
        port: 5432,
        database: "tasks",
        username: "postgres",
        password: "postgres",
        max: 1,
        idleTimeout: 30,
        maxLifetime: 0,
        connectionTimeout: 30,
        bigint: false,
        adapter: "",
        tls: false,
        onconnect: (client) => {
            console.log('connected');
        },
        onclose: (client) => {
            dbClient = createDBClient();
        }
    });
};
dbClient = createDBClient();
export { dbClient };
