import { AnswerModel } from "./AnswerModel";

type typesUnion = "one" | "multiple";
export class QuestionModel {
  title: string;
  type: typesUnion;
  types: { title: string; slug: typesUnion }[];
  answers: AnswerModel[];
  constructor(init?: Partial<QuestionModel>) {
    if (init) {
      Object.assign(this, init);
    }
  }
}
