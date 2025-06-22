import { inject, injectable } from "tsyringe";
import { IAuthRespository } from "./Repository/IAuthRepository";
import { IRegisterBody, IUser } from "@Modules/User/Models/User.Models";
import {
  hashPassword,
  verifyPassword,
} from "@Shared/utils/Functions/passwordHash";
import { IResponse } from "@Shared/types/types";
import ApiResponse from "@Shared/utils/ApiResponse";
import { ILoginBody } from "./Models/Auth.Models";
import {
  generateAccessToken,
  generateRefreshToken,
} from "@Shared/utils/Functions/JWT";
import { elasticQueue } from "jobs/queues/elasticQueue";

@injectable()
class AuthService {
  constructor(
    @inject("AuthRepository") private readonly AuthRepository: IAuthRespository
  ) {}

  async signUp(data: IRegisterBody): Promise<IResponse> {
    const emailExist = await this.AuthRepository.findByEmail(data.email);
    const usernameExists = await this.AuthRepository.findByUsername(
      data.username
    );
    if (emailExist || usernameExists)
      return ApiResponse.AlreadyExist("Email or username already exists.");
    data.password = await hashPassword(data.password);
    const user: IUser = await this.AuthRepository.create(data);
    user.password = undefined;
    elasticQueue.add(
      "indexUser",
      {
        id: user.id,
        bio: user.bio,
        avatar: user.avatarUrl,
        username: user.username,
        createdAt: user.createdAt,
      },
      {
        attempts: 5,
        backoff: {
          type: "exponential",
          delay: 1000,
        },
      }
    );
    return ApiResponse.Created({ user });
  }

  async login({ email, password }: ILoginBody): Promise<IResponse> {
    const account = await this.AuthRepository.findByEmail(email);
    if (!account || !(await verifyPassword(password, account.password ?? "")))
      return ApiResponse.BadRequest("Invalid email or password.");
    const accessToken = generateAccessToken(account.id);
    const refreshToken = generateRefreshToken(account.id);
    return ApiResponse.OK({ user: account }, accessToken, refreshToken);
  }
}

export default AuthService;
