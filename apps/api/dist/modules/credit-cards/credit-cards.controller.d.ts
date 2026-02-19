import { AuthRequest } from '../auth/auth.guard';
import { CreditCardsService } from './credit-cards.service';
export declare class CreditCardsController {
    private readonly creditCardsService;
    constructor(creditCardsService: CreditCardsService);
    list(request: AuthRequest, householdId: string, acceptLanguage?: string): Promise<any>;
    create(request: AuthRequest, householdId: string, body: unknown, acceptLanguage?: string): Promise<{
        ok: boolean;
        message: string;
        card: any;
    }>;
    get(request: AuthRequest, id: string, acceptLanguage?: string): Promise<any>;
    update(request: AuthRequest, id: string, body: unknown, acceptLanguage?: string): Promise<{
        ok: boolean;
        message: string;
        card: any;
    }>;
}
