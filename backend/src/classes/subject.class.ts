export class Subject {
  constructor(
    public name: string,
    public code: string,
    public displayName: string,
  ) {}

  // Get score level based on points
  getScoreLevel(score: number): string {
    if (score >= 8) return '>=8 points';
    if (score >= 6) return '6-8 points';
    if (score >= 4) return '4-6 points';
    return '<4 points';
  }

  // Check if score is in group A (math, physics, chemistry)
  isGroupA(): boolean {
    return ['toan', 'vat_li', 'hoa_hoc'].includes(this.code);
  }

  // Get subject color for charts
  getColor(): string {
    const colors = {
      toan: '#FF6384',
      ngu_van: '#36A2EB',
      ngoai_ngu: '#FFCE56',
      vat_li: '#4BC0C0',
      hoa_hoc: '#9966FF',
      sinh_hoc: '#FF9F40',
      lich_su: '#FF6384',
      dia_li: '#C9CBCF',
      gdcd: '#4BC0C0',
    };
    return colors[this.code] || '#FF6384';
  }
}

// Predefined subjects
export const SUBJECTS = {
  TOAN: new Subject('toan', 'toan', 'Toan'),
  NGU_VAN: new Subject('ngu_van', 'ngu_van', 'Ngu van'),
  NGOAI_NGU: new Subject('ngoai_ngu', 'ngoai_ngu', 'Ngoai ngu'),
  VAT_LI: new Subject('vat_li', 'vat_li', 'Vat li'),
  HOA_HOC: new Subject('hoa_hoc', 'hoa_hoc', 'Hoa hoc'),
  SINH_HOC: new Subject('sinh_hoc', 'sinh_hoc', 'Sinh hoc'),
  LICH_SU: new Subject('lich_su', 'lich_su', 'Lich su'),
  DIA_LI: new Subject('dia_li', 'dia_li', 'Dia li'),
  GDCD: new Subject('gdcd', 'gdcd', 'GDCD'),
};

export const GROUP_A_SUBJECTS = [
  SUBJECTS.TOAN,
  SUBJECTS.VAT_LI,
  SUBJECTS.HOA_HOC,
]; 