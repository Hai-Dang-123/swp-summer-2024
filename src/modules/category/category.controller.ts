import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CategoryService } from "./category.service";

@Controller('category')
export class CategoryController {
    constructor(
        private readonly categoryService: CategoryService
    ) {}

    @Get()
    async getAll() {
        return await this.categoryService.getAll();
    }

    @Get('include-deleted')
    async getAllWithDeleted() {
        return await this.categoryService.getAllWithDeleted();
    }

    @Get(':id')
    async getOne(@Param('id') id: string){
        return await this.categoryService.getOne(id);
    }

    @Post()
    async create(@Body() body: any) {
        return await this.categoryService.create(body);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() body: any) {
        return await this.categoryService.update(id, body);
    }

    @Delete(':id')
    async deleteHard(@Param('id') id: string) {
        return await this.categoryService.delete(id);
    }

    @Delete('soft-delete/:id')
    async delete(@Param('id') id: string) {
        return await this.categoryService.softDelete(id);
    }

    @Put('restore/:id')
    async restore(@Param('id') id: string) {
        return await this.categoryService.restore(id);
    }


}