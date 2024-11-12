import { z } from "zod";

export const createIssueSchema = z.object({
  title: z.string().min(1).max(177),
  description: z.string().min(1).max(177),
});

export type CreateIssueDto = z.infer<typeof createIssueSchema>;
