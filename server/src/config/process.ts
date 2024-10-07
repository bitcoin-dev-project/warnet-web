import { config } from "dotenv"

config()

export const ADMIN_KEY = process.env.ADMIN_KEY ?? "";
