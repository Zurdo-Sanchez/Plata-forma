import { AuthRequest } from '../auth/auth.guard';
import { AccountsService } from './accounts.service';
export declare class AccountsController {
    private readonly accountsService;
    constructor(accountsService: AccountsService);
    list(request: AuthRequest, householdId: string, acceptLanguage?: string): Promise<any>;
    create(request: AuthRequest, householdId: string, body: unknown, acceptLanguage?: string): Promise<{
        ok: boolean;
        message: string;
        account: Account;
    }>;
    get(request: AuthRequest, id: string, acceptLanguage?: string): Promise<any>;
    update(request: AuthRequest, id: string, body: unknown, acceptLanguage?: string): Promise<{
        ok: boolean;
        message: string;
        account: Account;
    }>;
    archive(request: AuthRequest, id: string, acceptLanguage?: string): Promise<{
        ok: boolean;
        message: string;
        account: Account;
    }>;
}
