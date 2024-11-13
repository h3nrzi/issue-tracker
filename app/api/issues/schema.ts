import { z } from "zod";

export const createIssueSchema = z.object({
  title: z //
    .string()
    .min(1, "Title is required.")
    .max(200, "Title is too long."),
  description: z
    .string()
    .min(1, "Description is required.")
    .max(200, "Description is too long."),
});

export type CreateIssueDto = z.infer<typeof createIssueSchema>;
