import { CreateCategoryDto, UpdateCategoryDto } from './categories.schemas';
import { CategoriesRepository } from './categories.repository';
import { HouseholdsService } from '../households/households.service';
export declare class CategoriesService {
    private readonly categoriesRepository;
    private readonly householdsService;
    constructor(categoriesRepository: CategoriesRepository, householdsService: HouseholdsService);
    list(userId: string, householdId: string, acceptLanguage?: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        householdId: string;
        type: import(".prisma/client").$Enums.CategoryType;
        isActive: boolean;
    }[]>;
    create(userId: string, householdId: string, payload: CreateCategoryDto, acceptLanguage?: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        householdId: string;
        type: import(".prisma/client").$Enums.CategoryType;
        isActive: boolean;
    }>;
    get(userId: string, categoryId: string, acceptLanguage?: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        householdId: string;
        type: import(".prisma/client").$Enums.CategoryType;
        isActive: boolean;
    }>;
    update(userId: string, categoryId: string, payload: UpdateCategoryDto, acceptLanguage?: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        householdId: string;
        type: import(".prisma/client").$Enums.CategoryType;
        isActive: boolean;
    }>;
    archive(userId: string, categoryId: string, acceptLanguage?: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        householdId: string;
        type: import(".prisma/client").$Enums.CategoryType;
        isActive: boolean;
    }>;
}
