export interface SubjectResult {
  nrollno: string;
  stname: string;
  byoa: number;
  yoa: number;
  father: string;
  prgcode: string;
  prgname: string;
  icode: string;
  iname: string;
  euno: number;
  papercode: string;
  papername: string;
  minorprint: string;
  majorprint: string;
  moderatedprint: string;
  statuscode: string;
  rmonth: number;
  ryear: number;
  declareddate: string;
  eugpa: number;
  credits: number;
}

export interface SemesterData {
  semester: number;
  subjects: SubjectResult[];
  sgpa: number;
  totalMarks: number;
  maxMarks: number;
  percentage: number;
}

export interface CumulativeData {
  semester: string;
  marks: string;
  percentage: string;
  gpa: string;
}

export interface ChartData {
  name: string;
  SGPA: number;
  Percentage: number;
}

export interface RadarData {
  semester: string;
  performance: number;
}
