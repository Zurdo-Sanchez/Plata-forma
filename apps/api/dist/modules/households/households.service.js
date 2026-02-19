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
exports.HouseholdsService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const households_repository_1 = require("./households.repository");
const households_messages_1 = require("./households.messages");
let HouseholdsService = class HouseholdsService {
    constructor(repository) {
        this.repository = repository;
    }
    async list(userId) {
        return this.repository.listForUser(userId);
    }
    async create(userId, payload) {
        return this.repository.createHousehold({
            name: payload.name,
            currency: payload.currency || null,
            members: {
                create: {
                    user: { connect: { id: userId } },
                    role: client_1.HouseholdRole.OWNER,
                },
            },
        });
    }
    async get(userId, householdId, acceptLanguage) {
        await this.assertMember(userId, householdId, acceptLanguage);
        const household = await this.repository.findById(householdId);
        if (!household) {
            const locale = (0, households_messages_1.resolveLocale)(acceptLanguage);
            throw new common_1.NotFoundException({ message: (0, households_messages_1.t)(locale, 'notFound') });
        }
        return household;
    }
    async update(userId, householdId, payload, acceptLanguage) {
        await this.assertOwner(userId, householdId, acceptLanguage);
        return this.repository.updateHousehold(householdId, {
            name: payload.name,
            currency: payload.currency ?? null,
        });
    }
    async addMember(userId, householdId, payload, acceptLanguage) {
        await this.assertOwner(userId, householdId, acceptLanguage);
        const locale = (0, households_messages_1.resolveLocale)(acceptLanguage);
        const email = payload.email.trim().toLowerCase();
        const targetUser = await this.repository.findUserByEmail(email);
        if (!targetUser) {
            throw new common_1.NotFoundException({ message: (0, households_messages_1.t)(locale, 'userNotFound') });
        }
        const existing = await this.repository.findMembership(targetUser.id, householdId);
        if (existing) {
            throw new common_1.BadRequestException({ message: (0, households_messages_1.t)(locale, 'memberExists') });
        }
        return this.repository.addMember({
            role: payload.role ? payload.role : client_1.HouseholdRole.MEMBER,
            household: { connect: { id: householdId } },
            user: { connect: { id: targetUser.id } },
        });
    }
    async assertMember(userId, householdId, acceptLanguage) {
        const membership = await this.repository.findMembership(userId, householdId);
        if (!membership) {
            const locale = (0, households_messages_1.resolveLocale)(acceptLanguage);
            throw new common_1.ForbiddenException({ message: (0, households_messages_1.t)(locale, 'forbidden') });
        }
        return membership;
    }
    async assertOwner(userId, householdId, acceptLanguage) {
        const membership = await this.assertMember(userId, householdId, acceptLanguage);
        if (membership.role !== client_1.HouseholdRole.OWNER) {
            const locale = (0, households_messages_1.resolveLocale)(acceptLanguage);
            throw new common_1.ForbiddenException({ message: (0, households_messages_1.t)(locale, 'forbidden') });
        }
        return membership;
    }
};
exports.HouseholdsService = HouseholdsService;
exports.HouseholdsService = HouseholdsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [households_repository_1.HouseholdsRepository])
], HouseholdsService);
//# sourceMappingURL=households.service.js.map