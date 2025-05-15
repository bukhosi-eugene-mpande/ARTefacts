export type QuestionType = 'riddle' | 'blank' | 'mcq';

export interface Riddle {
  id: number;
  riddle: string;
  artefactId: number;
  type: 'riddle';
}

export interface Blank {
  id: number;
  question: string;
  answerOne: string;
  answerTwo: string;
  type: 'blank';
}

export interface McqOption {
  id: number;
  text: string;
}

export interface Mcq {
  mcqId: number;
  question: string;
  correctOptionId: number;
  options: McqOption[];
  type: 'mcq';
}

export type CombinedQuestion = Riddle | Blank | Mcq;

export interface QuestionData {
  riddles: Riddle[];
  blanks: Blank[];
  mcqs: Mcq[];
}
