import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import TodoItem from '../Todo/TodoItem.vue';
import FormCheckbox from '../Form/FormCheckbox.vue';
import FormInputText from '../Form/FormInputText.vue';
import { useTaskStore } from '../../stores/tasks';
import ButtonSecondary from '../Button/ButtonSecondary.vue';

let wrapper: VueWrapper;

beforeEach(() => {
  wrapper = mount(TodoItem, {
    global: {
      plugins: [
        createTestingPinia({
          createSpy: vi.fn
        })
      ],

      components: {
        FormCheckbox,
        FormInputText,
        ButtonSecondary
      }
    },

    props: {
      id: 350,
      userId: 222,
      todo: 'Initial todo task',
      'onUpdate:todo': (e: string) => wrapper.setProps({ todo: e }),
      completed: false,
      'onUpdate:completed': (e: boolean) => wrapper.setProps({ completed: e })
    },

    attachTo: document.body
  });
});

describe('TodoItem Component', () => {
  it('renders properly with child components', () => {
    expect(wrapper.exists()).toBe(true);

    expect(wrapper.findComponent(FormCheckbox).exists()).toBe(true);
    expect(wrapper.findComponent(FormInputText).exists()).toBe(true);
  });

  it('setValue on checkbox with emitted event', async () => {
    const checkbox = wrapper.findComponent(FormCheckbox).find('input[type="checkbox"]');

    await checkbox.setValue(true);

    expect(wrapper.emitted()['update:completed'][0]).toEqual([true]);
  });

  it('setValue on input text with emitted event', async () => {
    const inputText = wrapper.findComponent(FormInputText).find('input[type="text"]');

    await inputText.setValue('Today I am going to do this task');

    expect(wrapper.emitted()['update:todo'][0]).toEqual(['Today I am going to do this task']);
  });

  it('setValue on text, trigger enter keypress and updateTask', async () => {
    const storeTask = useTaskStore();
    const inputText = wrapper.findComponent(FormInputText).find('input[type="text"]');

    await inputText.setValue('Today I am going to do this task');

    await inputText.trigger('keydown', {
      key: 'enter'
    });

    expect(storeTask.updateTask).toHaveBeenCalledTimes(1);
  });

  it('trigger button click to update task', async () => {
    const storeTask = useTaskStore();

    const button = wrapper.find('[data-testid="button-edit"]');

    await button.trigger('click');

    expect(storeTask.updateTask).toHaveBeenCalledTimes(1);
  });

  it('trigger button click to delete task', async () => {
    const storeTask = useTaskStore();

    const button = wrapper.find('[data-testid="button-delete"]');

    await button.trigger('click');

    expect(storeTask.deleteTask).toHaveBeenCalledTimes(1);
  });
});
