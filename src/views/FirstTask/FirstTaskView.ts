import { Component, Prop, Vue } from "vue-property-decorator";
import TaskView from "../Task/TaskView.vue";
import EditQuestion from "../../components/EditQuestion/EditQuestion.vue";
import { QuestionModel } from "@/models/QuestionModel";
import { AnswerModel } from "@/models/AnswerModel";
@Component({
  components: {
    TaskView,
    EditQuestion,
  },
})
export default class FirstTaskView extends Vue {
  questionObjectPlaceholder = new QuestionModel({
    title: "Первый вопрос",
    type: "one",
    types: [
      { id: "one", title: "Одиночный выбор" },
      { id: "multiple", title: "Множественный выбор" },
    ],
    answers: [
      new AnswerModel({ title: "Первый ответ", id: 0 }),
      new AnswerModel({ title: "Второй ответ", id: 1 }),
      new AnswerModel({ title: "Третий ответ", id: 2 }),
    ],
    correctAnswers: [0],
  });

  content: null | QuestionModel = null;

  getQuestionContent(obj: QuestionModel): void {
    this.content = obj;
  }
}
