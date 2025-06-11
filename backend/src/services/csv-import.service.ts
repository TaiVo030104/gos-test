import { Injectable } from '@nestjs/common';
import { parse } from 'csv-parse';
import { createReadStream } from 'fs';
import { DataSource, Repository } from 'typeorm';
import { ExamScore } from '../entities/exam-score.entity';

@Injectable()
export class CsvImportService {
  private examScoreRepository: Repository<ExamScore>;

  constructor(private dataSource: DataSource) {
    this.examScoreRepository = this.dataSource.getRepository(ExamScore);
  }

  async importExamScores(filePath: string): Promise<void> {
    // Ensure table exists
    await this.dataSource.synchronize();
    console.log('Table synchronized');

    const records: any[] = [];
    const parser = createReadStream(filePath).pipe(
      parse({
        columns: true,
        skip_empty_lines: true,
        delimiter: ',',
      }),
    );

    for await (const record of parser) {
      // Convert string values to numbers where appropriate
      const examScore = new ExamScore();
      examScore.sbd = record.SBD || null;
      examScore.ho_ten = record.HoTen || null;
      examScore.toan = this.parseFloat(record.Toan);
      examScore.van = this.parseFloat(record.Van);
      examScore.ngoai_ngu = this.parseFloat(record.NgoaiNgu);
      examScore.vat_li = this.parseFloat(record.VatLi);
      examScore.hoa_hoc = this.parseFloat(record.HoaHoc);
      examScore.sinh_hoc = this.parseFloat(record.SinhHoc);
      examScore.lich_su = this.parseFloat(record.LichSu);
      examScore.dia_li = this.parseFloat(record.DiaLi);
      examScore.gdcd = this.parseFloat(record.GDCD);
      examScore.tong_diem = this.parseFloat(record.TongDiem);

      records.push(examScore);
    }

    if (records.length === 0) {
      throw new Error('No records found in CSV file');
    }

    // Save records in batches of 1000
    const batchSize = 1000;
    for (let i = 0; i < records.length; i += batchSize) {
      const batch = records.slice(i, i + batchSize);
      await this.examScoreRepository.save(batch);
      console.log(`Imported ${i + batch.length} of ${records.length} records`);
    }
  }

  private parseFloat(value: string): number | null {
    if (!value || value === '') return null;
    const num = parseFloat(value);
    return isNaN(num) ? null : num;
  }
} 