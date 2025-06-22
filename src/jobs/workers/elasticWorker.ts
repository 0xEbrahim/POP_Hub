import { esClient } from "@Shared/config/elastic";
import env from "@Shared/constants/env";
import { Worker } from "bullmq";

const elasticWorker = new Worker(
  "elastic-queue",
  async (job) => {
    try {
      if (job.name === "indexUser") {
        console.log("Indexing user started");
        const user = job.data;
        await esClient.index({
          index: "users",
          id: user.id,
          document: {
            username: user.username,
            avatar: user.avatar,
            bio: user.bio,
            createdAt: user.createdAt,
          },
        });
        console.log("OHH");
      } else if (job.name == "indexPost") {
       
      }
    } catch (e) {
      console.log(e);
    }
  },
  {
    connection: { url: env.REDIS_URI },
    removeOnComplete: {
      age: 3600,
      count: 1000,
    },
    removeOnFail: {
      age: 24 * 3600,
    },
  }
);

elasticWorker.on("completed", (job) => {
  console.log(`${job?.name} completed`);
  job.updateProgress(100);
});

elasticWorker.on("failed", (job, err: Error, prev: string) => {
  console.error(`${job?.name} failed`);
});

export { elasticWorker };
