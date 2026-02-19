import { TransactionsRepository } from './transactions.repository';
import { CreateTransactionDto, TransactionsQueryDto, UpdateTransactionDto } from './transactions.schemas';
import { HouseholdsService } from '../households/households.service';
export declare class TransactionsService {
    private readonly transactionsRepository;
    private readonly householdsService;
    constructor(transactionsRepository: TransactionsRepository, householdsService: HouseholdsService);
    list(userId: string, householdId: string, query: TransactionsQueryDto, acceptLanguage?: string): Promise<any>;
    create(userId: string, householdId: string, payload: CreateTransactionDto, acceptLanguage?: string): Promise<any>;
    get(userId: string, transactionId: string, acceptLanguage?: string): Promise<any>;
    update(userId: string, transactionId: string, payload: UpdateTransactionDto, acceptLanguage?: string): Promise<any>;
    remove(userId: string, transactionId: string, acceptLanguage?: string): Promise<any>;
    private parseDate;
    private parseBigint;
    private validateLines;
}
