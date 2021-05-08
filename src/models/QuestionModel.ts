import { AnswerModel } from "./AnswerModel";

type typesUnion = "one" | "multiple";
export class QuestionModel {
  title: string;
  type: typesUnion;
  types: { title: string; id: typesUnion }[];
  answers: AnswerModel[];
  correctAnswers: string[];
  constructor(init?: Partial<QuestionModel>) {
    if (init) {
      Object.assign(this, init);
    }
  }
}
