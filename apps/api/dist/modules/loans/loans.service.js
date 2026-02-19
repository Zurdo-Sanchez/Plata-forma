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
exports.LoansService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const loans_repository_1 = require("./loans.repository");
const households_service_1 = require("../households/households.service");
const loans_messages_1 = require("./loans.messages");
let LoansService = class LoansService {
    constructor(loansRepository, householdsService) {
        this.loansRepository = loansRepository;
        this.householdsService = householdsService;
    }
    async list(userId, householdId, acceptLanguage) {
        await this.householdsService.assertMember(userId, householdId, acceptLanguage);
        return this.loansRepository.listByHousehold(householdId);
    }
    async create(userId, householdId, payload, acceptLanguage) {
        await this.householdsService.assertMember(userId, householdId, acceptLanguage);
        const locale = (0, loans_messages_1.resolveLocale)(acceptLanguage);
        const startDate = this.parseDate(payload.startDate);
        if (!startDate) {
            throw new common_1.BadRequestException({ message: (0, loans_messages_1.t)(locale, 'invalidBody') });
        }
        if (payload.accountId) {
            const account = await this.loansRepository.findAccountById(payload.accountId);
            if (!account || account.householdId !== householdId || account.type !== client_1.AccountType.LOAN) {
                throw new common_1.BadRequestException({ message: (0, loans_messages_1.t)(locale, 'invalidAccount') });
            }
            return this.loansRepository.createLoan({
                name: payload.name,
                principalAmount: BigInt(payload.principalAmount),
                interestRateBps: payload.interestRateBps,
                startDate,
                termMonths: payload.termMonths ?? null,
                household: { connect: { id: householdId } },
                account: { connect: { id: account.id } },
            });
        }
        return this.loansRepository.createWithAccount(householdId, { name: payload.name }, {
            name: payload.name,
            principalAmount: BigInt(payload.principalAmount),
            interestRateBps: payload.interestRateBps,
            startDate,
            termMonths: payload.termMonths ?? null,
            household: { connect: { id: householdId } },
        });
    }
    async get(userId, loanId, acceptLanguage) {
        const loan = await this.loansRepository.findById(loanId);
        if (!loan) {
            const locale = (0, loans_messages_1.resolveLocale)(acceptLanguage);
            throw new common_1.NotFoundException({ message: (0, loans_messages_1.t)(locale, 'notFound') });
        }
        await this.householdsService.assertMember(userId, loan.householdId, acceptLanguage);
        return loan;
    }
    async update(userId, loanId, payload, acceptLanguage) {
        const loan = await this.loansRepository.findById(loanId);
        if (!loan) {
            const locale = (0, loans_messages_1.resolveLocale)(acceptLanguage);
            throw new common_1.NotFoundException({ message: (0, loans_messages_1.t)(locale, 'notFound') });
        }
        await this.householdsService.assertMember(userId, loan.householdId, acceptLanguage);
        const locale = (0, loans_messages_1.resolveLocale)(acceptLanguage);
        let startDate;
        if (payload.startDate) {
            startDate = this.parseDate(payload.startDate) ?? undefined;
            if (!startDate) {
                throw new common_1.BadRequestException({ message: (0, loans_messages_1.t)(locale, 'invalidBody') });
            }
        }
        return this.loansRepository.updateLoan(loanId, {
            name: payload.name,
            principalAmount: payload.principalAmount !== undefined ? BigInt(payload.principalAmount) : loan.principalAmount,
            interestRateBps: payload.interestRateBps ?? loan.interestRateBps,
            startDate: startDate ?? loan.startDate,
            termMonths: payload.termMonths ?? loan.termMonths,
        });
    }
    parseDate(value) {
        const trimmed = value.trim();
        if (!trimmed)
            return null;
        const date = new Date(trimmed.includes('T') ? trimmed : `${trimmed}T00:00:00`);
        return Number.isNaN(date.getTime()) ? null : date;
    }
};
exports.LoansService = LoansService;
exports.LoansService = LoansService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [loans_repository_1.LoansRepository,
        households_service_1.HouseholdsService])
], LoansService);
//# sourceMappingURL=loans.service.js.map