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
exports.CategoriesController = void 0;
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../auth/auth.guard");
const categories_service_1 = require("./categories.service");
const categories_schemas_1 = require("./categories.schemas");
const categories_messages_1 = require("./categories.messages");
let CategoriesController = class CategoriesController {
    constructor(categoriesService) {
        this.categoriesService = categoriesService;
    }
    async list(request, householdId, acceptLanguage) {
        return this.categoriesService.list(request.user.id, householdId, acceptLanguage);
    }
    async create(request, householdId, body, acceptLanguage) {
        const locale = (0, categories_messages_1.resolveLocale)(acceptLanguage);
        const parsed = categories_schemas_1.CreateCategorySchema.safeParse(body);
        if (!parsed.success) {
            throw new common_1.BadRequestException({ message: (0, categories_messages_1.t)(locale, 'invalidBody') });
        }
        const category = await this.categoriesService.create(request.user.id, householdId, parsed.data, acceptLanguage);
        return { ok: true, message: (0, categories_messages_1.t)(locale, 'created'), category };
    }
    async get(request, id, acceptLanguage) {
        const parsedId = categories_schemas_1.CategoryIdSchema.safeParse(id);
        if (!parsedId.success) {
            const locale = (0, categories_messages_1.resolveLocale)(acceptLanguage);
            throw new common_1.BadRequestException({ message: (0, categories_messages_1.t)(locale, 'invalidBody') });
        }
        return this.categoriesService.get(request.user.id, parsedId.data, acceptLanguage);
    }
    async update(request, id, body, acceptLanguage) {
        const locale = (0, categories_messages_1.resolveLocale)(acceptLanguage);
        const parsedId = categories_schemas_1.CategoryIdSchema.safeParse(id);
        if (!parsedId.success) {
            throw new common_1.BadRequestException({ message: (0, categories_messages_1.t)(locale, 'invalidBody') });
        }
        const parsed = categories_schemas_1.UpdateCategorySchema.safeParse(body);
        if (!parsed.success) {
            throw new common_1.BadRequestException({ message: (0, categories_messages_1.t)(locale, 'invalidBody') });
        }
        const category = await this.categoriesService.update(request.user.id, parsedId.data, parsed.data, acceptLanguage);
        return { ok: true, message: (0, categories_messages_1.t)(locale, 'updated'), category };
    }
    async archive(request, id, acceptLanguage) {
        const locale = (0, categories_messages_1.resolveLocale)(acceptLanguage);
        const parsedId = categories_schemas_1.CategoryIdSchema.safeParse(id);
        if (!parsedId.success) {
            throw new common_1.BadRequestException({ message: (0, categories_messages_1.t)(locale, 'invalidBody') });
        }
        const category = await this.categoriesService.archive(request.user.id, parsedId.data, acceptLanguage);
        return { ok: true, message: (0, categories_messages_1.t)(locale, 'archived'), category };
    }
};
exports.CategoriesController = CategoriesController;
__decorate([
    (0, common_1.Get)('households/:householdId/categories'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('householdId')),
    __param(2, (0, common_1.Headers)('accept-language')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "list", null);
__decorate([
    (0, common_1.Post)('households/:householdId/categories'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('householdId')),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Headers)('accept-language')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object, String]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('categories/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Headers)('accept-language')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "get", null);
__decorate([
    (0, common_1.Patch)('categories/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Headers)('accept-language')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object, String]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('categories/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Headers)('accept-language')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "archive", null);
exports.CategoriesController = CategoriesController = __decorate([
    (0, common_1.Controller)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __metadata("design:paramtypes", [categories_service_1.CategoriesService])
], CategoriesController);
//# sourceMappingURL=categories.controller.js.map