import env from "env-var";

const stage = env.get("NODE_ENV").asString();

export default {
  NODE_ENV: stage,
  PORT: env.get("PORT").required().asPortNumber(),
  MONGO_URI: env.get("MONGO_DB_URL").required().asString(),
  REDIS_URI: env.get("REDIS_URI").required().asString(),
  ES_URL: env.get("ES_URI").required().asString(),
  ES_USERNAME: env.get("ES_USERNAME").required().asString(),
  ES_PASSWORD: env.get("ES_PASSWORD").required().asString(),
};
