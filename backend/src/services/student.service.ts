import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '../entities/student.entity';
import { SUBJECTS, GROUP_A_SUBJECTS, Subject } from '../classes/subject.class';
import { ScoreLevelDto, SubjectStatisticsDto, TopStudentDto } from '../dto/score-query.dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  async findByRegistrationNumber(sbd: string): Promise<Student | null> {
    return this.studentRepository.findOne({ where: { sbd } });
  }

  async getScoreLevels(): Promise<ScoreLevelDto[]> {
    const levels = ['>=8 points', '6-8 points', '4-6 points', '<4 points'];
    const result: ScoreLevelDto[] = [];

    for (const level of levels) {
      const count = await this.getStudentCountByLevel(level);
      const total = await this.studentRepository.count();
      const percentage = total > 0 ? (count / total) * 100 : 0;

      result.push({
        level,
        count,
        percentage: Math.round(percentage * 100) / 100,
      });
    }

    return result;
  }

  async getSubjectStatistics(): Promise<SubjectStatisticsDto[]> {
    const subjects = Object.values(SUBJECTS);
    const result: SubjectStatisticsDto[] = [];

    for (const subject of subjects) {
      const levels = await this.getSubjectScoreLevels(subject);
      const totalStudents = await this.getSubjectStudentCount(subject.code);
      
      result.push({
        subject: subject.code,
        displayName: subject.displayName,
        levels,
        totalStudents,
        color: subject.getColor(),
      });
    }

    return result;
  }

  async getTop10GroupAStudents(): Promise<TopStudentDto[]> {
    const students = await this.studentRepository
      .createQueryBuilder('student')
      .select([
        'student.sbd',
        'student.toan',
        'student.vat_li',
        'student.hoa_hoc',
      ])
      .where('student.toan IS NOT NULL')
      .andWhere('student.vat_li IS NOT NULL')
      .andWhere('student.hoa_hoc IS NOT NULL')
      .orderBy('(student.toan + student.vat_li + student.hoa_hoc) / 3', 'DESC')
      .limit(10)
      .getRawMany();

    return students.map((student, index) => ({
      sbd: student.student_sbd,
      toan: parseFloat(student.student_toan),
      vat_li: parseFloat(student.student_vat_li),
      hoa_hoc: parseFloat(student.student_hoa_hoc),
      average: Math.round(((parseFloat(student.student_toan) + parseFloat(student.student_vat_li) + parseFloat(student.student_hoa_hoc)) / 3) * 100) / 100,
      rank: index + 1,
    }));
  }

  private async getStudentCountByLevel(level: string): Promise<number> {
    const subjects = Object.values(SUBJECTS);
    let totalCount = 0;

    for (const subject of subjects) {
      const count = await this.getSubjectLevelCount(subject.code, level);
      totalCount += count;
    }

    return totalCount;
  }

  private async getSubjectScoreLevels(subject: Subject): Promise<ScoreLevelDto[]> {
    const levels = ['>=8 points', '6-8 points', '4-6 points', '<4 points'];
    const result: ScoreLevelDto[] = [];

    for (const level of levels) {
      const count = await this.getSubjectLevelCount(subject.code, level);
      const total = await this.getSubjectStudentCount(subject.code);
      const percentage = total > 0 ? (count / total) * 100 : 0;

      result.push({
        level,
        count,
        percentage: Math.round(percentage * 100) / 100,
      });
    }

    return result;
  }

  private async getSubjectLevelCount(subjectCode: string, level: string): Promise<number> {
    const query = this.studentRepository
      .createQueryBuilder('student')
      .where(`student.${subjectCode} IS NOT NULL`);

    switch (level) {
      case '>=8 points':
        query.andWhere(`student.${subjectCode} >= 8`);
        break;
      case '6-8 points':
        query.andWhere(`student.${subjectCode} >= 6 AND student.${subjectCode} < 8`);
        break;
      case '4-6 points':
        query.andWhere(`student.${subjectCode} >= 4 AND student.${subjectCode} < 6`);
        break;
      case '<4 points':
        query.andWhere(`student.${subjectCode} < 4`);
        break;
    }

    return query.getCount();
  }

  private async getSubjectStudentCount(subjectCode: string): Promise<number> {
    return this.studentRepository
      .createQueryBuilder('student')
      .where(`student.${subjectCode} IS NOT NULL`)
      .getCount();
  }
} 