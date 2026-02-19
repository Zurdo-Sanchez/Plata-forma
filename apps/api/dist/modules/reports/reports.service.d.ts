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
            income: any;
            expense: any;
            net: number;
        };
        byCategory: any;
        byAccount: any;
    }>;
    private parseMonth;
}
