import { CreditCard, Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
export declare class CreditCardsRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    listByHousehold(householdId: string): any;
    findById(id: string): any;
    findAccountById(id: string): any;
    createWithAccount(householdId: string, accountData: {
        name: string;
    }, cardData: Prisma.CreditCardCreateInput): Promise<CreditCard>;
    createCreditCard(data: Prisma.CreditCardCreateInput): any;
    updateCreditCard(id: string, data: Prisma.CreditCardUpdateInput): any;
}
