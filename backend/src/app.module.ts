import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommandModule } from 'nestjs-command';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Student } from './entities/student.entity';
import { StudentController } from './controllers/student.controller';
import { StudentService } from './services/student.service';
import { CsvSeeder } from './seeders/csv-seeder';
import { SeedCommand } from './commands/seed.command';
import { CsvImportService } from './services/csv-import.service';
import { ImportCsvCommand } from './commands/import-csv.command';
import { ExamScore } from './entities/exam-score.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT ?? '5432'),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || '12345',
      database: process.env.DB_DATABASE || 'exam_scores',
      entities: [Student, ExamScore],
      synchronize: true, // Only for development
      logging: true,
      logger: 'advanced-console',
    }),
    TypeOrmModule.forFeature([Student, ExamScore]),
    CommandModule,
  ],
  controllers: [AppController, StudentController],
  providers: [AppService, StudentService, CsvSeeder, SeedCommand, CsvImportService, ImportCsvCommand],
})
export class AppModule {}
