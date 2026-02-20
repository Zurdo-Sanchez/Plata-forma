import { Household, HouseholdMember, Prisma, User } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
export declare class HouseholdsRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    listForUser(userId: string): Prisma.PrismaPromise<({
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
    findById(id: string): Prisma.Prisma__HouseholdClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        currency: string | null;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    createHousehold(data: Prisma.HouseholdCreateInput): Promise<Household>;
    updateHousehold(id: string, data: Prisma.HouseholdUpdateInput): Promise<Household>;
    findMembership(userId: string, householdId: string): Promise<HouseholdMember | null>;
    addMember(data: Prisma.HouseholdMemberCreateInput): Promise<HouseholdMember>;
    findUserByEmail(email: string): Promise<User | null>;
}
