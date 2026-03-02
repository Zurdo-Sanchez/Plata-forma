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
exports.ReportsService = void 0;
const common_1 = require("@nestjs/common");
const households_service_1 = require("../households/households.service");
const reports_repository_1 = require("./reports.repository");
const reports_messages_1 = require("./reports.messages");
let ReportsService = class ReportsService {
    constructor(reportsRepository, householdsService) {
        this.reportsRepository = reportsRepository;
        this.householdsService = householdsService;
    }
    async monthly(userId, householdId, query, acceptLanguage) {
        await this.householdsService.assertMember(userId, householdId, acceptLanguage);
        const locale = (0, reports_messages_1.resolveLocale)(acceptLanguage);
        const { start, end } = this.parseMonth(query.month);
        if (!start || !end) {
            throw new common_1.BadRequestException({ message: (0, reports_messages_1.t)(locale, 'invalidBody') });
        }
        const rangeStart = this.addMonths(start, -1);
        const [transactions, accountSums] = await Promise.all([
            this.reportsRepository.listTransactionsForReport(householdId, rangeStart, end),
            this.reportsRepository.sumByAccount(householdId, start, end),
        ]);
        const accountIds = accountSums.map((item) => item.accountId).filter(Boolean);
        const accounts = await this.reportsRepository.findAccountsByIds(accountIds);
        const accountMap = new Map(accounts.map((acc) => [acc.id, acc]));
        const targetMonthKey = this.toMonthKey(start);
        const byCategoryMap = new Map();
        const totals = { income: BigInt(0), expense: BigInt(0) };
        for (const transaction of transactions) {
            const baseMonthKey = this.toMonthKey(transaction.date);
            const hasCreditCard = transaction.lines.some((line) => line.account?.type === 'CREDIT_CARD');
            for (const line of transaction.lines) {
                const shouldShift = Boolean(line.categoryId && hasCreditCard);
                const effectiveMonthKey = baseMonthKey + (shouldShift ? 1 : 0);
                if (effectiveMonthKey !== targetMonthKey)
                    continue;
                const isSystem = this.isSystemAccount(line.account?.name);
                const rawAmount = BigInt(line.amount ?? 0);
                const effectiveAmount = isSystem ? -rawAmount : rawAmount;
                const key = line.categoryId ?? null;
                const existing = byCategoryMap.get(key);
                const name = line.category?.name ?? (0, reports_messages_1.t)(locale, 'uncategorized');
                const nextAmount = existing ? existing.amount + effectiveAmount : effectiveAmount;
                byCategoryMap.set(key, {
                    categoryId: key,
                    name,
                    amount: nextAmount,
                });
                if (line.categoryId) {
                    if (effectiveAmount >= BigInt(0)) {
                        totals.income += effectiveAmount;
                    }
                    else {
                        totals.expense += -effectiveAmount;
                    }
                }
            }
        }
        const byCategory = Array.from(byCategoryMap.values());
        const byAccount = accountSums.map((item) => {
            const account = accountMap.get(item.accountId);
            return {
                accountId: item.accountId,
                name: account?.name ?? '',
                type: account?.type ?? null,
                amount: item._sum.amount ?? BigInt(0),
            };
        });
        return {
            month: query.month,
            range: { start, end },
            totals: {
                income: totals.income,
                expense: totals.expense,
                net: totals.income - totals.expense,
            },
            byCategory,
            byAccount,
        };
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
    toMonthKey(value) {
        return value.getUTCFullYear() * 12 + value.getUTCMonth();
    }
    addMonths(value, offset) {
        return new Date(Date.UTC(value.getUTCFullYear(), value.getUTCMonth() + offset, 1));
    }
    isSystemAccount(name) {
        return Boolean(name && name.startsWith('__system__'));
    }
};
exports.ReportsService = ReportsService;
exports.ReportsService = ReportsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [reports_repository_1.ReportsRepository,
        households_service_1.HouseholdsService])
], ReportsService);
//# sourceMappingURL=reports.service.js.map