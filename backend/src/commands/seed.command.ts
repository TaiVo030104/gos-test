import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { CsvSeeder } from '../seeders/csv-seeder';

@Injectable()
export class SeedCommand {
  constructor(private readonly csvSeeder: CsvSeeder) {}

  @Command({
    command: 'seed:csv',
    describe: 'Seed database with CSV data',
  })
  async seed() {
    try {
      console.log('Starting CSV seeding...');
      await this.csvSeeder.seedFromCsv();
      console.log('CSV seeding completed successfully');
    } catch (error) {
      console.error('Error seeding CSV:', error);
      process.exit(1);
    }
  }
} 