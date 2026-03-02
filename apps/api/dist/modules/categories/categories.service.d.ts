import { CreateCategoryDto, UpdateCategoryDto } from './categories.schemas';
import { CategoriesRepository } from './categories.repository';
import { HouseholdsService } from '../households/households.service';
export declare class CategoriesService {
    private readonly categoriesRepository;
    private readonly householdsService;
    constructor(categoriesRepository: CategoriesRepository, householdsService: HouseholdsService);
    list(userId: string, householdId: string, acceptLanguage?: string): Promise<{
        id: string;
        householdId: string;
        name: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    create(userId: string, householdId: string, payload: CreateCategoryDto, acceptLanguage?: string): Promise<{
        id: string;
        householdId: string;
        name: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    get(userId: string, categoryId: string, acceptLanguage?: string): Promise<{
        id: string;
        householdId: string;
        name: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(userId: string, categoryId: string, payload: UpdateCategoryDto, acceptLanguage?: string): Promise<{
        id: string;
        householdId: string;
        name: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    archive(userId: string, categoryId: string, acceptLanguage?: string): Promise<{
        id: string;
        householdId: string;
        name: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    balances(userId: string, householdId: string, month: string, acceptLanguage?: string): Promise<{
        month: string;
        monthly: Record<string, bigint>;
        yearly: Record<string, bigint>;
    }>;
    private parseMonth;
}
