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
exports.ReportsController = void 0;
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../auth/auth.guard");
const reports_schemas_1 = require("./reports.schemas");
const reports_service_1 = require("./reports.service");
const reports_messages_1 = require("./reports.messages");
let ReportsController = class ReportsController {
    constructor(reportsService) {
        this.reportsService = reportsService;
    }
    async monthly(request, householdId, query, acceptLanguage) {
        const parsed = reports_schemas_1.MonthlyReportQuerySchema.safeParse(query);
        if (!parsed.success) {
            const locale = (0, reports_messages_1.resolveLocale)(acceptLanguage);
            throw new common_1.BadRequestException({ message: (0, reports_messages_1.t)(locale, 'invalidBody') });
        }
        return this.reportsService.monthly(request.user.id, householdId, parsed.data, acceptLanguage);
    }
};
exports.ReportsController = ReportsController;
__decorate([
    (0, common_1.Get)('households/:householdId/reports/monthly'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('householdId')),
    __param(2, (0, common_1.Query)()),
    __param(3, (0, common_1.Headers)('accept-language')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object, String]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "monthly", null);
exports.ReportsController = ReportsController = __decorate([
    (0, common_1.Controller)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __metadata("design:paramtypes", [reports_service_1.ReportsService])
], ReportsController);
//# sourceMappingURL=reports.controller.js.map