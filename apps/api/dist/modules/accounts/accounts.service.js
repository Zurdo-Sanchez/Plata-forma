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
exports.AccountsService = void 0;
const common_1 = require("@nestjs/common");
const accounts_repository_1 = require("./accounts.repository");
const households_service_1 = require("../households/households.service");
const accounts_messages_1 = require("./accounts.messages");
let AccountsService = class AccountsService {
    constructor(accountsRepository, householdsService) {
        this.accountsRepository = accountsRepository;
        this.householdsService = householdsService;
    }
    async list(userId, householdId, acceptLanguage) {
        await this.householdsService.assertMember(userId, householdId, acceptLanguage);
        return this.accountsRepository.listByHousehold(householdId);
    }
    async create(userId, householdId, payload, acceptLanguage) {
        await this.householdsService.assertMember(userId, householdId, acceptLanguage);
        return this.accountsRepository.createAccount({
            name: payload.name,
            type: payload.type,
            currency: payload.currency || null,
            isActive: payload.isActive ?? true,
            household: { connect: { id: householdId } },
        });
    }
    async get(userId, accountId, acceptLanguage) {
        const account = await this.accountsRepository.findById(accountId);
        if (!account) {
            const locale = (0, accounts_messages_1.resolveLocale)(acceptLanguage);
            throw new common_1.NotFoundException({ message: (0, accounts_messages_1.t)(locale, 'notFound') });
        }
        await this.householdsService.assertMember(userId, account.householdId, acceptLanguage);
        return account;
    }
    async update(userId, accountId, payload, acceptLanguage) {
        const account = await this.accountsRepository.findById(accountId);
        if (!account) {
            const locale = (0, accounts_messages_1.resolveLocale)(acceptLanguage);
            throw new common_1.NotFoundException({ message: (0, accounts_messages_1.t)(locale, 'notFound') });
        }
        await this.householdsService.assertMember(userId, account.householdId, acceptLanguage);
        return this.accountsRepository.updateAccount(accountId, {
            name: payload.name,
            type: payload.type,
            currency: payload.currency ?? null,
            isActive: payload.isActive ?? account.isActive,
        });
    }
    async archive(userId, accountId, acceptLanguage) {
        const account = await this.accountsRepository.findById(accountId);
        if (!account) {
            const locale = (0, accounts_messages_1.resolveLocale)(acceptLanguage);
            throw new common_1.NotFoundException({ message: (0, accounts_messages_1.t)(locale, 'notFound') });
        }
        await this.householdsService.assertMember(userId, account.householdId, acceptLanguage);
        return this.accountsRepository.updateAccount(accountId, { isActive: false });
    }
};
exports.AccountsService = AccountsService;
exports.AccountsService = AccountsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [accounts_repository_1.AccountsRepository,
        households_service_1.HouseholdsService])
], AccountsService);
//# sourceMappingURL=accounts.service.js.map