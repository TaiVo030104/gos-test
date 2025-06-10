import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '../entities/student.entity';
import * as fs from 'fs';
import * as path from 'path';
import * as csv from 'csv-parse';

@Injectable()
export class CsvSeeder {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  async seedFromCsv() {
    try {
      // Read CSV file
      const csvFilePath = path.join(
        process.cwd(),
        '..',
        'dataset',
        'diem_thi_thpt_2024.csv',
      );
      const fileContent = fs.readFileSync(csvFilePath, 'utf-8');

      // Parse CSV
      const records: any[] = [];
      const parser = csv.parse({
        columns: true,
        skip_empty_lines: true,
        trim: true,
      });

      // Process each record
      for await (const record of parser) {
        records.push({
          sbd: record.sbd,
          toan: parseFloat(record.toan) || null,
          ngu_van: parseFloat(record.ngu_van) || null,
          ngoai_ngu: parseFloat(record.ngoai_ngu) || null,
          vat_li: parseFloat(record.vat_li) || null,
          hoa_hoc: parseFloat(record.hoa_hoc) || null,
          sinh_hoc: parseFloat(record.sinh_hoc) || null,
          lich_su: parseFloat(record.lich_su) || null,
          dia_li: parseFloat(record.dia_li) || null,
          gdcd: parseFloat(record.gdcd) || null,
          ma_ngoai_ngu: record.ma_ngoai_ngu || null,
        });
      }

      // Clear existing data
      await this.studentRepository.clear();

      // Insert new data in batches
      const batchSize = 1000;
      for (let i = 0; i < records.length; i += batchSize) {
        const batch = records.slice(i, i + batchSize);
        await this.studentRepository.save(batch);
        console.log(`Processed ${i + batch.length} of ${records.length} records`);
      }

      console.log('CSV seeding completed successfully');
      return true;
    } catch (error) {
      console.error('Error seeding CSV:', error);
      throw error;
    }
  }

  async clearData(): Promise<void> {
    await this.studentRepository.clear();
    console.log('Database cleared');
  }
} 