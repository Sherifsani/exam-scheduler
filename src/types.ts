export interface Exam {
  id: string;
  courseName: string;
  courseCode?: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  notes?: string;
  color?: string;
}

export type Theme = "light" | "dark" | "system";
