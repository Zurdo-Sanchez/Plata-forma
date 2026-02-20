import { CreditCard, Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
export declare class CreditCardsRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    listByHousehold(householdId: string): Prisma.PrismaPromise<({
        account: {
            id: string;
            householdId: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            type: import(".prisma/client").$Enums.AccountType;
            currency: string | null;
            isActive: boolean;
        };
    } & {
        id: string;
        householdId: string;
        accountId: string;
        name: string;
        closingDay: number;
        dueDay: number;
        limitAmount: bigint | null;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    findById(id: string): Prisma.Prisma__CreditCardClient<({
        account: {
            id: string;
            householdId: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            type: import(".prisma/client").$Enums.AccountType;
            currency: string | null;
            isActive: boolean;
        };
    } & {
        id: string;
        householdId: string;
        accountId: string;
        name: string;
        closingDay: number;
        dueDay: number;
        limitAmount: bigint | null;
        createdAt: Date;
        updatedAt: Date;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    findAccountById(id: string): Prisma.Prisma__AccountClient<{
        id: string;
        householdId: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        type: import(".prisma/client").$Enums.AccountType;
        currency: string | null;
        isActive: boolean;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    createWithAccount(householdId: string, accountData: {
        name: string;
    }, cardData: Prisma.CreditCardCreateWithoutAccountInput): Promise<CreditCard>;
    createCreditCard(data: Prisma.CreditCardCreateInput): Prisma.Prisma__CreditCardClient<{
        account: {
            id: string;
            householdId: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            type: import(".prisma/client").$Enums.AccountType;
            currency: string | null;
            isActive: boolean;
        };
    } & {
        id: string;
        householdId: string;
        accountId: string;
        name: string;
        closingDay: number;
        dueDay: number;
        limitAmount: bigint | null;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    updateCreditCard(id: string, data: Prisma.CreditCardUpdateInput): Prisma.Prisma__CreditCardClient<{
        account: {
            id: string;
            householdId: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            type: import(".prisma/client").$Enums.AccountType;
            currency: string | null;
            isActive: boolean;
        };
    } & {
        id: string;
        householdId: string;
        accountId: string;
        name: string;
        closingDay: number;
        dueDay: number;
        limitAmount: bigint | null;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
