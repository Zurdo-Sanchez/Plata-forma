import { AuthRequest } from '../auth/auth.guard';
import { CategoriesService } from './categories.service';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    list(request: AuthRequest, householdId: string, acceptLanguage?: string): Promise<{
        id: string;
        householdId: string;
        name: string;
        type: import(".prisma/client").$Enums.CategoryType;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    create(request: AuthRequest, householdId: string, body: unknown, acceptLanguage?: string): Promise<{
        ok: boolean;
        message: string;
        category: {
            id: string;
            householdId: string;
            name: string;
            type: import(".prisma/client").$Enums.CategoryType;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    get(request: AuthRequest, id: string, acceptLanguage?: string): Promise<{
        id: string;
        householdId: string;
        name: string;
        type: import(".prisma/client").$Enums.CategoryType;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(request: AuthRequest, id: string, body: unknown, acceptLanguage?: string): Promise<{
        ok: boolean;
        message: string;
        category: {
            id: string;
            householdId: string;
            name: string;
            type: import(".prisma/client").$Enums.CategoryType;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    archive(request: AuthRequest, id: string, acceptLanguage?: string): Promise<{
        ok: boolean;
        message: string;
        category: {
            id: string;
            householdId: string;
            name: string;
            type: import(".prisma/client").$Enums.CategoryType;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
}
