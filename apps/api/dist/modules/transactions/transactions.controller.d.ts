import { AuthRequest } from '../auth/auth.guard';
import { TransactionsService } from './transactions.service';
export declare class TransactionsController {
    private readonly transactionsService;
    constructor(transactionsService: TransactionsService);
    list(request: AuthRequest, householdId: string, query: Record<string, string>, acceptLanguage?: string): Promise<({
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
    balances(request: AuthRequest, householdId: string, query: Record<string, string>, acceptLanguage?: string): Promise<{
        month: string;
        range: {
            start: Date;
            end: Date;
        };
        accounts: Record<string, bigint>;
        categories: Record<string, bigint>;
    }>;
    create(request: AuthRequest, householdId: string, body: unknown, acceptLanguage?: string): Promise<{
        ok: boolean;
        message: string;
        transaction: {
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
        };
    }>;
    get(request: AuthRequest, id: string, acceptLanguage?: string): Promise<{
        id: string;
        householdId: string;
        date: Date;
        description: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(request: AuthRequest, id: string, body: unknown, acceptLanguage?: string): Promise<{
        ok: boolean;
        message: string;
        transaction: {
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
        };
    }>;
    remove(request: AuthRequest, id: string, acceptLanguage?: string): Promise<{
        ok: boolean;
        message: string;
        transaction: {
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
        };
    }>;
}
