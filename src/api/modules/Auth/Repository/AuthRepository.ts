import UserRepository from "@Modules/User/Repository/UserRepository";
import { IAuthRespository } from "./IAuthRepository";

class AuthRepository extends UserRepository implements IAuthRespository {}

export default AuthRepository;
