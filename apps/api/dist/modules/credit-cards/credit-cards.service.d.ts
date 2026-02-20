import { CreditCardsRepository } from './credit-cards.repository';
import { HouseholdsService } from '../households/households.service';
import { CreateCreditCardDto, UpdateCreditCardDto } from './credit-cards.schemas';
export declare class CreditCardsService {
    private readonly creditCardsRepository;
    private readonly householdsService;
    constructor(creditCardsRepository: CreditCardsRepository, householdsService: HouseholdsService);
    list(userId: string, householdId: string, acceptLanguage?: string): Promise<({
        account: {
            id: string;
            householdId: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            type: import(".prisma/client").$Enums.AccountType;
            currency: string | null;
            isActive: boolean;
        };
    } & {
        id: string;
        householdId: string;
        accountId: string;
        name: string;
        closingDay: number;
        dueDay: number;
        limitAmount: bigint | null;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    create(userId: string, householdId: string, payload: CreateCreditCardDto, acceptLanguage?: string): Promise<{
        id: string;
        householdId: string;
        accountId: string;
        name: string;
        closingDay: number;
        dueDay: number;
        limitAmount: bigint | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    get(userId: string, cardId: string, acceptLanguage?: string): Promise<{
        account: {
            id: string;
            householdId: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            type: import(".prisma/client").$Enums.AccountType;
            currency: string | null;
            isActive: boolean;
        };
    } & {
        id: string;
        householdId: string;
        accountId: string;
        name: string;
        closingDay: number;
        dueDay: number;
        limitAmount: bigint | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(userId: string, cardId: string, payload: UpdateCreditCardDto, acceptLanguage?: string): Promise<{
        account: {
            id: string;
            householdId: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            type: import(".prisma/client").$Enums.AccountType;
            currency: string | null;
            isActive: boolean;
        };
    } & {
        id: string;
        householdId: string;
        accountId: string;
        name: string;
        closingDay: number;
        dueDay: number;
        limitAmount: bigint | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
