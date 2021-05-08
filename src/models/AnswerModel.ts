export class AnswerModel {
  title: String;
  isChecked: boolean;
  constructor(init?: Partial<AnswerModel>) {
    if (init) {
      Object.assign(this, init);
    }
  }
}
