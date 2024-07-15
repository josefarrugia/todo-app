import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import FormCheckbox from '../Form/FormCheckbox.vue';

const initialProps = {
  id: 'form-checkbox-99',
  name: 'form-checkbox-99',
  label: 'Test FormCheckbox',
  inputCheckbox: false
};

describe('FormCheckbox Component', () => {
  it('renders properly', () => {
    const wrapper = mount(FormCheckbox, {
      props: initialProps
    });

    expect(wrapper.exists());

    // Assert label for attribute
    expect(wrapper.attributes('for')).equals('form-checkbox-99');

    // Find Checkbox
    const checkbox = wrapper.find('input[type="checkbox"]');
    expect(checkbox.exists()).toBe(true);

    // Assert initial attributes
    expect(checkbox.attributes('type')).equals('checkbox');
    expect(checkbox.attributes('id')).equals('form-checkbox-99');
    expect(checkbox.attributes('name')).equals('form-checkbox-99');
    expect(checkbox.element.checked).toBe(false);

    // Find span with label prop and assert initial prop
    const spanLabel = wrapper.find('span');
    expect(spanLabel.exists()).toBe(true);
    expect(spanLabel.text()).equals('Test FormCheckbox');
  });

  it('inputCheckbox should be updated', async () => {
    const wrapper = mount(FormCheckbox, {
      props: {
        ...initialProps,
        'onUpdate:inputCheckbox': (e: boolean) => wrapper.setProps({ inputCheckbox: e })
      }
    });

    const checkbox = wrapper.find('input[type="checkbox"]');
    await checkbox.setValue(true);

    expect(checkbox.element.checked).toBe(true);
    expect(wrapper.props('inputCheckbox')).toBe(true);
  });

  it('trigger click on checkbox', async () => {
    const wrapper = mount(FormCheckbox, {
      props: {
        ...initialProps,
        'onUpdate:inputCheckbox': (e: boolean) => wrapper.setProps({ inputCheckbox: e })
      },
      attachTo: document.body
    });

    const checkbox = wrapper.find('input[type="checkbox"]');

    await checkbox.trigger('click');

    expect(checkbox.element.checked).toBe(true);
    expect(wrapper.props('inputCheckbox')).toBe(true);
  });
});
