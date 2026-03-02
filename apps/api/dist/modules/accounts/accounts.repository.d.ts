import { Account, Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
export declare class AccountsRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private readonly SYSTEM_ACCOUNT_PREFIX;
    listByHousehold(householdId: string): Prisma.PrismaPromise<{
        id: string;
        householdId: string;
        name: string;
        type: import(".prisma/client").$Enums.AccountType;
        currency: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    sumByAccountAllTime(householdId: string): Prisma.GetTransactionLineGroupByPayload<{
        by: "accountId"[];
        _sum: {
            amount: true;
        };
        where: {
            transaction: {
                householdId: string;
                isActive: true;
            };
        };
    }>;
    findById(id: string): Promise<Account | null>;
    createAccount(data: Prisma.AccountCreateInput): Promise<Account>;
    updateAccount(id: string, data: Prisma.AccountUpdateInput): Promise<Account>;
}
