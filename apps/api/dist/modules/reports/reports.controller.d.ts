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
            income: any;
            expense: any;
            net: number;
        };
        byCategory: any;
        byAccount: any;
    }>;
}
