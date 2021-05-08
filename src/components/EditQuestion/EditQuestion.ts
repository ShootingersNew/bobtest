import { QuestionModel } from "@/models/QuestionModel";
import { Component, Prop, Vue } from "vue-property-decorator";
@Component({})
export default class EditQuestion extends Vue {
  @Prop({ default: () => new QuestionModel() })
  question: QuestionModel;
  get editQuestion() {
    return this.question;
  }

  set editQuestion(val) {
    this.$emit("input", val);
  }
}
