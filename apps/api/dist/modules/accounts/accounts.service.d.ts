import { CreateAccountDto, UpdateAccountDto } from './accounts.schemas';
import { AccountsRepository } from './accounts.repository';
import { HouseholdsService } from '../households/households.service';
export declare class AccountsService {
    private readonly accountsRepository;
    private readonly householdsService;
    constructor(accountsRepository: AccountsRepository, householdsService: HouseholdsService);
    list(userId: string, householdId: string, acceptLanguage?: string): Promise<{
        id: string;
        householdId: string;
        name: string;
        type: import(".prisma/client").$Enums.AccountType;
        currency: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    create(userId: string, householdId: string, payload: CreateAccountDto, acceptLanguage?: string): Promise<{
        id: string;
        householdId: string;
        name: string;
        type: import(".prisma/client").$Enums.AccountType;
        currency: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    get(userId: string, accountId: string, acceptLanguage?: string): Promise<{
        id: string;
        householdId: string;
        name: string;
        type: import(".prisma/client").$Enums.AccountType;
        currency: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(userId: string, accountId: string, payload: UpdateAccountDto, acceptLanguage?: string): Promise<{
        id: string;
        householdId: string;
        name: string;
        type: import(".prisma/client").$Enums.AccountType;
        currency: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    archive(userId: string, accountId: string, acceptLanguage?: string): Promise<{
        id: string;
        householdId: string;
        name: string;
        type: import(".prisma/client").$Enums.AccountType;
        currency: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
