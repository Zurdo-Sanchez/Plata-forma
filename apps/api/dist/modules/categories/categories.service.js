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
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const categories_repository_1 = require("./categories.repository");
const households_service_1 = require("../households/households.service");
const categories_messages_1 = require("./categories.messages");
let CategoriesService = class CategoriesService {
    constructor(categoriesRepository, householdsService) {
        this.categoriesRepository = categoriesRepository;
        this.householdsService = householdsService;
    }
    async list(userId, householdId, acceptLanguage) {
        await this.householdsService.assertMember(userId, householdId, acceptLanguage);
        return this.categoriesRepository.listByHousehold(householdId);
    }
    async create(userId, householdId, payload, acceptLanguage) {
        await this.householdsService.assertMember(userId, householdId, acceptLanguage);
        return this.categoriesRepository.createCategory({
            name: payload.name,
            type: payload.type,
            isActive: payload.isActive ?? true,
            household: { connect: { id: householdId } },
        });
    }
    async get(userId, categoryId, acceptLanguage) {
        const category = await this.categoriesRepository.findById(categoryId);
        if (!category) {
            const locale = (0, categories_messages_1.resolveLocale)(acceptLanguage);
            throw new common_1.NotFoundException({ message: (0, categories_messages_1.t)(locale, 'notFound') });
        }
        await this.householdsService.assertMember(userId, category.householdId, acceptLanguage);
        return category;
    }
    async update(userId, categoryId, payload, acceptLanguage) {
        const category = await this.categoriesRepository.findById(categoryId);
        if (!category) {
            const locale = (0, categories_messages_1.resolveLocale)(acceptLanguage);
            throw new common_1.NotFoundException({ message: (0, categories_messages_1.t)(locale, 'notFound') });
        }
        await this.householdsService.assertMember(userId, category.householdId, acceptLanguage);
        return this.categoriesRepository.updateCategory(categoryId, {
            name: payload.name,
            type: payload.type,
            isActive: payload.isActive ?? category.isActive,
        });
    }
    async archive(userId, categoryId, acceptLanguage) {
        const category = await this.categoriesRepository.findById(categoryId);
        if (!category) {
            const locale = (0, categories_messages_1.resolveLocale)(acceptLanguage);
            throw new common_1.NotFoundException({ message: (0, categories_messages_1.t)(locale, 'notFound') });
        }
        await this.householdsService.assertMember(userId, category.householdId, acceptLanguage);
        return this.categoriesRepository.updateCategory(categoryId, { isActive: false });
    }
};
exports.CategoriesService = CategoriesService;
exports.CategoriesService = CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [categories_repository_1.CategoriesRepository,
        households_service_1.HouseholdsService])
], CategoriesService);
//# sourceMappingURL=categories.service.js.map