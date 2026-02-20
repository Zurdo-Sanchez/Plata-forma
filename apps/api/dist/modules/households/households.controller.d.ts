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
        name: string;
        currency: string | null;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    create(request: AuthRequest, body: unknown, acceptLanguage?: string): Promise<{
        ok: boolean;
        message: string;
        household: {
            id: string;
            name: string;
            currency: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    get(request: AuthRequest, id: string, acceptLanguage?: string): Promise<{
        id: string;
        name: string;
        currency: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(request: AuthRequest, id: string, body: unknown, acceptLanguage?: string): Promise<{
        ok: boolean;
        message: string;
        household: {
            id: string;
            name: string;
            currency: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    addMember(request: AuthRequest, id: string, body: unknown, acceptLanguage?: string): Promise<{
        ok: boolean;
        message: string;
        member: {
            id: number;
            createdAt: Date;
            userId: string;
            householdId: string;
            role: import(".prisma/client").$Enums.HouseholdRole;
        };
    }>;
    remove(request: AuthRequest, id: string, acceptLanguage?: string): Promise<{
        ok: boolean;
        message: string;
    }>;
}
