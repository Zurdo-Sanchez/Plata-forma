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
exports.CreditCardsService = void 0;
const common_1 = require("@nestjs/common");
const credit_cards_repository_1 = require("./credit-cards.repository");
const households_service_1 = require("../households/households.service");
const credit_cards_messages_1 = require("./credit-cards.messages");
const client_1 = require("@prisma/client");
let CreditCardsService = class CreditCardsService {
    constructor(creditCardsRepository, householdsService) {
        this.creditCardsRepository = creditCardsRepository;
        this.householdsService = householdsService;
    }
    async list(userId, householdId, acceptLanguage) {
        await this.householdsService.assertMember(userId, householdId, acceptLanguage);
        return this.creditCardsRepository.listByHousehold(householdId);
    }
    async create(userId, householdId, payload, acceptLanguage) {
        await this.householdsService.assertMember(userId, householdId, acceptLanguage);
        const locale = (0, credit_cards_messages_1.resolveLocale)(acceptLanguage);
        if (payload.accountId) {
            const account = await this.creditCardsRepository.findAccountById(payload.accountId);
            if (!account || account.householdId !== householdId || account.type !== client_1.AccountType.CREDIT_CARD) {
                throw new common_1.BadRequestException({ message: (0, credit_cards_messages_1.t)(locale, 'invalidAccount') });
            }
            return this.creditCardsRepository.createCreditCard({
                name: payload.name,
                closingDay: payload.closingDay,
                dueDay: payload.dueDay,
                limitAmount: payload.limitAmount !== undefined ? BigInt(payload.limitAmount) : null,
                household: { connect: { id: householdId } },
                account: { connect: { id: account.id } },
            });
        }
        return this.creditCardsRepository.createWithAccount(householdId, { name: payload.name }, {
            name: payload.name,
            closingDay: payload.closingDay,
            dueDay: payload.dueDay,
            limitAmount: payload.limitAmount !== undefined ? BigInt(payload.limitAmount) : null,
            household: { connect: { id: householdId } },
        });
    }
    async get(userId, cardId, acceptLanguage) {
        const card = await this.creditCardsRepository.findById(cardId);
        if (!card) {
            const locale = (0, credit_cards_messages_1.resolveLocale)(acceptLanguage);
            throw new common_1.NotFoundException({ message: (0, credit_cards_messages_1.t)(locale, 'notFound') });
        }
        await this.householdsService.assertMember(userId, card.householdId, acceptLanguage);
        return card;
    }
    async update(userId, cardId, payload, acceptLanguage) {
        const card = await this.creditCardsRepository.findById(cardId);
        if (!card) {
            const locale = (0, credit_cards_messages_1.resolveLocale)(acceptLanguage);
            throw new common_1.NotFoundException({ message: (0, credit_cards_messages_1.t)(locale, 'notFound') });
        }
        await this.householdsService.assertMember(userId, card.householdId, acceptLanguage);
        return this.creditCardsRepository.updateCreditCard(cardId, {
            name: payload.name,
            closingDay: payload.closingDay,
            dueDay: payload.dueDay,
            limitAmount: payload.limitAmount !== undefined ? BigInt(payload.limitAmount) : card.limitAmount,
        });
    }
};
exports.CreditCardsService = CreditCardsService;
exports.CreditCardsService = CreditCardsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [credit_cards_repository_1.CreditCardsRepository,
        households_service_1.HouseholdsService])
], CreditCardsService);
//# sourceMappingURL=credit-cards.service.js.map