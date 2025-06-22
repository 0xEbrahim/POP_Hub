export interface IRegisterBody {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IUser {
  id: string;
  username: string;
  email: string;
  password?: string;
  bio?: string | null;
  avatarUrl?: string | null;
  role: string;
  subscriptionStatus?: string | null;
  stripeCustomerId?: string | null;
  createdAt: Date;
  updatedAt: Date;
}
