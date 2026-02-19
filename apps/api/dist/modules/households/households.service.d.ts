import { AddMemberDto, CreateHouseholdDto, UpdateHouseholdDto } from './households.schemas';
import { HouseholdsRepository } from './households.repository';
export declare class HouseholdsService {
    private readonly repository;
    constructor(repository: HouseholdsRepository);
    list(userId: string): Promise<any>;
    create(userId: string, payload: CreateHouseholdDto): Promise<Household>;
    get(userId: string, householdId: string, acceptLanguage?: string): Promise<any>;
    update(userId: string, householdId: string, payload: UpdateHouseholdDto, acceptLanguage?: string): Promise<Household>;
    addMember(userId: string, householdId: string, payload: AddMemberDto, acceptLanguage?: string): Promise<HouseholdMember>;
    assertMember(userId: string, householdId: string, acceptLanguage?: string): Promise<any>;
    assertOwner(userId: string, householdId: string, acceptLanguage?: string): Promise<any>;
}
