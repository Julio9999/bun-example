import { SQL } from "bun";

let dbClient: SQL;

const createDBClient = () => {
  return new SQL({
    url: process.env.DATABASE_ULR!,
    database: process.env.DB_NAME!,
    host: process.env.HOST!,
    port: process.env.DB_PORT!,
    password: process.env.PASSWORD!,
    username: process.env.USER!,
    max: 1,
    idleTimeout: 30,
    maxLifetime: 0,
    connectionTimeout: 30,
    bigint: false,
    adapter: "",
    tls: false,
    onconnect: (client: SQL) => {
      console.log('connected');
    },
    onclose: (client: SQL) => {
      dbClient = createDBClient();
    }
  });
};

dbClient = createDBClient();

export { dbClient };
