import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('exam_scores')
export class ExamScore {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  sbd: string;

  @Column({ nullable: true })
  ho_ten: string;

  @Column({ type: 'float', nullable: true })
  toan: number | null;

  @Column({ type: 'float', nullable: true })
  van: number | null;

  @Column({ type: 'float', nullable: true })
  ngoai_ngu: number | null;

  @Column({ type: 'float', nullable: true })
  vat_li: number | null;

  @Column({ type: 'float', nullable: true })
  hoa_hoc: number | null;

  @Column({ type: 'float', nullable: true })
  sinh_hoc: number | null;

  @Column({ type: 'float', nullable: true })
  lich_su: number | null;

  @Column({ type: 'float', nullable: true })
  dia_li: number | null;

  @Column({ type: 'float', nullable: true })
  gdcd: number | null;

  @Column({ type: 'float', nullable: true })
  tong_diem: number | null;
} 