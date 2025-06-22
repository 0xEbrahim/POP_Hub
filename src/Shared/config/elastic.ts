import { Client } from "@elastic/elasticsearch";
import env from "@Shared/constants/env";

const esClient = new Client({
  node: env.ES_URL,
  auth: {
    username: env.ES_USERNAME,
    password: env.ES_PASSWORD,
  },
});

export const testElasticConnection = async () => {
  try {
    const health = await esClient.cluster.health();
    console.log("Elastic-Search connected successfully");
  } catch (error) {
    console.error("Elastic-Search connection failed:", error);
  }
};

export { esClient };
