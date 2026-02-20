import { CreateAccountDto, UpdateAccountDto } from './accounts.schemas';
import { AccountsRepository } from './accounts.repository';
import { HouseholdsService } from '../households/households.service';
export declare class AccountsService {
    private readonly accountsRepository;
    private readonly householdsService;
    constructor(accountsRepository: AccountsRepository, householdsService: HouseholdsService);
    list(userId: string, householdId: string, acceptLanguage?: string): Promise<{
        id: string;
        name: string;
        currency: string | null;
        createdAt: Date;
        updatedAt: Date;
        householdId: string;
        type: import(".prisma/client").$Enums.AccountType;
        isActive: boolean;
    }[]>;
    create(userId: string, householdId: string, payload: CreateAccountDto, acceptLanguage?: string): Promise<{
        id: string;
        name: string;
        currency: string | null;
        createdAt: Date;
        updatedAt: Date;
        householdId: string;
        type: import(".prisma/client").$Enums.AccountType;
        isActive: boolean;
    }>;
    get(userId: string, accountId: string, acceptLanguage?: string): Promise<{
        id: string;
        name: string;
        currency: string | null;
        createdAt: Date;
        updatedAt: Date;
        householdId: string;
        type: import(".prisma/client").$Enums.AccountType;
        isActive: boolean;
    }>;
    update(userId: string, accountId: string, payload: UpdateAccountDto, acceptLanguage?: string): Promise<{
        id: string;
        name: string;
        currency: string | null;
        createdAt: Date;
        updatedAt: Date;
        householdId: string;
        type: import(".prisma/client").$Enums.AccountType;
        isActive: boolean;
    }>;
    archive(userId: string, accountId: string, acceptLanguage?: string): Promise<{
        id: string;
        name: string;
        currency: string | null;
        createdAt: Date;
        updatedAt: Date;
        householdId: string;
        type: import(".prisma/client").$Enums.AccountType;
        isActive: boolean;
    }>;
}
