import { CreditCard, Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
export declare class CreditCardsRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    listByHousehold(householdId: string): Prisma.PrismaPromise<({
        account: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            type: import(".prisma/client").$Enums.AccountType;
            householdId: string;
            currency: string | null;
            isActive: boolean;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        householdId: string;
        isActive: boolean;
        closingDay: number;
        dueDay: number;
        limitAmount: bigint | null;
        accountId: string;
    })[]>;
    findById(id: string): Prisma.Prisma__CreditCardClient<({
        account: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            type: import(".prisma/client").$Enums.AccountType;
            householdId: string;
            currency: string | null;
            isActive: boolean;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        householdId: string;
        isActive: boolean;
        closingDay: number;
        dueDay: number;
        limitAmount: bigint | null;
        accountId: string;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    findAccountById(id: string): Prisma.Prisma__AccountClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        type: import(".prisma/client").$Enums.AccountType;
        householdId: string;
        currency: string | null;
        isActive: boolean;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    createWithAccount(householdId: string, accountData: {
        name: string;
    }, cardData: Prisma.CreditCardCreateWithoutAccountInput): Promise<CreditCard>;
    createCreditCard(data: Prisma.CreditCardCreateInput): Prisma.Prisma__CreditCardClient<{
        account: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            type: import(".prisma/client").$Enums.AccountType;
            householdId: string;
            currency: string | null;
            isActive: boolean;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        householdId: string;
        isActive: boolean;
        closingDay: number;
        dueDay: number;
        limitAmount: bigint | null;
        accountId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    updateCreditCard(id: string, data: Prisma.CreditCardUpdateInput): Prisma.Prisma__CreditCardClient<{
        account: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            type: import(".prisma/client").$Enums.AccountType;
            householdId: string;
            currency: string | null;
            isActive: boolean;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        householdId: string;
        isActive: boolean;
        closingDay: number;
        dueDay: number;
        limitAmount: bigint | null;
        accountId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    archiveCreditCard(id: string): Promise<{
        account: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            type: import(".prisma/client").$Enums.AccountType;
            householdId: string;
            currency: string | null;
            isActive: boolean;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        householdId: string;
        isActive: boolean;
        closingDay: number;
        dueDay: number;
        limitAmount: bigint | null;
        accountId: string;
    }>;
}
