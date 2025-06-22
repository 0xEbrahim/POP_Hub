import env from "env-var";

const stage = env.get("NODE_ENV").asString();

export default {
  NODE_ENV: stage,
  PORT: env.get("PORT").required().asPortNumber(),
  MONGO_URI: env.get("MONGO_DB_URL").required().asString(),
};
