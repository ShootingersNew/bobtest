import { QuestionModel } from "./QuestionModel";

export class SurveyFormModel {
  title = "default title";
  category: "Первая категория" | "Вторая категория" = "Первая категория";
  questions: QuestionModel[] = [];
  constructor(init?: Partial<SurveyFormModel>) {
    if (init) {
      Object.assign(this, init);
    }
  }
}
