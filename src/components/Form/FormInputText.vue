<script lang="ts" setup>
import type { FormInputText } from '@/types/form';

const props = defineProps<FormInputText>();

const inputValue = defineModel<string>('inputValue');
</script>

<template>
  <label :for="props.id">
    <input
      class="appearance-none bg-blue-50 w-full hover:bg-blue-100 py-2 px-4 outline-none rounded-lg border border-transparent focus:bg-blue-100 focus:border-blue-300"
      :class="{ 'line-through': props.hasStrikeThrough }"
      type="text"
      :name="props.name"
      :id="props.id"
      :placeholder="props.placeholder"
      autocomplete="off"
      v-model="inputValue"
    />
    <span class="sr-only">{{ props.label }}</span>
  </label>
</template>
