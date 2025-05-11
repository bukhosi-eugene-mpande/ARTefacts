// types/Questions.ts
export interface Option {
  id: number;
  option_text: string;
  artefact_id: number;
}

export interface Question {
  id: number;
  question_text: string;
  correct_answer_id: number;
  options: Option[];
}

export interface QuestionData {
  questions: Question[];
  count: number;
}
