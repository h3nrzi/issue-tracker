import { z } from "zod";
import { signupSchema } from "./schema";

export type signupDto = z.infer<typeof signupSchema>;
