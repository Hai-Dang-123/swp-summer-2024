import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/common/base/service.base";
import { CategoryEntity } from "src/entities/category.entity";
import { Repository } from "typeorm";

@Injectable()
export class CategoryService extends BaseService<CategoryEntity> {
    constructor(
        @InjectRepository(CategoryEntity) private readonly categoryRepository: Repository<CategoryEntity>
    ) {
        super(categoryRepository);
    }
}