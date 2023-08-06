import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  home() {
    return `
        Welcome to the Pokemon Go Searchbase CRUD Application!
        This application allows you to explore and manage Pokemon data. 

        You can perform various operations such as listing all Pokemon, 
        searching for specific Pokemon, filtering them based on types and rarity,
        and navigating through paginated results.`;
  }
}
