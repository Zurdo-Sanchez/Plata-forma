import { PrismaService } from '../../prisma/prisma.service';
export declare class ReportsRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    sumByCategory(householdId: string, start: Date, end: Date): any;
    sumByAccount(householdId: string, start: Date, end: Date): any;
    findCategoriesByIds(ids: string[]): any;
    findAccountsByIds(ids: string[]): any;
}
