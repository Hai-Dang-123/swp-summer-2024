import { Controller, Get, Query, Render } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  @Render('search')
  async search(@Query('q') query: string) {
    const results = await this.searchService.search(query);
    return { query, results };
  }
}