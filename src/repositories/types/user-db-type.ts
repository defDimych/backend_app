import { WithId } from "mongodb";

export type UserAccountDBType = WithId<{
    accountData: UserAccountType,
    emailConfirmation: EmailConfirmationType
}>

export type EmailConfirmationType = {
    isConfirmed: boolean,
    confirmationCode: string,
    expirationDate: Date
}

export type UserAccountType = {
    email: string,
    userName: string,
    passwordHash: string,
    passwordSalt: string,
    createdAt: Date
}