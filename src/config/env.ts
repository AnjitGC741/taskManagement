import * as dotenv from 'dotenv';

dotenv.config();
export default{
    connectionString: process.env.CONNECTION_STRING,
    port: process.env.PORT ? parseInt(process.env.PORT) : 5000
}