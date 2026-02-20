import { AuthRequest } from '../auth/auth.guard';
import { ReportsService } from './reports.service';
export declare class ReportsController {
    private readonly reportsService;
    constructor(reportsService: ReportsService);
    monthly(request: AuthRequest, householdId: string, query: Record<string, string>, acceptLanguage?: string): Promise<{
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
}
