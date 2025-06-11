import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { CsvImportService } from '../services/csv-import.service';
import { DataSource } from 'typeorm';

@Injectable()
export class ImportCsvCommand {
  constructor(
    private readonly csvImportService: CsvImportService,
    private readonly dataSource: DataSource,
  ) {}

  @Command({
    command: 'import:exam-scores',
    describe: 'Import exam scores from CSV file',
  })
  async import() {
    try {
      // Drop existing table
      await this.dataSource.query('DROP TABLE IF EXISTS exam_scores CASCADE');
      console.log('Dropped existing table');

      const filePath = 'C:/Users/Admin/Music/gos-test/dataset/diem_thi_thpt_2024.csv';
      console.log(`Importing exam scores from ${filePath}...`);
      await this.csvImportService.importExamScores(filePath);
      console.log('Import completed successfully!');
    } catch (error) {
      console.error('Error importing data:', error.message);
    }
  }
} 