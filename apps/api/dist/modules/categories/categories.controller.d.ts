import { AuthRequest } from '../auth/auth.guard';
import { CategoriesService } from './categories.service';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    list(request: AuthRequest, householdId: string, acceptLanguage?: string): Promise<any>;
    create(request: AuthRequest, householdId: string, body: unknown, acceptLanguage?: string): Promise<{
        ok: boolean;
        message: string;
        category: Category;
    }>;
    get(request: AuthRequest, id: string, acceptLanguage?: string): Promise<any>;
    update(request: AuthRequest, id: string, body: unknown, acceptLanguage?: string): Promise<{
        ok: boolean;
        message: string;
        category: Category;
    }>;
    archive(request: AuthRequest, id: string, acceptLanguage?: string): Promise<{
        ok: boolean;
        message: string;
        category: Category;
    }>;
}
