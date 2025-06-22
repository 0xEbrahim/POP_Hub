import env from "@Shared/constants/env";
import Redis from "ioredis";

const redis = new Redis(env.REDIS_URI);

export const testRedisConnection = async () => {
  try {
    await redis.set("healthcheck", "OK");
    const result = await redis.get("healthcheck");
    console.log("Redis connected successfully. Value:", result);
  } catch (err) {
    console.error("Redis connection failed ❌", err);
  } finally {
    redis.disconnect();
  }
};
export  {redis};
