import { LoansRepository } from './loans.repository';
import { HouseholdsService } from '../households/households.service';
import { CreateLoanDto, UpdateLoanDto } from './loans.schemas';
export declare class LoansService {
    private readonly loansRepository;
    private readonly householdsService;
    constructor(loansRepository: LoansRepository, householdsService: HouseholdsService);
    list(userId: string, householdId: string, acceptLanguage?: string): Promise<any>;
    create(userId: string, householdId: string, payload: CreateLoanDto, acceptLanguage?: string): Promise<any>;
    get(userId: string, loanId: string, acceptLanguage?: string): Promise<any>;
    update(userId: string, loanId: string, payload: UpdateLoanDto, acceptLanguage?: string): Promise<any>;
    private parseDate;
}
