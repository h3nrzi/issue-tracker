import { z } from "zod";
import { createIssueSchema } from "@/schema/issue.schema";

export type CreateIssueDto = z.infer<typeof createIssueSchema>;
