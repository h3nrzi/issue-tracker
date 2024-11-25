import { Issue as IssuePrisma, User } from "@prisma/client"

export default interface Issue extends IssuePrisma {
    userCreatedIssue: User;
    userAssignedIssue?: User;
}