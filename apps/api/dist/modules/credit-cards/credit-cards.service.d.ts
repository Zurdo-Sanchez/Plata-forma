import { CreditCardsRepository } from './credit-cards.repository';
import { HouseholdsService } from '../households/households.service';
import { CreateCreditCardDto, UpdateCreditCardDto } from './credit-cards.schemas';
export declare class CreditCardsService {
    private readonly creditCardsRepository;
    private readonly householdsService;
    constructor(creditCardsRepository: CreditCardsRepository, householdsService: HouseholdsService);
    list(userId: string, householdId: string, acceptLanguage?: string): Promise<any>;
    create(userId: string, householdId: string, payload: CreateCreditCardDto, acceptLanguage?: string): Promise<any>;
    get(userId: string, cardId: string, acceptLanguage?: string): Promise<any>;
    update(userId: string, cardId: string, payload: UpdateCreditCardDto, acceptLanguage?: string): Promise<any>;
}
