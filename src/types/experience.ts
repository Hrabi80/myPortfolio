export interface Experience {
  id: string;
  title: string;
  company: string;
  type: string;
  location: string;
  workMode: string;
  period: string;
  duration?: string;
  summary?: string;
  responsibilities?: string[];
  achievements?: string[];
  skills: string[];
  tools?: string[];
  color?: string;
}
