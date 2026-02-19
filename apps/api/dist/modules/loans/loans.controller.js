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
exports.LoansController = void 0;
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../auth/auth.guard");
const loans_schemas_1 = require("./loans.schemas");
const loans_service_1 = require("./loans.service");
const loans_messages_1 = require("./loans.messages");
let LoansController = class LoansController {
    constructor(loansService) {
        this.loansService = loansService;
    }
    async list(request, householdId, acceptLanguage) {
        return this.loansService.list(request.user.id, householdId, acceptLanguage);
    }
    async create(request, householdId, body, acceptLanguage) {
        const locale = (0, loans_messages_1.resolveLocale)(acceptLanguage);
        const parsed = loans_schemas_1.CreateLoanSchema.safeParse(body);
        if (!parsed.success) {
            throw new common_1.BadRequestException({ message: (0, loans_messages_1.t)(locale, 'invalidBody') });
        }
        const loan = await this.loansService.create(request.user.id, householdId, parsed.data, acceptLanguage);
        return { ok: true, message: (0, loans_messages_1.t)(locale, 'created'), loan };
    }
    async get(request, id, acceptLanguage) {
        const parsedId = loans_schemas_1.LoanIdSchema.safeParse(id);
        if (!parsedId.success) {
            const locale = (0, loans_messages_1.resolveLocale)(acceptLanguage);
            throw new common_1.BadRequestException({ message: (0, loans_messages_1.t)(locale, 'invalidBody') });
        }
        return this.loansService.get(request.user.id, parsedId.data, acceptLanguage);
    }
    async update(request, id, body, acceptLanguage) {
        const locale = (0, loans_messages_1.resolveLocale)(acceptLanguage);
        const parsedId = loans_schemas_1.LoanIdSchema.safeParse(id);
        if (!parsedId.success) {
            throw new common_1.BadRequestException({ message: (0, loans_messages_1.t)(locale, 'invalidBody') });
        }
        const parsed = loans_schemas_1.UpdateLoanSchema.safeParse(body);
        if (!parsed.success) {
            throw new common_1.BadRequestException({ message: (0, loans_messages_1.t)(locale, 'invalidBody') });
        }
        const loan = await this.loansService.update(request.user.id, parsedId.data, parsed.data, acceptLanguage);
        return { ok: true, message: (0, loans_messages_1.t)(locale, 'updated'), loan };
    }
};
exports.LoansController = LoansController;
__decorate([
    (0, common_1.Get)('households/:householdId/loans'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('householdId')),
    __param(2, (0, common_1.Headers)('accept-language')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], LoansController.prototype, "list", null);
__decorate([
    (0, common_1.Post)('households/:householdId/loans'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('householdId')),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Headers)('accept-language')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object, String]),
    __metadata("design:returntype", Promise)
], LoansController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('loans/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Headers)('accept-language')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], LoansController.prototype, "get", null);
__decorate([
    (0, common_1.Patch)('loans/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Headers)('accept-language')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object, String]),
    __metadata("design:returntype", Promise)
], LoansController.prototype, "update", null);
exports.LoansController = LoansController = __decorate([
    (0, common_1.Controller)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __metadata("design:paramtypes", [loans_service_1.LoansService])
], LoansController);
//# sourceMappingURL=loans.controller.js.map