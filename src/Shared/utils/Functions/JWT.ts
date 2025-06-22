import env from "@Shared/constants/env";
import jwt from "jsonwebtoken";

export const generateAccessToken = (id: string) => {
  const token = jwt.sign({ id: id }, env.ACCESS_TOKEN_SECRET, {
    expiresIn: "10m",
  });
  return token;
};

export const verifyAccessToken = (token: string) => {
  const decoded = jwt.verify(token, env.ACCESS_TOKEN_SECRET);
  return decoded;
};

export const generateRefreshToken = (id: string) => {
  const token = jwt.sign({ id: id }, env.REFRESH_TOKEN_SECRET, {
    expiresIn: "30d",
  });
  return token;
};

export const verifyRefreshToken = (token: string) => {
  const decoded = jwt.verify(token, env.REFRESH_TOKEN_SECRET);
  return decoded;
};
