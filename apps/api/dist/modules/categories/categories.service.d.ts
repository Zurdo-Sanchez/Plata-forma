import { CreateCategoryDto, UpdateCategoryDto } from './categories.schemas';
import { CategoriesRepository } from './categories.repository';
import { HouseholdsService } from '../households/households.service';
export declare class CategoriesService {
    private readonly categoriesRepository;
    private readonly householdsService;
    constructor(categoriesRepository: CategoriesRepository, householdsService: HouseholdsService);
    list(userId: string, householdId: string, acceptLanguage?: string): Promise<any>;
    create(userId: string, householdId: string, payload: CreateCategoryDto, acceptLanguage?: string): Promise<Category>;
    get(userId: string, categoryId: string, acceptLanguage?: string): Promise<any>;
    update(userId: string, categoryId: string, payload: UpdateCategoryDto, acceptLanguage?: string): Promise<Category>;
    archive(userId: string, categoryId: string, acceptLanguage?: string): Promise<Category>;
}
