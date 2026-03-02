import { z } from 'zod';
export declare const TransactionIdSchema: z.ZodString;
export declare const TransactionLineSchema: z.ZodObject<{
    accountId: z.ZodString;
    categoryId: z.ZodOptional<z.ZodString>;
    amount: z.ZodString;
    memo: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    accountId: string;
    amount: string;
    categoryId?: string | undefined;
    memo?: string | undefined;
}, {
    accountId: string;
    amount: string;
    categoryId?: string | undefined;
    memo?: string | undefined;
}>;
export declare const CreateTransactionSchema: z.ZodEffects<z.ZodObject<{
    date: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    lines: z.ZodOptional<z.ZodArray<z.ZodObject<{
        accountId: z.ZodString;
        categoryId: z.ZodOptional<z.ZodString>;
        amount: z.ZodString;
        memo: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        accountId: string;
        amount: string;
        categoryId?: string | undefined;
        memo?: string | undefined;
    }, {
        accountId: string;
        amount: string;
        categoryId?: string | undefined;
        memo?: string | undefined;
    }>, "many">>;
    entry: z.ZodOptional<z.ZodObject<{
        accountId: z.ZodString;
        categoryId: z.ZodString;
        amount: z.ZodString;
        type: z.ZodEnum<["INCOME", "EXPENSE"]>;
        memo: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        accountId: string;
        categoryId: string;
        amount: string;
        type: "INCOME" | "EXPENSE";
        memo?: string | undefined;
    }, {
        accountId: string;
        categoryId: string;
        amount: string;
        type: "INCOME" | "EXPENSE";
        memo?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    date: string;
    description?: string | undefined;
    lines?: {
        accountId: string;
        amount: string;
        categoryId?: string | undefined;
        memo?: string | undefined;
    }[] | undefined;
    entry?: {
        accountId: string;
        categoryId: string;
        amount: string;
        type: "INCOME" | "EXPENSE";
        memo?: string | undefined;
    } | undefined;
}, {
    date: string;
    description?: string | undefined;
    lines?: {
        accountId: string;
        amount: string;
        categoryId?: string | undefined;
        memo?: string | undefined;
    }[] | undefined;
    entry?: {
        accountId: string;
        categoryId: string;
        amount: string;
        type: "INCOME" | "EXPENSE";
        memo?: string | undefined;
    } | undefined;
}>, {
    date: string;
    description?: string | undefined;
    lines?: {
        accountId: string;
        amount: string;
        categoryId?: string | undefined;
        memo?: string | undefined;
    }[] | undefined;
    entry?: {
        accountId: string;
        categoryId: string;
        amount: string;
        type: "INCOME" | "EXPENSE";
        memo?: string | undefined;
    } | undefined;
}, {
    date: string;
    description?: string | undefined;
    lines?: {
        accountId: string;
        amount: string;
        categoryId?: string | undefined;
        memo?: string | undefined;
    }[] | undefined;
    entry?: {
        accountId: string;
        categoryId: string;
        amount: string;
        type: "INCOME" | "EXPENSE";
        memo?: string | undefined;
    } | undefined;
}>;
export declare const UpdateTransactionSchema: z.ZodEffects<z.ZodObject<{
    date: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    lines: z.ZodOptional<z.ZodArray<z.ZodObject<{
        accountId: z.ZodString;
        categoryId: z.ZodOptional<z.ZodString>;
        amount: z.ZodString;
        memo: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        accountId: string;
        amount: string;
        categoryId?: string | undefined;
        memo?: string | undefined;
    }, {
        accountId: string;
        amount: string;
        categoryId?: string | undefined;
        memo?: string | undefined;
    }>, "many">>;
    entry: z.ZodOptional<z.ZodObject<{
        accountId: z.ZodString;
        categoryId: z.ZodString;
        amount: z.ZodString;
        type: z.ZodEnum<["INCOME", "EXPENSE"]>;
        memo: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        accountId: string;
        categoryId: string;
        amount: string;
        type: "INCOME" | "EXPENSE";
        memo?: string | undefined;
    }, {
        accountId: string;
        categoryId: string;
        amount: string;
        type: "INCOME" | "EXPENSE";
        memo?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    date?: string | undefined;
    description?: string | undefined;
    lines?: {
        accountId: string;
        amount: string;
        categoryId?: string | undefined;
        memo?: string | undefined;
    }[] | undefined;
    entry?: {
        accountId: string;
        categoryId: string;
        amount: string;
        type: "INCOME" | "EXPENSE";
        memo?: string | undefined;
    } | undefined;
}, {
    date?: string | undefined;
    description?: string | undefined;
    lines?: {
        accountId: string;
        amount: string;
        categoryId?: string | undefined;
        memo?: string | undefined;
    }[] | undefined;
    entry?: {
        accountId: string;
        categoryId: string;
        amount: string;
        type: "INCOME" | "EXPENSE";
        memo?: string | undefined;
    } | undefined;
}>, {
    date?: string | undefined;
    description?: string | undefined;
    lines?: {
        accountId: string;
        amount: string;
        categoryId?: string | undefined;
        memo?: string | undefined;
    }[] | undefined;
    entry?: {
        accountId: string;
        categoryId: string;
        amount: string;
        type: "INCOME" | "EXPENSE";
        memo?: string | undefined;
    } | undefined;
}, {
    date?: string | undefined;
    description?: string | undefined;
    lines?: {
        accountId: string;
        amount: string;
        categoryId?: string | undefined;
        memo?: string | undefined;
    }[] | undefined;
    entry?: {
        accountId: string;
        categoryId: string;
        amount: string;
        type: "INCOME" | "EXPENSE";
        memo?: string | undefined;
    } | undefined;
}>;
export declare const TransactionsQuerySchema: z.ZodObject<{
    from: z.ZodOptional<z.ZodString>;
    to: z.ZodOptional<z.ZodString>;
    accountId: z.ZodOptional<z.ZodString>;
    categoryId: z.ZodOptional<z.ZodString>;
    search: z.ZodOptional<z.ZodString>;
    minAmount: z.ZodOptional<z.ZodString>;
    maxAmount: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    accountId?: string | undefined;
    categoryId?: string | undefined;
    from?: string | undefined;
    to?: string | undefined;
    search?: string | undefined;
    minAmount?: string | undefined;
    maxAmount?: string | undefined;
}, {
    accountId?: string | undefined;
    categoryId?: string | undefined;
    from?: string | undefined;
    to?: string | undefined;
    search?: string | undefined;
    minAmount?: string | undefined;
    maxAmount?: string | undefined;
}>;
export type CreateTransactionDto = z.infer<typeof CreateTransactionSchema>;
export type UpdateTransactionDto = z.infer<typeof UpdateTransactionSchema>;
export type TransactionLineDto = z.infer<typeof TransactionLineSchema>;
export type TransactionsQueryDto = z.infer<typeof TransactionsQuerySchema>;
