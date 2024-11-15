import { z } from "zod";
import { createIssueSchema, updateIssueSchema } from "@/schema/issue.schema";

export type CreateIssueDto = z.infer<typeof createIssueSchema>;
export type UpdateIssueDto = z.infer<typeof updateIssueSchema>;
