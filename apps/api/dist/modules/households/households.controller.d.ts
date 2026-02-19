import { AuthRequest } from '../auth/auth.guard';
import { HouseholdsService } from './households.service';
export declare class HouseholdsController {
    private readonly householdsService;
    constructor(householdsService: HouseholdsService);
    list(request: AuthRequest): Promise<any>;
    create(request: AuthRequest, body: unknown, acceptLanguage?: string): Promise<{
        ok: boolean;
        message: string;
        household: Household;
    }>;
    get(request: AuthRequest, id: string, acceptLanguage?: string): Promise<any>;
    update(request: AuthRequest, id: string, body: unknown, acceptLanguage?: string): Promise<{
        ok: boolean;
        message: string;
        household: Household;
    }>;
    addMember(request: AuthRequest, id: string, body: unknown, acceptLanguage?: string): Promise<{
        ok: boolean;
        message: string;
        member: HouseholdMember;
    }>;
}
