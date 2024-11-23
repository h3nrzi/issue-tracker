import {Issue} from "@prisma/client";

export default interface IssuesQuery {
  status?: "OPEN" | "CLOSE" | "IN_PROGRESS";
  orderBy?: keyof Issue;
  orderDirection?: "asc" | "desc";
}
