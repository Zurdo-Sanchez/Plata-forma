import { CreateAccountDto, UpdateAccountDto } from './accounts.schemas';
import { AccountsRepository } from './accounts.repository';
import { HouseholdsService } from '../households/households.service';
export declare class AccountsService {
    private readonly accountsRepository;
    private readonly householdsService;
    constructor(accountsRepository: AccountsRepository, householdsService: HouseholdsService);
    list(userId: string, householdId: string, acceptLanguage?: string): Promise<any>;
    create(userId: string, householdId: string, payload: CreateAccountDto, acceptLanguage?: string): Promise<Account>;
    get(userId: string, accountId: string, acceptLanguage?: string): Promise<any>;
    update(userId: string, accountId: string, payload: UpdateAccountDto, acceptLanguage?: string): Promise<Account>;
    archive(userId: string, accountId: string, acceptLanguage?: string): Promise<Account>;
}
