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
        createdAt: Date;
        updatedAt: Date;
        householdId: string;
        date: Date;
        description: string | null;
    })[]>;
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
            createdAt: Date;
            updatedAt: Date;
            householdId: string;
            date: Date;
            description: string | null;
        };
    }>;
    get(request: AuthRequest, id: string, acceptLanguage?: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        householdId: string;
        date: Date;
        description: string | null;
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
            createdAt: Date;
            updatedAt: Date;
            householdId: string;
            date: Date;
            description: string | null;
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
            createdAt: Date;
            updatedAt: Date;
            householdId: string;
            date: Date;
            description: string | null;
        };
    }>;
}
