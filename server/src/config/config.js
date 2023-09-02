import * as dotenv from "dotenv";
dotenv.config();

const config = {
  app: {
    PORT: process.env.PORT,
  },
  db: {
    URI: process.env.MONGO_URL,
  },
  jwt: {
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    ACCESS_TOKEN_LIFE: process.env.ACCESS_TOKEN_LIFE,
    REFRESH_TOKEN_SIZE: process.env.REFRESH_TOKEN_SIZE,
  },
};

export default config;
 