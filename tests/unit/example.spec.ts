import { createLocalVue, mount, shallowMount } from "@vue/test-utils";
import { QuestionModel } from "@/models/QuestionModel";
import { AnswerModel } from "@/models/AnswerModel";
import Vuetify from "vuetify";
import EditQuestion from "@/components/EditQuestion/EditQuestion.vue";
import Vue from "vue";

describe("EditQuestion.vue", () => {
  Vue.use(Vuetify);
  const localVue = createLocalVue();
  let vuetify: Vuetify;
  let question = new QuestionModel({
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
  beforeEach(() => {
    vuetify = new Vuetify();
    question = new QuestionModel({
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
  });

  const questionWithMultiple = new QuestionModel({
    ...question,
    type: "multiple",
  });

  it("reacts on question.type", async () => {
    let wrapper = mount(EditQuestion, {
      localVue,
      vuetify,
      propsData: {
        question,
      },
    });
    expect(wrapper.findComponent({ name: "v-radio" }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: "v-checkbox" }).exists()).toBe(false);
    await wrapper.setProps({
      question: questionWithMultiple,
    });
    expect(wrapper.findComponent({ name: "v-radio" }).exists()).toBe(false);
    expect(wrapper.findComponent({ name: "v-checkbox" }).exists()).toBe(true);
  });

  it("change correct answers", async () => {
    let wrapper = mount(EditQuestion, {
      localVue,
      vuetify,
      propsData: {
        question,
      },
    });
    await wrapper.findAllComponents({ name: "v-radio" }).at(2).trigger("click");
    expect(wrapper.vm.$props.question.correctAnswers[0]).toBe(2);

    await wrapper.setProps({
      question: questionWithMultiple,
    });
    await wrapper
      .findAllComponents({ name: "v-checkbox" })
      .at(0)
      .find("input")
      .trigger("click");
    expect(wrapper.findComponent({ name: "v-checkbox" }).exists()).toBe(true);
    expect(wrapper.vm.$props.question.correctAnswers).toStrictEqual([0]);
  });

  it("adds new answer", async () => {
    let wrapper = mount(EditQuestion, {
      localVue,
      vuetify,
      propsData: {
        question,
      },
    });
    await wrapper.find(".editQuestion__addAnswer").trigger("click");
    expect(wrapper.vm.$props.question.answers.length).toBe(4);
  });

  it("remove answer", async () => {
    let questionLocal = { ...question };
    let wrapper = mount(EditQuestion, {
      localVue,
      vuetify,
      propsData: {
        question: questionLocal,
      },
    });
    await wrapper.find(".editQuestion__removeAnswer").trigger("click");
    expect(wrapper.vm.$props.question.answers[0]).toStrictEqual(
      new AnswerModel({
        title: "Второй ответ",
        id: 0,
      })
    );
    expect(wrapper.vm.$props.question.answers.length).toBe(2);
    await wrapper.findAll(".editQuestion__removeAnswer").at(1).trigger("click");
    expect(wrapper.vm.$props.question.answers).toStrictEqual([
      new AnswerModel({ title: "Второй ответ", id: 0 }),
    ]);
    expect(wrapper.vm.$props.question.answers.length).toBe(1);
  });

  it("edits text-fields", async () => {
    let wrapper = mount(EditQuestion, {
      localVue,
      vuetify,
      propsData: {
        question,
      },
    });
    await wrapper
      .find(".editQuestion__answerTitle")
      .find("input")
      .setValue("kek1");
    expect(wrapper.vm.$props.question.answers[0].title).toBe("kek1");
    await wrapper.find(".editQuestion__title").find("input").setValue("kek2");
    expect(wrapper.vm.$props.question.title).toBe("kek2");
  });
});
