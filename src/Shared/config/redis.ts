import env from "@Shared/constants/env";
import Redis from "ioredis";

const redis = new Redis(env.REDIS_URI);

export default redis;
