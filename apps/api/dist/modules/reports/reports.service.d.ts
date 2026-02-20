import { HouseholdsService } from '../households/households.service';
import { ReportsRepository } from './reports.repository';
import { MonthlyReportQueryDto } from './reports.schemas';
export declare class ReportsService {
    private readonly reportsRepository;
    private readonly householdsService;
    constructor(reportsRepository: ReportsRepository, householdsService: HouseholdsService);
    monthly(userId: string, householdId: string, query: MonthlyReportQueryDto, acceptLanguage?: string): Promise<{
        month: string;
        range: {
            start: Date;
            end: Date;
        };
        totals: {
            income: bigint;
            expense: bigint;
            net: bigint;
        };
        byCategory: {
            categoryId: string | null;
            name: string;
            type: import(".prisma/client").$Enums.CategoryType | null;
            amount: bigint;
        }[];
        byAccount: {
            accountId: string;
            name: string;
            type: import(".prisma/client").$Enums.AccountType | null;
            amount: bigint;
        }[];
    }>;
    private parseMonth;
}
