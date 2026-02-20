import { AuthRequest } from '../auth/auth.guard';
import { CategoriesService } from './categories.service';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    list(request: AuthRequest, householdId: string, acceptLanguage?: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        type: import(".prisma/client").$Enums.CategoryType;
        householdId: string;
        isActive: boolean;
    }[]>;
    create(request: AuthRequest, householdId: string, body: unknown, acceptLanguage?: string): Promise<{
        ok: boolean;
        message: string;
        category: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            type: import(".prisma/client").$Enums.CategoryType;
            householdId: string;
            isActive: boolean;
        };
    }>;
    get(request: AuthRequest, id: string, acceptLanguage?: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        type: import(".prisma/client").$Enums.CategoryType;
        householdId: string;
        isActive: boolean;
    }>;
    update(request: AuthRequest, id: string, body: unknown, acceptLanguage?: string): Promise<{
        ok: boolean;
        message: string;
        category: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            type: import(".prisma/client").$Enums.CategoryType;
            householdId: string;
            isActive: boolean;
        };
    }>;
    archive(request: AuthRequest, id: string, acceptLanguage?: string): Promise<{
        ok: boolean;
        message: string;
        category: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            type: import(".prisma/client").$Enums.CategoryType;
            householdId: string;
            isActive: boolean;
        };
    }>;
}
