import { User } from "@prisma/client";

export type RegisterUserApiReturn = {
  message: string;
  user: User;
  error?: string;
};
