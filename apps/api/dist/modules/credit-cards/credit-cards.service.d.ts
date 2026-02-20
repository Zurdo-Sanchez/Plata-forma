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
            name: string;
            currency: string | null;
            createdAt: Date;
            updatedAt: Date;
            householdId: string;
            type: import(".prisma/client").$Enums.AccountType;
            isActive: boolean;
        };
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        householdId: string;
        accountId: string;
        closingDay: number;
        dueDay: number;
        limitAmount: bigint | null;
    })[]>;
    create(userId: string, householdId: string, payload: CreateCreditCardDto, acceptLanguage?: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        householdId: string;
        accountId: string;
        closingDay: number;
        dueDay: number;
        limitAmount: bigint | null;
    }>;
    get(userId: string, cardId: string, acceptLanguage?: string): Promise<{
        account: {
            id: string;
            name: string;
            currency: string | null;
            createdAt: Date;
            updatedAt: Date;
            householdId: string;
            type: import(".prisma/client").$Enums.AccountType;
            isActive: boolean;
        };
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        householdId: string;
        accountId: string;
        closingDay: number;
        dueDay: number;
        limitAmount: bigint | null;
    }>;
    update(userId: string, cardId: string, payload: UpdateCreditCardDto, acceptLanguage?: string): Promise<{
        account: {
            id: string;
            name: string;
            currency: string | null;
            createdAt: Date;
            updatedAt: Date;
            householdId: string;
            type: import(".prisma/client").$Enums.AccountType;
            isActive: boolean;
        };
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        householdId: string;
        accountId: string;
        closingDay: number;
        dueDay: number;
        limitAmount: bigint | null;
    }>;
}
