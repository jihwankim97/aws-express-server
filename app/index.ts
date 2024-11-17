import dotenv from "dotenv";
import * as redis from "redis";
import { createApp } from "./app";

dotenv.config({ path: "./.env" });

const PORT = parseInt(process.env.PORT || "", 10); 
const REDIS_URL = process.env.REDIS_URL || "";


if(!PORT) throw new Error("PORT is required")
if(!REDIS_URL) throw new Error("REDIS_URL is required")

const startServer = async () => {

    const client = redis.createClient({ url: REDIS_URL });

    await client.connect();
    const app = createApp(client);

    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
};

startServer();
