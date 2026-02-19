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
exports.HouseholdsRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let HouseholdsRepository = class HouseholdsRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    listForUser(userId) {
        return this.prisma.household.findMany({
            where: {
                members: {
                    some: { userId },
                },
            },
            include: {
                members: {
                    where: { userId },
                    select: { role: true },
                },
            },
            orderBy: { createdAt: 'asc' },
        });
    }
    findById(id) {
        return this.prisma.household.findUnique({
            where: { id },
        });
    }
    createHousehold(data) {
        return this.prisma.household.create({ data });
    }
    updateHousehold(id, data) {
        return this.prisma.household.update({
            where: { id },
            data,
        });
    }
    findMembership(userId, householdId) {
        return this.prisma.householdMember.findUnique({
            where: {
                householdId_userId: {
                    householdId,
                    userId,
                },
            },
        });
    }
    addMember(data) {
        return this.prisma.householdMember.create({ data });
    }
    findUserByEmail(email) {
        return this.prisma.user.findUnique({ where: { email } });
    }
};
exports.HouseholdsRepository = HouseholdsRepository;
exports.HouseholdsRepository = HouseholdsRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], HouseholdsRepository);
//# sourceMappingURL=households.repository.js.map