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
        createdAt: Date;
        updatedAt: Date;
        name: string;
        currency: string | null;
    })[]>;
    create(userId: string, payload: CreateHouseholdDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        currency: string | null;
    }>;
    get(userId: string, householdId: string, acceptLanguage?: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        currency: string | null;
    }>;
    update(userId: string, householdId: string, payload: UpdateHouseholdDto, acceptLanguage?: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        currency: string | null;
    }>;
    addMember(userId: string, householdId: string, payload: AddMemberDto, acceptLanguage?: string): Promise<{
        id: number;
        createdAt: Date;
        userId: string;
        role: import(".prisma/client").$Enums.HouseholdRole;
        householdId: string;
    }>;
    assertMember(userId: string, householdId: string, acceptLanguage?: string): Promise<{
        id: number;
        createdAt: Date;
        userId: string;
        role: import(".prisma/client").$Enums.HouseholdRole;
        householdId: string;
    }>;
    assertOwner(userId: string, householdId: string, acceptLanguage?: string): Promise<{
        id: number;
        createdAt: Date;
        userId: string;
        role: import(".prisma/client").$Enums.HouseholdRole;
        householdId: string;
    }>;
}
