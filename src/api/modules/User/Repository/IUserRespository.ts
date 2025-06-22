import { IRegisterBody, IUser } from "../Models/User.Models";

export interface IUserRepository {
  create(data: IRegisterBody): Promise<IUser>;
  findByEmail(email: string): Promise<IUser | null>;
  findByUsername(username: string): Promise<IUser | null>;
}
