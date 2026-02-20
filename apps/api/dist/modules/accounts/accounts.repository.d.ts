import { Account, Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
export declare class AccountsRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    listByHousehold(householdId: string): Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        type: import(".prisma/client").$Enums.AccountType;
        householdId: string;
        currency: string | null;
        isActive: boolean;
    }[]>;
    findById(id: string): Promise<Account | null>;
    createAccount(data: Prisma.AccountCreateInput): Promise<Account>;
    updateAccount(id: string, data: Prisma.AccountUpdateInput): Promise<Account>;
}
