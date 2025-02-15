import { jwtDecode } from "jwt-decode";
export interface TUser {
  email: string;
  role: string;
  iat: number;
  exp: number;
}

export const verifyToken = (token: string): TUser | null => {
  try {
    const decodedToken = jwtDecode<TUser>(token);
    return decodedToken;
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
};
