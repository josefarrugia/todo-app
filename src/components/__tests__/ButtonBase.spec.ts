import { describe, it, expect, beforeEach } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import ButtonBase from '../Button/ButtonBase.vue';

let wrapper: VueWrapper<any>;

beforeEach(() => {
  wrapper = mount(ButtonBase, {
    slots: {
      default: 'Click me'
    }
  });
});

describe('ButtonBase Component', () => {
  it('renders properly with default css padding', () => {
    expect(wrapper.exists()).toBe(true);

    expect(wrapper.classes()).toContain('p-2');

    expect(wrapper.text()).toBe('Click me');
  });

  it('renders properly with hasPadding prop set to false', async () => {
    expect(wrapper.exists()).toBe(true);

    await wrapper.setProps({ hasPadding: false });

    expect(wrapper.classes()).not.toContain('p-2');
  });
});
