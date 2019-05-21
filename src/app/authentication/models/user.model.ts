export class UserModel {
  id: number;
  name: string;
  email: string;
  picture: string;
  emailVerified: boolean;
  password: string;
  provider: string;
  providerId: number;
  totalFollowing: number;
  totalFollowers: number;
}
