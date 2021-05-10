<template>
  <v-list-item class="align-center question">
    <v-checkbox
      hide-details
      class="questionList__item-checkbox mt-0 pt-0 mr-5"
      v-model="editCheckboxes"
      :value="editQuestion.id"
    ></v-checkbox>
    {{ editQuestion.title }}
    <v-spacer> </v-spacer>

    <v-list-item-action class="flex-row">
      <v-btn icon class="question__edit ml-5" @click="dialog = true">
        <v-icon>mdi-pencil</v-icon></v-btn
      >
      <v-btn
        @click="$emit('remove', editQuestion.id)"
        icon
        class="question__delete ml-5"
        ><v-icon>mdi-close-circle</v-icon></v-btn
      >
    </v-list-item-action>
    <div>
      <v-dialog v-if="dialog" v-model="dialog">
        <v-card>
          <v-card-text>
            <edit-question
              :question.sync="editQuestion"
              :submitFunc="() => (dialog = false)"
            ></edit-question></v-card-text
        ></v-card>
      </v-dialog>
    </div>
  </v-list-item>
</template>
<script lang="ts">
import { QuestionModel } from "@/models/QuestionModel";
import EditQuestion from "@/components/EditQuestion/EditQuestion.vue";
import { Component, Prop, Vue } from "vue-property-decorator";
@Component({
  name: "Question",
  components: {
    EditQuestion,
  },
})
export default class Question extends Vue {
  dialog = false;
  @Prop({ default: [] }) question: QuestionModel;
  @Prop({ default: [] }) checkboxes: number[];
  get editQuestion(): QuestionModel {
    return this.question;
  }
  set editQuestion(val: QuestionModel) {
    this.$emit("update:question", val);
  }
  get editCheckboxes(): number[] {
    return this.checkboxes;
  }
  set editCheckboxes(val: number[]) {
    this.$emit("update:checkboxes", val);
  }
}
</script>
