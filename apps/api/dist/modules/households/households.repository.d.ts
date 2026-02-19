import { Household, HouseholdMember, Prisma, User } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
export declare class HouseholdsRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    listForUser(userId: string): any;
    findById(id: string): any;
    createHousehold(data: Prisma.HouseholdCreateInput): Promise<Household>;
    updateHousehold(id: string, data: Prisma.HouseholdUpdateInput): Promise<Household>;
    findMembership(userId: string, householdId: string): Promise<HouseholdMember | null>;
    addMember(data: Prisma.HouseholdMemberCreateInput): Promise<HouseholdMember>;
    findUserByEmail(email: string): Promise<User | null>;
}
