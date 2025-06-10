import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('students')
export class Student {
  @PrimaryColumn()
  sbd: string; // Registration number

  @Column({ type: 'decimal', precision: 4, scale: 2, nullable: true })
  toan?: number; // Math

  @Column({ type: 'decimal', precision: 4, scale: 2, nullable: true })
  ngu_van?: number; // Literature

  @Column({ type: 'decimal', precision: 4, scale: 2, nullable: true })
  ngoai_ngu?: number; // Foreign language

  @Column({ type: 'decimal', precision: 4, scale: 2, nullable: true })
  vat_li?: number; // Physics

  @Column({ type: 'decimal', precision: 4, scale: 2, nullable: true })
  hoa_hoc?: number; // Chemistry

  @Column({ type: 'decimal', precision: 4, scale: 2, nullable: true })
  sinh_hoc?: number; // Biology

  @Column({ type: 'decimal', precision: 4, scale: 2, nullable: true })
  lich_su?: number; // History

  @Column({ type: 'decimal', precision: 4, scale: 2, nullable: true })
  dia_li?: number; // Geography

  @Column({ type: 'decimal', precision: 4, scale: 2, nullable: true })
  gdcd?: number; // Civic education

  @Column({ nullable: true })
  ma_ngoai_ngu?: string; // Foreign language code
} 