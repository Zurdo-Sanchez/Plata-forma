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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionsController = void 0;
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../auth/auth.guard");
const transactions_schemas_1 = require("./transactions.schemas");
const transactions_service_1 = require("./transactions.service");
const transactions_messages_1 = require("./transactions.messages");
let TransactionsController = class TransactionsController {
    constructor(transactionsService) {
        this.transactionsService = transactionsService;
    }
    async list(request, householdId, query, acceptLanguage) {
        const parsed = transactions_schemas_1.TransactionsQuerySchema.safeParse(query);
        if (!parsed.success) {
            const locale = (0, transactions_messages_1.resolveLocale)(acceptLanguage);
            throw new common_1.BadRequestException({ message: (0, transactions_messages_1.t)(locale, 'invalidBody') });
        }
        return this.transactionsService.list(request.user.id, householdId, parsed.data, acceptLanguage);
    }
    async create(request, householdId, body, acceptLanguage) {
        const locale = (0, transactions_messages_1.resolveLocale)(acceptLanguage);
        const parsed = transactions_schemas_1.CreateTransactionSchema.safeParse(body);
        if (!parsed.success) {
            throw new common_1.BadRequestException({ message: (0, transactions_messages_1.t)(locale, 'invalidBody') });
        }
        const transaction = await this.transactionsService.create(request.user.id, householdId, parsed.data, acceptLanguage);
        return { ok: true, message: (0, transactions_messages_1.t)(locale, 'created'), transaction };
    }
    async get(request, id, acceptLanguage) {
        const parsedId = transactions_schemas_1.TransactionIdSchema.safeParse(id);
        if (!parsedId.success) {
            const locale = (0, transactions_messages_1.resolveLocale)(acceptLanguage);
            throw new common_1.BadRequestException({ message: (0, transactions_messages_1.t)(locale, 'invalidBody') });
        }
        return this.transactionsService.get(request.user.id, parsedId.data, acceptLanguage);
    }
    async update(request, id, body, acceptLanguage) {
        const locale = (0, transactions_messages_1.resolveLocale)(acceptLanguage);
        const parsedId = transactions_schemas_1.TransactionIdSchema.safeParse(id);
        if (!parsedId.success) {
            throw new common_1.BadRequestException({ message: (0, transactions_messages_1.t)(locale, 'invalidBody') });
        }
        const parsed = transactions_schemas_1.UpdateTransactionSchema.safeParse(body);
        if (!parsed.success) {
            throw new common_1.BadRequestException({ message: (0, transactions_messages_1.t)(locale, 'invalidBody') });
        }
        const transaction = await this.transactionsService.update(request.user.id, parsedId.data, parsed.data, acceptLanguage);
        return { ok: true, message: (0, transactions_messages_1.t)(locale, 'updated'), transaction };
    }
    async remove(request, id, acceptLanguage) {
        const locale = (0, transactions_messages_1.resolveLocale)(acceptLanguage);
        const parsedId = transactions_schemas_1.TransactionIdSchema.safeParse(id);
        if (!parsedId.success) {
            throw new common_1.BadRequestException({ message: (0, transactions_messages_1.t)(locale, 'invalidBody') });
        }
        const transaction = await this.transactionsService.remove(request.user.id, parsedId.data, acceptLanguage);
        return { ok: true, message: (0, transactions_messages_1.t)(locale, 'deleted'), transaction };
    }
};
exports.TransactionsController = TransactionsController;
__decorate([
    (0, common_1.Get)('households/:householdId/transactions'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('householdId')),
    __param(2, (0, common_1.Query)()),
    __param(3, (0, common_1.Headers)('accept-language')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object, String]),
    __metadata("design:returntype", Promise)
], TransactionsController.prototype, "list", null);
__decorate([
    (0, common_1.Post)('households/:householdId/transactions'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('householdId')),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Headers)('accept-language')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object, String]),
    __metadata("design:returntype", Promise)
], TransactionsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('transactions/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Headers)('accept-language')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], TransactionsController.prototype, "get", null);
__decorate([
    (0, common_1.Patch)('transactions/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Headers)('accept-language')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object, String]),
    __metadata("design:returntype", Promise)
], TransactionsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('transactions/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Headers)('accept-language')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], TransactionsController.prototype, "remove", null);
exports.TransactionsController = TransactionsController = __decorate([
    (0, common_1.Controller)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __metadata("design:paramtypes", [transactions_service_1.TransactionsService])
], TransactionsController);
//# sourceMappingURL=transactions.controller.js.map