import Arena from "bull-arena";
import env from "@Shared/constants/env";
export const arenaConfig = Arena(
  {
    BullMQ: require("bullmq").Queue,
    queues: [
      {
        type: "bullmq",
        name: "elastic-queue",
        hostId: "server",
        redis: {
          url: env.REDIS_URI,
        },
      },
    ],
  },
  {
    basePath: "/arena",
  }
);
