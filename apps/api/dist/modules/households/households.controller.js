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
exports.HouseholdsController = void 0;
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../auth/auth.guard");
const households_schemas_1 = require("./households.schemas");
const households_service_1 = require("./households.service");
const households_messages_1 = require("./households.messages");
let HouseholdsController = class HouseholdsController {
    constructor(householdsService) {
        this.householdsService = householdsService;
    }
    async list(request) {
        return this.householdsService.list(request.user.id);
    }
    async create(request, body, acceptLanguage) {
        const locale = (0, households_messages_1.resolveLocale)(acceptLanguage);
        const parsed = households_schemas_1.CreateHouseholdSchema.safeParse(body);
        if (!parsed.success) {
            throw new common_1.BadRequestException({ message: (0, households_messages_1.t)(locale, 'invalidBody') });
        }
        const household = await this.householdsService.create(request.user.id, parsed.data);
        return { ok: true, message: (0, households_messages_1.t)(locale, 'created'), household };
    }
    async get(request, id, acceptLanguage) {
        const parsedId = households_schemas_1.HouseholdIdSchema.safeParse(id);
        if (!parsedId.success) {
            const locale = (0, households_messages_1.resolveLocale)(acceptLanguage);
            throw new common_1.BadRequestException({ message: (0, households_messages_1.t)(locale, 'invalidBody') });
        }
        return this.householdsService.get(request.user.id, parsedId.data, acceptLanguage);
    }
    async update(request, id, body, acceptLanguage) {
        const locale = (0, households_messages_1.resolveLocale)(acceptLanguage);
        const parsedId = households_schemas_1.HouseholdIdSchema.safeParse(id);
        if (!parsedId.success) {
            throw new common_1.BadRequestException({ message: (0, households_messages_1.t)(locale, 'invalidBody') });
        }
        const parsed = households_schemas_1.UpdateHouseholdSchema.safeParse(body);
        if (!parsed.success) {
            throw new common_1.BadRequestException({ message: (0, households_messages_1.t)(locale, 'invalidBody') });
        }
        const household = await this.householdsService.update(request.user.id, parsedId.data, parsed.data, acceptLanguage);
        return { ok: true, message: (0, households_messages_1.t)(locale, 'updated'), household };
    }
    async addMember(request, id, body, acceptLanguage) {
        const locale = (0, households_messages_1.resolveLocale)(acceptLanguage);
        const parsedId = households_schemas_1.HouseholdIdSchema.safeParse(id);
        if (!parsedId.success) {
            throw new common_1.BadRequestException({ message: (0, households_messages_1.t)(locale, 'invalidBody') });
        }
        const parsed = households_schemas_1.AddMemberSchema.safeParse(body);
        if (!parsed.success) {
            throw new common_1.BadRequestException({ message: (0, households_messages_1.t)(locale, 'invalidBody') });
        }
        const member = await this.householdsService.addMember(request.user.id, parsedId.data, parsed.data, acceptLanguage);
        return { ok: true, message: (0, households_messages_1.t)(locale, 'memberAdded'), member };
    }
    async remove(request, id, acceptLanguage) {
        const locale = (0, households_messages_1.resolveLocale)(acceptLanguage);
        const parsedId = households_schemas_1.HouseholdIdSchema.safeParse(id);
        if (!parsedId.success) {
            throw new common_1.BadRequestException({ message: (0, households_messages_1.t)(locale, 'invalidBody') });
        }
        await this.householdsService.remove(request.user.id, parsedId.data, acceptLanguage);
        return { ok: true, message: (0, households_messages_1.t)(locale, 'deleted') };
    }
};
exports.HouseholdsController = HouseholdsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HouseholdsController.prototype, "list", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Headers)('accept-language')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], HouseholdsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Headers)('accept-language')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], HouseholdsController.prototype, "get", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Headers)('accept-language')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object, String]),
    __metadata("design:returntype", Promise)
], HouseholdsController.prototype, "update", null);
__decorate([
    (0, common_1.Post)(':id/members'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Headers)('accept-language')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object, String]),
    __metadata("design:returntype", Promise)
], HouseholdsController.prototype, "addMember", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Headers)('accept-language')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], HouseholdsController.prototype, "remove", null);
exports.HouseholdsController = HouseholdsController = __decorate([
    (0, common_1.Controller)('households'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __metadata("design:paramtypes", [households_service_1.HouseholdsService])
], HouseholdsController);
//# sourceMappingURL=households.controller.js.map