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
            isActive: payload.isActive ?? true,
            household: { connect: { id: householdId } },
        });
    }
    async get(userId, categoryId, acceptLanguage) {
        const category = await this.categoriesRepository.findById(categoryId);
        if (!category || !category.isActive) {
            const locale = (0, categories_messages_1.resolveLocale)(acceptLanguage);
            throw new common_1.NotFoundException({ message: (0, categories_messages_1.t)(locale, 'notFound') });
        }
        await this.householdsService.assertMember(userId, category.householdId, acceptLanguage);
        return category;
    }
    async update(userId, categoryId, payload, acceptLanguage) {
        const category = await this.categoriesRepository.findById(categoryId);
        if (!category || !category.isActive) {
            const locale = (0, categories_messages_1.resolveLocale)(acceptLanguage);
            throw new common_1.NotFoundException({ message: (0, categories_messages_1.t)(locale, 'notFound') });
        }
        await this.householdsService.assertMember(userId, category.householdId, acceptLanguage);
        return this.categoriesRepository.updateCategory(categoryId, {
            name: payload.name,
            isActive: payload.isActive ?? category.isActive,
        });
    }
    async archive(userId, categoryId, acceptLanguage) {
        const category = await this.categoriesRepository.findById(categoryId);
        if (!category || !category.isActive) {
            const locale = (0, categories_messages_1.resolveLocale)(acceptLanguage);
            throw new common_1.NotFoundException({ message: (0, categories_messages_1.t)(locale, 'notFound') });
        }
        await this.householdsService.assertMember(userId, category.householdId, acceptLanguage);
        return this.categoriesRepository.updateCategory(categoryId, { isActive: false });
    }
    async balances(userId, householdId, month, acceptLanguage) {
        await this.householdsService.assertMember(userId, householdId, acceptLanguage);
        const locale = (0, categories_messages_1.resolveLocale)(acceptLanguage);
        const { start, end } = this.parseMonth(month);
        if (!start || !end) {
            throw new common_1.BadRequestException({ message: (0, categories_messages_1.t)(locale, 'invalidBody') });
        }
        const yearStart = new Date(Date.UTC(start.getUTCFullYear(), 0, 1));
        const yearEnd = new Date(Date.UTC(start.getUTCFullYear() + 1, 0, 1));
        const [monthSums, yearSums] = await Promise.all([
            this.categoriesRepository.sumByCategoryForRange(householdId, start, end),
            this.categoriesRepository.sumByCategoryForRange(householdId, yearStart, yearEnd),
        ]);
        const monthly = {};
        const yearly = {};
        for (const item of monthSums) {
            if (!item.categoryId)
                continue;
            monthly[item.categoryId] = item._sum.amount ?? BigInt(0);
        }
        for (const item of yearSums) {
            if (!item.categoryId)
                continue;
            yearly[item.categoryId] = item._sum.amount ?? BigInt(0);
        }
        return { month, monthly, yearly };
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
};
exports.CategoriesService = CategoriesService;
exports.CategoriesService = CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [categories_repository_1.CategoriesRepository,
        households_service_1.HouseholdsService])
], CategoriesService);
//# sourceMappingURL=categories.service.js.map