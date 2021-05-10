import { AnswerModel } from "./AnswerModel";

type typesUnion = "one" | "multiple";
export class QuestionModel {
  id: number;
  title = "";
  type: typesUnion = "one";
  types: { title: string; id: typesUnion }[] = [
    { id: "one", title: "Одиночный выбор" },
    { id: "multiple", title: "Множественный выбор" },
  ];
  answers: AnswerModel[] = [];
  correctAnswers: number[] = [0];
  constructor(init?: Partial<QuestionModel>) {
    if (init) {
      Object.assign(this, init);
    }
  }
}
