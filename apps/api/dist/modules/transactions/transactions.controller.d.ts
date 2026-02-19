import { AuthRequest } from '../auth/auth.guard';
import { TransactionsService } from './transactions.service';
export declare class TransactionsController {
    private readonly transactionsService;
    constructor(transactionsService: TransactionsService);
    list(request: AuthRequest, householdId: string, query: Record<string, string>, acceptLanguage?: string): Promise<any>;
    create(request: AuthRequest, householdId: string, body: unknown, acceptLanguage?: string): Promise<{
        ok: boolean;
        message: string;
        transaction: any;
    }>;
    get(request: AuthRequest, id: string, acceptLanguage?: string): Promise<any>;
    update(request: AuthRequest, id: string, body: unknown, acceptLanguage?: string): Promise<{
        ok: boolean;
        message: string;
        transaction: any;
    }>;
    remove(request: AuthRequest, id: string, acceptLanguage?: string): Promise<{
        ok: boolean;
        message: string;
        transaction: any;
    }>;
}
