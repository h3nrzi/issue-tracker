import { z } from "zod";

export const createIssueSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required.")
    .max(65535, "Title is too long."),
  description: z
    .string()
    .min(1, "Description is required.")
    .max(65535, "Description is too long.")
});

export const updateIssueSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required.")
    .max(65535, "Title is too long.")
    .optional(),
  description: z
    .string()
    .min(1, "Description is required.")
    .max(65535, "Description is too long.")
    .optional(),
  userAssignedIssueId: z
    .string()
    .min(1, "userAssignedIssueId is required.")
    .max(65535, "userAssignedIssueId is too long.")
    .optional()
    .nullable()
});
