import { IsString, IsNotEmpty, Length } from 'class-validator';

export class ScoreQueryDto {
  @IsString()
  @IsNotEmpty()
  @Length(8, 8, { message: 'Registration number must be exactly 8 characters' })
  sbd: string;
}

export class ScoreLevelDto {
  level: string;
  count: number;
  percentage: number;
}

export class SubjectStatisticsDto {
  subject: string;
  displayName: string;
  levels: ScoreLevelDto[];
  totalStudents: number;
  color: string;
}

export class TopStudentDto {
  sbd: string;
  toan: number;
  vat_li: number;
  hoa_hoc: number;
  average: number;
  rank: number;
} 