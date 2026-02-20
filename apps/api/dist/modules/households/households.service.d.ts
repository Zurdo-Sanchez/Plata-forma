import { AddMemberDto, CreateHouseholdDto, UpdateHouseholdDto } from './households.schemas';
import { HouseholdsRepository } from './households.repository';
export declare class HouseholdsService {
    private readonly repository;
    constructor(repository: HouseholdsRepository);
    list(userId: string): Promise<({
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
    create(userId: string, payload: CreateHouseholdDto): Promise<{
        id: string;
        name: string;
        currency: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    get(userId: string, householdId: string, acceptLanguage?: string): Promise<{
        id: string;
        name: string;
        currency: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(userId: string, householdId: string, payload: UpdateHouseholdDto, acceptLanguage?: string): Promise<{
        id: string;
        name: string;
        currency: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    addMember(userId: string, householdId: string, payload: AddMemberDto, acceptLanguage?: string): Promise<{
        id: number;
        createdAt: Date;
        userId: string;
        householdId: string;
        role: import(".prisma/client").$Enums.HouseholdRole;
    }>;
    remove(userId: string, householdId: string, acceptLanguage?: string): Promise<{
        id: string;
        name: string;
        currency: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    assertMember(userId: string, householdId: string, acceptLanguage?: string): Promise<{
        id: number;
        createdAt: Date;
        userId: string;
        householdId: string;
        role: import(".prisma/client").$Enums.HouseholdRole;
    }>;
    assertOwner(userId: string, householdId: string, acceptLanguage?: string): Promise<{
        id: number;
        createdAt: Date;
        userId: string;
        householdId: string;
        role: import(".prisma/client").$Enums.HouseholdRole;
    }>;
}
