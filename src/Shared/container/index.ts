import { IAuthRespository } from "@Modules/Auth/Repository/IAuthRepository";
import AuthRepository from "@Modules/Auth/Repository/AuthRepository";
import { container } from "tsyringe";
import { IUserRepository } from "@Modules/User/Repository/IUserRespository";
import UserRepository from "@Modules/User/Repository/UserRepository";

container.registerSingleton<IUserRepository>("UserRepository", UserRepository);
container.registerSingleton<IAuthRespository>("AuthRepository", AuthRepository);
