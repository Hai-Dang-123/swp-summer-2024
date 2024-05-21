import { Injectable } from '@nestjs/common';

@Injectable()
export class SearchService {
  async search(query: string) {
    // Implement your search logic here
    // For now, let's return a mock result
    return [
      { id: 1, name: 'Result 1', description: 'Description 1' },
      { id: 2, name: 'Result 2', description: 'Description 2' },
      // Add more mock results as needed
    ];
  }
}