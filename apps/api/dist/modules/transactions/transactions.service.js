"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionsService = void 0;
const common_1 = require("@nestjs/common");
const transactions_repository_1 = require("./transactions.repository");
const households_service_1 = require("../households/households.service");
const transactions_messages_1 = require("./transactions.messages");
let TransactionsService = class TransactionsService {
    constructor(transactionsRepository, householdsService) {
        this.transactionsRepository = transactionsRepository;
        this.householdsService = householdsService;
    }
    async list(userId, householdId, query, acceptLanguage) {
        await this.householdsService.assertMember(userId, householdId, acceptLanguage);
        const where = { householdId, isActive: true };
        const dateFilter = {};
        const fromDate = query.from ? this.parseDate(query.from) : null;
        const toDate = query.to ? this.parseDate(query.to) : null;
        if (fromDate)
            dateFilter.gte = fromDate;
        if (toDate)
            dateFilter.lte = toDate;
        if (Object.keys(dateFilter).length) {
            where.date = dateFilter;
        }
        if (query.search) {
            where.description = { contains: query.search, mode: 'insensitive' };
        }
        if (query.accountId || query.categoryId || query.minAmount || query.maxAmount) {
            const lineFilter = {};
            if (query.accountId)
                lineFilter.accountId = query.accountId;
            if (query.categoryId)
                lineFilter.categoryId = query.categoryId;
            const min = this.parseAmountToCents(query.minAmount);
            const max = this.parseAmountToCents(query.maxAmount);
            if (min !== null || max !== null) {
                lineFilter.amount = {};
                if (min !== null)
                    lineFilter.amount.gte = min;
                if (max !== null)
                    lineFilter.amount.lte = max;
            }
            where.lines = { some: lineFilter };
        }
        return this.transactionsRepository.listByHousehold(where);
    }
    async balances(userId, householdId, month, acceptLanguage) {
        await this.householdsService.assertMember(userId, householdId, acceptLanguage);
        const locale = (0, transactions_messages_1.resolveLocale)(acceptLanguage);
        const { start, end } = this.parseMonth(month);
        if (!start || !end) {
            throw new common_1.BadRequestException({ message: (0, transactions_messages_1.t)(locale, 'invalidBody') });
        }
        const [accountSums, categorySums] = await Promise.all([
            this.transactionsRepository.sumByAccountForRange(householdId, start, end),
            this.transactionsRepository.sumByCategoryForRange(householdId, start, end),
        ]);
        const accounts = {};
        const categories = {};
        for (const item of accountSums) {
            if (!item.accountId)
                continue;
            accounts[item.accountId] = item._sum.amount ?? BigInt(0);
        }
        for (const item of categorySums) {
            if (!item.categoryId)
                continue;
            categories[item.categoryId] = item._sum.amount ?? BigInt(0);
        }
        return { month, range: { start, end }, accounts, categories };
    }
    async create(userId, householdId, payload, acceptLanguage) {
        await this.householdsService.assertMember(userId, householdId, acceptLanguage);
        const locale = (0, transactions_messages_1.resolveLocale)(acceptLanguage);
        const date = this.parseDate(payload.date);
        if (!date) {
            throw new common_1.BadRequestException({ message: (0, transactions_messages_1.t)(locale, 'invalidBody') });
        }
        if (payload.entry) {
            const entry = payload.entry;
            const accountIds = [entry.from, entry.to]
                .filter((side) => side.kind === 'ACCOUNT')
                .map((side) => side.id);
            const categoryIds = [entry.from, entry.to]
                .filter((side) => side.kind === 'CATEGORY')
                .map((side) => side.id);
            const [accounts, categories] = await Promise.all([
                this.transactionsRepository.findAccountsByIds(accountIds),
                this.transactionsRepository.findCategoriesByIds(categoryIds),
            ]);
            if (accounts.length !== accountIds.length ||
                accounts.some((acc) => acc.householdId !== householdId || (!acc.isActive && !acc.name?.startsWith('__system__')))) {
                throw new common_1.BadRequestException({ message: (0, transactions_messages_1.t)(locale, 'invalidReference') });
            }
            if (categories.length !== categoryIds.length ||
                categories.some((cat) => cat.householdId !== householdId || !cat.isActive)) {
                throw new common_1.BadRequestException({ message: (0, transactions_messages_1.t)(locale, 'invalidReference') });
            }
            const amount = this.parseAmountToCents(entry.amount);
            if (amount === null) {
                throw new common_1.BadRequestException({ message: (0, transactions_messages_1.t)(locale, 'invalidBody') });
            }
            const systemAccountId = await this.transactionsRepository.ensureSystemAccount(householdId);
            const resolveLine = (side, signedAmount) => {
                if (side.kind === 'ACCOUNT') {
                    return {
                        account: { connect: { id: side.id } },
                        category: undefined,
                        amount: signedAmount,
                    };
                }
                return {
                    account: { connect: { id: systemAccountId } },
                    category: { connect: { id: side.id } },
                    amount: signedAmount,
                };
            };
            const resolveLineFilter = (side, signedAmount) => {
                if (side.kind === 'ACCOUNT') {
                    return {
                        accountId: side.id,
                        categoryId: null,
                        amount: signedAmount,
                    };
                }
                return {
                    accountId: systemAccountId,
                    categoryId: side.id,
                    amount: signedAmount,
                };
            };
            const duplicate = await this.transactionsRepository.findDuplicateEntry(householdId, date, resolveLineFilter(entry.from, -amount), resolveLineFilter(entry.to, amount));
            if (duplicate) {
                throw new common_1.ConflictException({ message: (0, transactions_messages_1.t)(locale, 'duplicate') });
            }
            return this.transactionsRepository.createTransaction({
                household: { connect: { id: householdId } },
                date,
                description: payload.description || null,
                lines: {
                    create: [
                        {
                            ...resolveLine(entry.from, -amount),
                            memo: entry.memo || null,
                        },
                        {
                            ...resolveLine(entry.to, amount),
                            memo: entry.memo || null,
                        },
                    ],
                },
            });
        }
        const lines = await this.validateLines(householdId, payload.lines || [], acceptLanguage);
        return this.transactionsRepository.createTransaction({
            household: { connect: { id: householdId } },
            date,
            description: payload.description || null,
            lines: {
                create: lines.map((line) => ({
                    account: { connect: { id: line.accountId } },
                    category: line.categoryId ? { connect: { id: line.categoryId } } : undefined,
                    amount: line.amount,
                    memo: line.memo || null,
                })),
            },
        });
    }
    async get(userId, transactionId, acceptLanguage) {
        const transaction = await this.transactionsRepository.findById(transactionId);
        if (!transaction || !transaction.isActive) {
            const locale = (0, transactions_messages_1.resolveLocale)(acceptLanguage);
            throw new common_1.NotFoundException({ message: (0, transactions_messages_1.t)(locale, 'notFound') });
        }
        await this.householdsService.assertMember(userId, transaction.householdId, acceptLanguage);
        return transaction;
    }
    async update(userId, transactionId, payload, acceptLanguage) {
        const existing = await this.transactionsRepository.findById(transactionId);
        if (!existing || !existing.isActive) {
            const locale = (0, transactions_messages_1.resolveLocale)(acceptLanguage);
            throw new common_1.NotFoundException({ message: (0, transactions_messages_1.t)(locale, 'notFound') });
        }
        await this.householdsService.assertMember(userId, existing.householdId, acceptLanguage);
        const locale = (0, transactions_messages_1.resolveLocale)(acceptLanguage);
        const data = {};
        if (payload.date) {
            const date = this.parseDate(payload.date);
            if (!date) {
                throw new common_1.BadRequestException({ message: (0, transactions_messages_1.t)(locale, 'invalidBody') });
            }
            data.date = date;
        }
        if (payload.description !== undefined) {
            data.description = payload.description || null;
        }
        if (payload.entry) {
            const entry = payload.entry;
            const accountIds = [entry.from, entry.to]
                .filter((side) => side.kind === 'ACCOUNT')
                .map((side) => side.id);
            const categoryIds = [entry.from, entry.to]
                .filter((side) => side.kind === 'CATEGORY')
                .map((side) => side.id);
            const [accounts, categories] = await Promise.all([
                this.transactionsRepository.findAccountsByIds(accountIds),
                this.transactionsRepository.findCategoriesByIds(categoryIds),
            ]);
            if (accounts.length !== accountIds.length ||
                accounts.some((acc) => acc.householdId !== existing.householdId || (!acc.isActive && !acc.name?.startsWith('__system__')))) {
                throw new common_1.BadRequestException({ message: (0, transactions_messages_1.t)(locale, 'invalidReference') });
            }
            if (categories.length !== categoryIds.length ||
                categories.some((cat) => cat.householdId !== existing.householdId || !cat.isActive)) {
                throw new common_1.BadRequestException({ message: (0, transactions_messages_1.t)(locale, 'invalidReference') });
            }
            const amount = this.parseAmountToCents(entry.amount);
            if (amount === null) {
                throw new common_1.BadRequestException({ message: (0, transactions_messages_1.t)(locale, 'invalidBody') });
            }
            const systemAccountId = await this.transactionsRepository.ensureSystemAccount(existing.householdId);
            const resolveLine = (side, signedAmount) => {
                if (side.kind === 'ACCOUNT') {
                    return {
                        account: { connect: { id: side.id } },
                        category: undefined,
                        amount: signedAmount,
                    };
                }
                return {
                    account: { connect: { id: systemAccountId } },
                    category: { connect: { id: side.id } },
                    amount: signedAmount,
                };
            };
            data.lines = {
                deleteMany: {},
                create: [
                    { ...resolveLine(entry.from, -amount), memo: entry.memo || null },
                    { ...resolveLine(entry.to, amount), memo: entry.memo || null },
                ],
            };
        }
        else if (payload.lines) {
            const lines = await this.validateLines(existing.householdId, payload.lines, acceptLanguage);
            data.lines = {
                deleteMany: {},
                create: lines.map((line) => ({
                    account: { connect: { id: line.accountId } },
                    category: line.categoryId ? { connect: { id: line.categoryId } } : undefined,
                    amount: line.amount,
                    memo: line.memo || null,
                })),
            };
        }
        return this.transactionsRepository.updateTransaction(transactionId, data);
    }
    async remove(userId, transactionId, acceptLanguage) {
        const existing = await this.transactionsRepository.findById(transactionId);
        if (!existing || !existing.isActive) {
            const locale = (0, transactions_messages_1.resolveLocale)(acceptLanguage);
            throw new common_1.NotFoundException({ message: (0, transactions_messages_1.t)(locale, 'notFound') });
        }
        await this.householdsService.assertMember(userId, existing.householdId, acceptLanguage);
        return this.transactionsRepository.archiveTransaction(transactionId);
    }
    parseDate(value) {
        const trimmed = value.trim();
        if (!trimmed)
            return null;
        const date = new Date(trimmed.includes('T') ? trimmed : `${trimmed}T00:00:00`);
        return Number.isNaN(date.getTime()) ? null : date;
    }
    parseMonth(value) {
        const [year, month] = value.split('-').map((part) => Number(part));
        if (!year || !month || month < 1 || month > 12) {
            return { start: null, end: null };
        }
        const start = new Date(Date.UTC(year, month - 1, 1));
        const end = new Date(Date.UTC(year, month, 1));
        return { start, end };
    }
    parseAmountToCents(value) {
        if (!value)
            return null;
        const trimmed = value.trim();
        if (!trimmed)
            return null;
        const normalized = trimmed
            .replace(/[^0-9,.\-]/g, '')
            .replace(/\.(?=.*\.)/g, '')
            .replace(/,(?=.*,)/g, '');
        const hasComma = normalized.includes(',');
        const hasDot = normalized.includes('.');
        let numeric = normalized;
        if (hasComma && hasDot) {
            numeric =
                normalized.lastIndexOf(',') > normalized.lastIndexOf('.')
                    ? normalized.replace(/\./g, '').replace(',', '.')
                    : normalized.replace(/,/g, '');
        }
        else if (hasComma && !hasDot) {
            numeric = normalized.replace(',', '.');
        }
        const parsed = Number(numeric);
        if (!Number.isFinite(parsed))
            return null;
        return BigInt(Math.round(parsed * 100));
    }
    async validateLines(householdId, lines, acceptLanguage) {
        const locale = (0, transactions_messages_1.resolveLocale)(acceptLanguage);
        const parsedLines = lines
            .map((line) => ({
            ...line,
            amount: this.parseAmountToCents(line.amount),
        }))
            .filter((line) => line.amount !== null);
        if (parsedLines.length !== lines.length) {
            throw new common_1.BadRequestException({ message: (0, transactions_messages_1.t)(locale, 'invalidBody') });
        }
        const sum = parsedLines.reduce((acc, line) => acc + BigInt(line.amount), BigInt(0));
        if (sum !== BigInt(0)) {
            throw new common_1.BadRequestException({ message: (0, transactions_messages_1.t)(locale, 'unbalanced') });
        }
        const accountIds = [...new Set(parsedLines.map((line) => line.accountId))];
        const accounts = await this.transactionsRepository.findAccountsByIds(accountIds);
        if (accounts.length !== accountIds.length ||
            accounts.some((acc) => acc.householdId !== householdId || (!acc.isActive && !acc.name?.startsWith('__system__')))) {
            throw new common_1.BadRequestException({ message: (0, transactions_messages_1.t)(locale, 'invalidReference') });
        }
        const categoryIds = [...new Set(parsedLines.map((line) => line.categoryId).filter(Boolean))];
        if (categoryIds.length) {
            const categories = await this.transactionsRepository.findCategoriesByIds(categoryIds);
            if (categories.length !== categoryIds.length ||
                categories.some((cat) => cat.householdId !== householdId || !cat.isActive)) {
                throw new common_1.BadRequestException({ message: (0, transactions_messages_1.t)(locale, 'invalidReference') });
            }
        }
        return parsedLines;
    }
};
exports.TransactionsService = TransactionsService;
exports.TransactionsService = TransactionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [transactions_repository_1.TransactionsRepository,
        households_service_1.HouseholdsService])
], TransactionsService);
//# sourceMappingURL=transactions.service.js.map