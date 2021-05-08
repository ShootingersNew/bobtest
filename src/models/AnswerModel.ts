export class AnswerModel {
  title: string;
  id: number;
  constructor(init?: Partial<AnswerModel>) {
    if (init) {
      Object.assign(this, init);
    }
  }
}
