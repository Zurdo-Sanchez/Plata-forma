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
            transactionId: string;
            accountId: string;
            categoryId: string | null;
            amount: bigint;
            memo: string | null;
        }[];
    } & {
        id: string;
        householdId: string;
        date: Date;
        description: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    balances(userId: string, householdId: string, month: string, acceptLanguage?: string): Promise<{
        month: string;
        range: {
            start: Date;
            end: Date;
        };
        accounts: Record<string, bigint>;
        categories: Record<string, bigint>;
    }>;
    create(userId: string, householdId: string, payload: CreateTransactionDto, acceptLanguage?: string): Promise<{
        lines: {
            id: number;
            createdAt: Date;
            transactionId: string;
            accountId: string;
            categoryId: string | null;
            amount: bigint;
            memo: string | null;
        }[];
    } & {
        id: string;
        householdId: string;
        date: Date;
        description: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    get(userId: string, transactionId: string, acceptLanguage?: string): Promise<{
        id: string;
        householdId: string;
        date: Date;
        description: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(userId: string, transactionId: string, payload: UpdateTransactionDto, acceptLanguage?: string): Promise<{
        lines: {
            id: number;
            createdAt: Date;
            transactionId: string;
            accountId: string;
            categoryId: string | null;
            amount: bigint;
            memo: string | null;
        }[];
    } & {
        id: string;
        householdId: string;
        date: Date;
        description: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(userId: string, transactionId: string, acceptLanguage?: string): Promise<{
        lines: {
            id: number;
            createdAt: Date;
            transactionId: string;
            accountId: string;
            categoryId: string | null;
            amount: bigint;
            memo: string | null;
        }[];
    } & {
        id: string;
        householdId: string;
        date: Date;
        description: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    private parseDate;
    private parseMonth;
    private parseAmountToCents;
    private validateLines;
}
