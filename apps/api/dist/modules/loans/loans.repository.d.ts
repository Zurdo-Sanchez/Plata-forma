import { Loan, Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
export declare class LoansRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    listByHousehold(householdId: string): any;
    findById(id: string): any;
    findAccountById(id: string): any;
    createWithAccount(householdId: string, accountData: {
        name: string;
    }, loanData: Prisma.LoanCreateInput): Promise<Loan>;
    createLoan(data: Prisma.LoanCreateInput): any;
    updateLoan(id: string, data: Prisma.LoanUpdateInput): any;
}
