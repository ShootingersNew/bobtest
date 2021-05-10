import { createLocalVue, mount, shallowMount } from "@vue/test-utils";
import { QuestionModel } from "@/models/QuestionModel";
import { AnswerModel } from "@/models/AnswerModel";
import Vuetify from "vuetify";
import EditSurvey from "@/components/EditSurvey/EditSurvey.vue";
import Vue from "vue";

describe("EditSurvey.vue", () => {
  Vue.use(Vuetify);
  const localVue = createLocalVue();
  let vuetify: Vuetify = new Vuetify();
  let mock = [
    new QuestionModel({ title: "Первый вопрос", id: 0 }),
    new QuestionModel({ title: "Второй вопрос", id: 1 }),
  ];

  beforeEach(() => {
    vuetify = new Vuetify();
    mock = [
      new QuestionModel({ title: "Первый вопрос", id: 0 }),
      new QuestionModel({ title: "Второй вопрос", id: 1 }),
    ];
  });

  it("open dialog on button click", async () => {
    let wrapper = mount(EditSurvey, {
      localVue,
      vuetify,
      propsData: {
        questions: mock,
      },
    });
    await wrapper.find(".questionList__add").trigger("click");
    expect(wrapper.findComponent({ name: "v-dialog" }).exists()).toBe(true);
  });

  it("open edit dialog on edit icon click", async () => {
    let wrapper = mount(EditSurvey, {
      localVue,
      vuetify,
      propsData: {
        questions: mock,
      },
    });
    await wrapper.find(".question__edit").trigger("click");
    expect(wrapper.findComponent({ name: "v-dialog" }).exists()).toBe(true);
  });

  it("reacts on checkboxes", async () => {
    let wrapper = mount(EditSurvey, {
      localVue,
      vuetify,
      propsData: {
        questions: mock,
      },
    });
    expect(wrapper.vm.$data.selected.length).toBe(0);
    await wrapper
      .findComponent({ name: "v-checkbox" })
      .find("input")
      .trigger("click");
    expect(wrapper.vm.$data.selected.length).toBe(2);
    expect(wrapper.vm.$data.selected).toStrictEqual([0, 1]);
  });

  it("reacts on edits in list items", () => {
    let wrapper = mount(EditSurvey, {
      localVue,
      vuetify,
      propsData: {
        questions: mock,
      },
    });
    wrapper
      .findComponent({
        name: "question",
      })
      .setData({
        editQuestion: new QuestionModel({
          title: "Первый",
          id: 3,
          correctAnswers: [1],
        }),
      });

    expect(wrapper.vm.$data.formData.questions[0]).toStrictEqual(
      new QuestionModel({ title: "Первый", id: 3, correctAnswers: [1] })
    );
  });

  it("removes list items when button clicked", async () => {
    let wrapper = mount(EditSurvey, {
      localVue,
      vuetify,
      propsData: {
        questions: mock,
      },
    });
    await wrapper.find(".question__delete").trigger("click");

    expect(wrapper.vm.$data.formData.questions[0]).toStrictEqual(
      new QuestionModel({ title: "Второй вопрос", id: 1 })
    );
  });

  it("removes list items when checkboxes clicked", async () => {
    let wrapper = mount(EditSurvey, {
      localVue,
      vuetify,
      propsData: {
        questions: mock,
      },
    });
    const checkbox = wrapper.findAllComponents({ name: "v-checkbox" });
    await checkbox.at(1).find("input").trigger("click");
    await checkbox.at(2).find("input").trigger("click");
    await wrapper.find(".questionList__delete").trigger("click");
    expect(wrapper.vm.$data.formData.questions).toStrictEqual([]);
  });

  it("removes list items when button clicked", async () => {
    let wrapper = mount(EditSurvey, {
      localVue,
      vuetify,
      propsData: {
        questions: mock,
      },
    });
    const checkbox = wrapper
      .findComponent({ name: "v-list" })
      .findComponent({ name: "v-checkbox" })
      .find("input");
    await checkbox.trigger("click");
    await wrapper.find(".questionList__delete").trigger("click");
    expect(wrapper.vm.$data.formData.questions).toStrictEqual([]);
  });

  it("add list items when button clicked", async () => {
    let wrapper = mount(EditSurvey, {
      localVue,
      vuetify,
      propsData: {
        questions: mock,
      },
    });
    const btn = wrapper.find(".questionList__add");
    await btn.trigger("click");
    await wrapper.find(".submit").trigger("click");
    expect(wrapper.vm.$data.formData.questions.length).toBe(3);
  });
});
