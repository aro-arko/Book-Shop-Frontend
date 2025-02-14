import { jwtDecode } from "jwt-decode";
interface CustomJwtPayload {
  email: string;
  role: string;
  iat: number;
  exp: number;
}

export const verifyToken = (token: string): CustomJwtPayload | null => {
  try {
    const decodedToken = jwtDecode<CustomJwtPayload>(token);
    return decodedToken;
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
};
