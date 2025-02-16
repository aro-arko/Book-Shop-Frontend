import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join((process.cwd(), ".env")) });

export default {
  backendUrl: process.env.REACT_APP_BACKEND_URL,
};
