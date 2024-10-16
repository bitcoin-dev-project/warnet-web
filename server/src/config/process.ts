import { config } from "dotenv"

config({
  path: '../.env'
})

export const ADMIN_KEY = process.env.ADMIN_KEY ?? "";
