import env from "@Shared/constants/env";
import { Queue } from "bullmq";

const elasticQueue = new Queue("elastic-queue", {
  connection: { url: env.REDIS_URI },
});

export { elasticQueue };
