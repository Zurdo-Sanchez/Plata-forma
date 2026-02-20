import { TransactionsRepository } from './transactions.repository';
import { CreateTransactionDto, TransactionsQueryDto, UpdateTransactionDto } from './transactions.schemas';
import { HouseholdsService } from '../households/households.service';
export declare class TransactionsService {
    private readonly transactionsRepository;
    private readonly householdsService;
    constructor(transactionsRepository: TransactionsRepository, householdsService: HouseholdsService);
    list(userId: string, householdId: string, query: TransactionsQueryDto, acceptLanguage?: string): Promise<({
        lines: {
            id: number;
            createdAt: Date;
            accountId: string;
            transactionId: string;
            categoryId: string | null;
            amount: bigint;
            memo: string | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        householdId: string;
        date: Date;
        description: string | null;
    })[]>;
    create(userId: string, householdId: string, payload: CreateTransactionDto, acceptLanguage?: string): Promise<{
        lines: {
            id: number;
            createdAt: Date;
            accountId: string;
            transactionId: string;
            categoryId: string | null;
            amount: bigint;
            memo: string | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        householdId: string;
        date: Date;
        description: string | null;
    }>;
    get(userId: string, transactionId: string, acceptLanguage?: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        householdId: string;
        date: Date;
        description: string | null;
    }>;
    update(userId: string, transactionId: string, payload: UpdateTransactionDto, acceptLanguage?: string): Promise<{
        lines: {
            id: number;
            createdAt: Date;
            accountId: string;
            transactionId: string;
            categoryId: string | null;
            amount: bigint;
            memo: string | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        householdId: string;
        date: Date;
        description: string | null;
    }>;
    remove(userId: string, transactionId: string, acceptLanguage?: string): Promise<{
        lines: {
            id: number;
            createdAt: Date;
            accountId: string;
            transactionId: string;
            categoryId: string | null;
            amount: bigint;
            memo: string | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        householdId: string;
        date: Date;
        description: string | null;
    }>;
    private parseDate;
    private parseBigint;
    private validateLines;
}
