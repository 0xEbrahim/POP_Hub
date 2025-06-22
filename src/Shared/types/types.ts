export interface IResponse {
  status: string;
  size?: number;
  statusCode: number;
  message?: string;
  data?: object;
  token?: string;
  refreshToken?: string;
  pages?: number;
}
