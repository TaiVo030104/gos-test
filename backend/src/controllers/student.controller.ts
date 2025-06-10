import { Controller, Get, Query, ValidationPipe, Post } from '@nestjs/common';
import { StudentService } from '../services/student.service';
import { CsvSeeder } from '../seeders/csv-seeder';
import { ScoreQueryDto, ScoreLevelDto, SubjectStatisticsDto, TopStudentDto } from '../dto/score-query.dto';

@Controller('students')
export class StudentController {
  constructor(
    private readonly studentService: StudentService,
    private readonly csvSeeder: CsvSeeder,
  ) {}

  @Post('seed')
  async seedData() {
    try {
      await this.csvSeeder.seedFromCsv();
      return {
        success: true,
        message: 'Database seeded successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: 'Error seeding database',
        error: error.message,
      };
    }
  }

  @Get('score')
  async getScoreByRegistrationNumber(
    @Query(ValidationPipe) query: ScoreQueryDto,
  ) {
    const student = await this.studentService.findByRegistrationNumber(query.sbd);
    
    if (!student) {
      return {
        success: false,
        message: 'Student not found',
        data: null,
      };
    }

    return {
      success: true,
      message: 'Student found',
      data: student,
    };
  }

  @Get('score-levels')
  async getScoreLevels(): Promise<{
    success: boolean;
    message: string;
    data: ScoreLevelDto[];
  }> {
    const data = await this.studentService.getScoreLevels();
    
    return {
      success: true,
      message: 'Score levels retrieved successfully',
      data,
    };
  }

  @Get('subject-statistics')
  async getSubjectStatistics(): Promise<{
    success: boolean;
    message: string;
    data: SubjectStatisticsDto[];
  }> {
    const data = await this.studentService.getSubjectStatistics();
    
    return {
      success: true,
      message: 'Subject statistics retrieved successfully',
      data,
    };
  }

  @Get('top-10-group-a')
  async getTop10GroupAStudents(): Promise<{
    success: boolean;
    message: string;
    data: TopStudentDto[];
  }> {
    const data = await this.studentService.getTop10GroupAStudents();
    
    return {
      success: true,
      message: 'Top 10 Group A students retrieved successfully',
      data,
    };
  }
} 