import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import FormInputText from '../Form/FormInputText.vue';

const initialProps = {
  id: 'form-input-text-99',
  name: 'form-input-text-99',
  label: 'Test FormInputText',
  inputValue: 'initial text'
};

describe('FormInputText Component', () => {
  it('renders properly', () => {
    const wrapper = mount(FormInputText, {
      props: initialProps
    });

    expect(wrapper.exists());

    // Assert label for attribute
    expect(wrapper.attributes('for')).equals('form-input-text-99');

    // Find Input
    const input = wrapper.find('input[type="text"]');
    expect(input.exists()).toBe(true);

    // Assert initial attributes
    expect(input.attributes('type')).equals('text');
    expect(input.attributes('id')).equals('form-input-text-99');
    expect(input.attributes('name')).equals('form-input-text-99');
    expect((input.element as HTMLInputElement).value).equals('initial text');

    // Find span with label prop and assert initial prop
    const spanLabel = wrapper.find('span');
    expect(spanLabel.exists()).toBe(true);
    expect(spanLabel.text()).equals('Test FormInputText');
  });

  it('inputCheckbox should be updated', async () => {
    const wrapper = mount(FormInputText, {
      props: {
        ...initialProps,
        'onUpdate:inputValue': (e: string) => wrapper.setProps({ inputValue: e })
      }
    });

    const input = wrapper.find('input[type="text"]');
    await input.setValue('this is the updated value');

    expect((input.element as HTMLInputElement).value).equals('this is the updated value');
    expect(wrapper.props('inputValue')).equals('this is the updated value');
  });
});
