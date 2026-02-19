import { Account, Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
export declare class AccountsRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    listByHousehold(householdId: string): any;
    findById(id: string): Promise<Account | null>;
    createAccount(data: Prisma.AccountCreateInput): Promise<Account>;
    updateAccount(id: string, data: Prisma.AccountUpdateInput): Promise<Account>;
}
