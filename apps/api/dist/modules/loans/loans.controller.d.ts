import { AuthRequest } from '../auth/auth.guard';
import { LoansService } from './loans.service';
export declare class LoansController {
    private readonly loansService;
    constructor(loansService: LoansService);
    list(request: AuthRequest, householdId: string, acceptLanguage?: string): Promise<any>;
    create(request: AuthRequest, householdId: string, body: unknown, acceptLanguage?: string): Promise<{
        ok: boolean;
        message: string;
        loan: any;
    }>;
    get(request: AuthRequest, id: string, acceptLanguage?: string): Promise<any>;
    update(request: AuthRequest, id: string, body: unknown, acceptLanguage?: string): Promise<{
        ok: boolean;
        message: string;
        loan: any;
    }>;
}
