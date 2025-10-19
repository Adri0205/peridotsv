import { betterAuth } from "better-auth";
import { admin } from "better-auth/plugins";
import { sql } from "./sql.js";

export const auth = betterAuth({
  database: sql,
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
  plugins: [admin()],
});
