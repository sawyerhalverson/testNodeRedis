import Redis from "ioredis";

// Load environment variables
import dotenv from "dotenv";
dotenv.config();

// Load Redis URL from environment variables
const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";

async function main() {
  try {
    console.log("Connecting to Redis...");

    // Create a Redis client
    const redis = new Redis(REDIS_URL);

    // Test the connection
    await redis.set("fav number", "3.14");
    const value = await redis.get("fav number");

    console.log("Connected to Redis!");
    console.log(`Fetched from Redis: ${value}`);

    // Disconnect from Redis
    await redis.quit();
    console.log("Disconnected from Redis.");
  } catch (error) {
    console.error("Error connecting to Redis:", error);
  }
}

main();
