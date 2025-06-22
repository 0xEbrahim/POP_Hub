import { prisma } from "@Shared/config/prisma";
import { IRegisterBody, IUser } from "../Models/User.Models";
import { IUserRepository } from "./IUserRespository";

type nullableUser = IUser | null;

class UserRepository implements IUserRepository {
  async findByUsername(username: string): Promise<nullableUser> {
    const user: nullableUser = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });
    return user;
  }
  async findByEmail(email: string): Promise<nullableUser> {
    const user: nullableUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    return user;
  }
  async create({ username, email, password }: IRegisterBody): Promise<IUser> {
    const user = await prisma.user.create({
      data: {
        email,
        password,
        username,
      },
    });
    return user;
  }
}

export default UserRepository;
