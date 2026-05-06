export interface DetailedStep {
  description: string;
  command?: string;
  codeBlock?: string;
  expectedOutput?: string;
}

export interface Task {
  title: string;
  steps: DetailedStep[];
}

export interface Command {
  cmd: string;
  purpose: string;
}

export interface Viva {
  question: string;
  answer: string;
}

export interface Experiment {
  id: string;
  title: string;
  aim: string;
  sourceUrl: string;
  tasks: Task[];
  commands: Command[];
  viva: Viva[];
  notes?: string[];
  conclusion?: string;
  result?: string;
}
