import { AuthRequest } from '../auth/auth.guard';
import { HouseholdsService } from './households.service';
export declare class HouseholdsController {
    private readonly householdsService;
    constructor(householdsService: HouseholdsService);
    list(request: AuthRequest): Promise<({
        members: {
            role: import(".prisma/client").$Enums.HouseholdRole;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        currency: string | null;
    })[]>;
    create(request: AuthRequest, body: unknown, acceptLanguage?: string): Promise<{
        ok: boolean;
        message: string;
        household: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            currency: string | null;
        };
    }>;
    get(request: AuthRequest, id: string, acceptLanguage?: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        currency: string | null;
    }>;
    update(request: AuthRequest, id: string, body: unknown, acceptLanguage?: string): Promise<{
        ok: boolean;
        message: string;
        household: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            currency: string | null;
        };
    }>;
    addMember(request: AuthRequest, id: string, body: unknown, acceptLanguage?: string): Promise<{
        ok: boolean;
        message: string;
        member: {
            id: number;
            createdAt: Date;
            userId: string;
            role: import(".prisma/client").$Enums.HouseholdRole;
            householdId: string;
        };
    }>;
}
